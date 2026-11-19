/* Universal AI Game Studio portal */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
let currentProject = null;

// ---- navigation ----
$$(".nav-btn").forEach(b => b.onclick = () => showView(b.dataset.view));
function showView(v) {
  $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.view === v));
  $$(".view").forEach(x => x.classList.add("hidden"));
  $("#view-" + v).classList.remove("hidden");
  if (v === "dashboard" || v === "projects") loadProjects();
}
function showProject(slug) { currentProject = slug; showView("project"); renderProject(); }

// ---- dashboard / projects ----
async function loadProjects() {
  const r = await (await fetch("/api/projects")).json();
  const ps = r.projects || [];
  const done = ps.filter(p => p.status === "complete");
  const avg = done.length ? Math.round(done.reduce((a, p) => a + (p.score || 0), 0) / done.length) : null;
  $("#dash-cards").innerHTML = `
    <div class="card"><div class="num">${ps.length}</div><div class="lbl">Projects</div></div>
    <div class="card"><div class="num">${avg ?? "–"}</div><div class="lbl">Avg score</div></div>
    <div class="card"><div class="num">${done.filter(p => (p.score||0) >= 80).length}</div><div class="lbl">Verified playable</div></div>`;
  const rows = ps.map(p => projRow(p)).join("");
  $("#dash-projects").innerHTML = rows ? table(["Project", "Engine", "Score", "Status"], rows) : empty();
  $("#projects-list").innerHTML = rows ? table(["Project", "Engine", "Score", "Status"], rows) : empty();
}
function projRow(p) {
  const badge = p.status === "complete"
    ? `<span class="badge ${p.score >= 80 ? "b-ok" : p.score >= 50 ? "b-warn" : "b-bad"}">${p.score}/100</span>`
    : `<span class="badge b-bad">failed</span>`;
  return `<tr onclick='showProject("${p.slug}")' style="cursor:pointer">
    <td><b>${p.slug}</b><div class="kv">${(p.url||"").slice(0,60)}</div></td>
    <td>${p.engine?.engine || "?"}</td><td>${badge}</td>
    <td>${p.status}</td></tr>`;
}
function table(headers, rows) {
  return `<div class="tbl-wrap"><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
}
const empty = () => `<p class="muted">No projects yet. Acquire a game to get started.</p>`;

// ---- acquisition ----
$("#acq-go").onclick = async () => {
  const url = $("#acq-url").value.trim();
  if (!url) return;
  $("#acq-go").disabled = true;
  $("#acq-progress").classList.remove("hidden");
  $("#job-state").textContent = "running";
  $("#job-log").textContent = "";
  $("#job-result").innerHTML = "";
  const res = await (await fetch("/api/acquire", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, slug: $("#acq-slug").value.trim() || null })
  })).json();
  pollJob(res.job_id);
};
async function pollJob(id) {
  const j = await (await fetch("/api/jobs/" + id)).json();
  $("#job-log").textContent = (j.log || []).join("\n");
  $("#job-state").textContent = j.status;
  if (j.slug) $("#job-slug").textContent = " · " + j.slug;
  if (j.status === "running") return setTimeout(() => pollJob(id), 1200);
  $("#acq-go").disabled = false;
  if (j.status === "done") {
    $("#job-result").innerHTML = `
      <span class="badge b-ok">score ${j.summary.score}/100</span>
      <button class="primary" onclick='showProject("${j.summary.slug}")'>Open project</button>`;
  } else {
    $("#job-result").innerHTML = `<span class="badge b-bad">failed: ${j.error || "?"}</span>`;
  }
}

// ---- project detail ----
$("#proj-tabs").onclick = e => {
  if (!e.target.classList.contains("tab")) return;
  $$("#proj-tabs .tab").forEach(t => t.classList.remove("active"));
  e.target.classList.add("active");
  renderProject(e.target.dataset.tab);
};
async function report(slug, name) {
  const r = await fetch(`/api/projects/${slug}/reports/${name}`);
  return r.ok ? r.json() : null;
}
async function renderProject(tab = "recon") {
  const slug = currentProject;
  const s = await report(slug, "summary");
  if (!s) { $("#proj-body").innerHTML = empty(); return; }
  const scoreCls = s.score >= 80 ? "b-ok" : s.score >= 50 ? "b-warn" : "b-bad";
  $("#proj-head").innerHTML = `
    <div class="proj-head">
      <div class="score-ring">${s.score ?? "?"}</div>
      <div>
        <div class="proj-title">${slug}</div>
        <div class="kv">${s.entry_url || ""}</div>
        <div class="kv">engine: <b>${s.engine?.engine || "?"}</b> (${s.engine?.confidence || "?"}) ·
          acquired ${s.counts?.captured ?? 0}+${s.counts?.downloaded ?? 0} · ${s.duration_s ?? "?"}s</div>
        <div><span class="badge ${scoreCls}">${(s.verdict || "").split(":")[0]}</span></div>
      </div>
    </div>`;
  const body = $("#proj-body");
  if (tab === "recon") {
    const d = await report(slug, "recon");
    body.innerHTML = d ? table(["Check", "Value"], [
      row("Final URL", d.final_url), row("Redirects", (d.redirects || []).length || "none"),
      row("Entry point", (d.entry_url || "") + (d.entry_in_iframe ? " (iframe)" : "")),
      row("Iframes", (d.iframes || []).join(", ") || "none"),
      row("Engine", `${d.engine?.engine} — confidence ${d.engine?.confidence}`),
      row("Engine evidence", (d.engine?.evidence || []).join(" · ") || "–"),
      row("Console errors", (d.console || []).filter(c => c.type === "error").length),
      row("Page errors", (d.page_errors || []).length),
      row("Warnings", (d.warnings || []).join(" · ") || "none"),
      row("Runtime globals", JSON.stringify(d.globals || {})),
    ]) : empty();
  }
  if (tab === "resources") {
    const m = await report(slug, "manifest");
    if (!m) return body.innerHTML = empty();
    body.innerHTML = `<div class="search-wrap"><input class="filter-in" id="res-filter" placeholder="filter…"></div>` +
      table(["Local path", "URL", "Status", "Type", "Size", "Phase", "Source"],
        (m.resources || []).map(r => `<tr><td>${r.rel}</td><td>${r.url.slice(0, 70)}</td>
          <td>${r.status || ""}</td><td>${r.resource_type || ""}</td>
          <td>${r.size ? fmtSize(r.size) : ""}</td><td>${r.phase || ""}</td><td>${r.source || ""}</td></tr>`).join(""));
    $("#res-filter").oninput = e => filterTable(e.target.value);
  }
  if (tab === "deps") {
    const d = await report(slug, "depgraph");
    body.innerHTML = d ? table(["Check", "Value"], [
      row("Nodes (local files)", d.nodes.length),
      row("Edges (references)", d.edges.length),
      row("Unresolved refs", d.unresolved_refs.length ? `<span class="badge b-warn">${d.unresolved_refs.length}</span><pre>${d.unresolved_refs.slice(0, 15).join("\n")}</pre>` : "none"),
      row("External hosts", d.external_hosts.length ? d.external_hosts.join(", ") : "none"),
    ]) : empty();
  }
  if (tab === "verify") {
    const v = await report(slug, "verify");
    if (!v) return body.innerHTML = empty();
    const comps = Object.entries(v.score.components).map(([k, c]) => `
      <div class="check-row"><span style="width:160px">${k}</span>
      <div class="check-bar"><i style="width:${Math.round(c.value * 100)}%"></i></div>
      <span class="check-val">${Math.round(c.value * 100)}% ×${c.weight}</span></div>`).join("");
    body.innerHTML = `
      <div class="detail-list"><b>Verdict:</b> ${v.verdict}</div><br>${comps}<br>
      ${table(["Runtime check", "Result"], [
        row("Animation detected", v.animation_detected ? '<span class="badge b-ok">yes</span>' : '<span class="badge b-bad">no</span>'),
        row("Canvas", v.canvas ? `${v.canvas.w}×${v.canvas.h}` : "none"),
        row("Local requests", v.local_requests),
        row("Missing (404+)", v.missing_requests.length ? `<span class="badge b-bad">${v.missing_requests.length}</span>` : '<span class="badge b-ok">0</span>'),
        row("Failed requests", v.failed_requests.length),
        row("External hosts at runtime", Object.keys(v.external_hosts || {}).length ? Object.keys(v.external_hosts).join(", ") : '<span class="badge b-ok">none</span>'),
        row("Console errors", v.console_errors.length),
      ])} + `<pre>${(v.console_errors || []).slice(0, 12).join("\n")}</pre>`;
  }
  if (tab === "audit") {
    const a = await report(slug, "audit");
    if (!a) return body.innerHTML = empty();
    const clsBadge = c => `<span class="badge ${c === "GREEN" ? "b-ok" : c === "YELLOW" ? "b-warn" : c === "RED" ? "b-bad" : "b-mut"}">${c}</span>`;
    body.innerHTML = `<p class="muted">${a.note}</p>` +
      table(["Type", "Target", "Category", "Class", "Evidence", "Action"],
        (a.findings || []).map(f => `<tr><td>${f.type}</td><td>${f.target}</td><td>${f.category}</td>
          <td>${clsBadge(f.classification)}</td><td>${f.evidence.slice(0, 90)}</td><td>${f.recommended_action}</td></tr>`).join("") || "");
  }
  if (tab === "assets") {
    const a = await report(slug, "assets");
    if (!a) return body.innerHTML = empty();
    body.innerHTML = `<div class="cards" style="margin-bottom:12px">
      <div class="card"><div class="num">${a.summary.assets}</div><div class="lbl">Assets</div></div>
      <div class="card"><div class="num">${a.summary.overall_feasibility}</div><div class="lbl">Feasibility /100</div></div>
      <div class="card"><div class="num" style="font-size:14px;padding-top:6px">${a.summary.bottleneck || "no bottleneck"}</div><div class="lbl">Bottleneck</div></div></div>` +
      table(["Path", "Category", "Dims/Duration", "Feasibility", "Action"],
        (a.items || []).slice(0, 400).map(i => `<tr><td>${i.path}</td><td>${i.category}</td>
          <td>${i.meta.width ? i.meta.width + "×" + i.meta.height : i.meta.duration_s ? Math.round(i.meta.duration_s) + "s" : ""}</td>
          <td><span class="badge ${fbCls(i.feasibility.score)}">${i.feasibility.score} ${i.feasibility.class}</span></td>
          <td>${i.feasibility.recommended_action}</td></tr>`).join(""));
  }
  if (tab === "preview") {
    body.innerHTML = `
      <p class="muted">Local reconstruction, served by this portal (no original host involved):</p>
      <iframe class="preview" src="/games/${slug}/mirror/"></iframe>
      <p class="muted">Direct link: <a href="/games/${slug}/mirror/${s.entry_rel}" target="_blank">open game in new tab</a></p>`;
  }
}
const fbCls = s => s >= 80 ? "b-ok" : s >= 50 ? "b-warn" : "b-bad";
const row = (a, b) => `<tr><td style="white-space:normal"><b>${a}</b></td><td style="white-space:normal">${b ?? ""}</td></tr>`;
function fmtSize(n) { return n > 1048576 ? (n / 1048576).toFixed(1) + " MB" : n > 1024 ? (n / 1024).toFixed(1) + " KB" : n + " B"; }
function filterTable(q) {
  q = q.toLowerCase();
  $$("#proj-body tbody tr").forEach(tr => tr.style.display = tr.textContent.toLowerCase().includes(q) ? "" : "none");
}
loadProjects();
