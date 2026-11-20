# NO-STUBS POLICY (permanente, vale per tutti i giochi)

Regola dell'utente, valida per ogni gioco già scaricato e per ogni futuro download:
**i file segnaposto ("stub") sono VIETATI. Nei mirror ci sono solo file originali veri.**

## Perché

Uno stub è un file finto (immagine 1×1, wav muto, `{}`, commento js) scritto al posto
di un file che l'acquisizione non ha catturato. Nasconde il problema, corrompe loader
che gestivano il 404 con grazia e rende il gioco "falsamente rotto". Prova storica:
hex-dominion 91/100 rotto dagli stub, riparato togliendoli.

## Come si risolve un file mancante (in ordine)

1. **Backfill a runtime (automatico, radice del sistema)** — `main.py` middleware
   `origin_backfill_on_404`: ogni 404 su `/games/<slug>/mirror/<host>/<path>` viene
   servito scaricando il file REALE da `https://<host>/<path>` e salvandolo nel
   mirror (curativo e permanente). Se l'origine non ce l'ha, resta 404 — mai
   contenuto inventato.
2. **Cross-fill** — se un altro progetto ha lo stesso file reale, si copia
   (`scripts/purge_backfill_stubs.py`).
3. **`acquisition/original/`** — controllare la cattura originale prima di
   dichiarare un file irrecuperabile.
4. Se davvero nessuno lo ha (origine 404, es. `bubble-blast-pwd/14/src/_mask.jpg`):
   il file resta assente. Alcuni sono fallback condizionali nel codice di gioco e
   non servono; se bloccano il gioco, va diagnosticato caso per caso.

## Varianti query (`?v=…` → `__q…`)

Il mirror archivia ogni file sotto una sola variante canonica. Il serving
(`main.py::_QFallbackStatic`) risolve 404 verso qualsiasi variante dello stesso
`stem + estensione` in entrambe le direzioni. Non è uno stub: è lo stesso file reale.

## Diagnosi e fix (sempre disponibili)

- `python3 -I scripts/probe_frame.py <slug> [sec]` — carica il gioco headless e
  stampa PRIMA i problemi: risposte ≥400, STUDIO-MISS, schermata errore, testo UI.
  Il probe stesso innesca il backfill live: rieseguirlo dopo un fix.
- `python3 -I scripts/probe_stall.py <slug…>` — il verdetto che conta. Un gioco
  bloccato NON dà errori di rete: ha richieste PENDENTI mai completate o un'UI
  di caricamento immobile. Traccia ogni richiesta (pending list), il timeline
  e confronta due screenshot a 10 s di distanza: spinner/barra ferma = STALLED,
  scena piena di colori o in movimento = LOADED. ERROR prevale su tutto.
- `python3 -I scripts/purge_backfill_stubs.py` — inventario firme stub su tutti i
  progetti, sostituzione con originali (cross-fill + origine), report in
  `reports/backfill.json`, `stubs.json` azzerato.
- Verdetto LOADED richiede TUTTO questo: 0 richieste ≥400, 0 errori console,
  0 schermata d'errore, 0 richieste pendenti, e (per i giochi canvas) scena
  renderizzata. "Nessun errore" da solo NON basta: è esattamente l'inganno che
  ha fatto passare per sani giochi bloccati alla barra di caricamento.

## Affidabilità del servizio (il "gioco stuck" nel browser dell'utente)

- Il browser dell'utente carica i giochi attraverso il tunnel di preview: il
  primo avvio è pesante (es. screw-out ≈ 57 MB di wasm/data brotli). Il portale
  ora serve gzip trasparente SOLO sui testi (js/css/html/json/svg) e
  Cache-Control 24 h sui file mirror (immutabili): il ricaricamento è locale.
  I binari già compressi (webp/wasm/mp3/data/.br) passano intatti.
- Watchdog: `scripts/portal_watchdog.sh` (loop nohup, check ogni 30 s, riavvia
  il portale se non risponde). I processi muoiono col riciclo della sandbox:
  il primo turno dell'agente dopo un riciclo esegue sempre
  `scripts/restart_portal.sh`.
- Se un gioco resta bloccato SOLO nel browser dell'utente mentre probe_stall
  dice LOADED: primo sospetto cache vecchia → hard refresh (Ctrl+Shift+R);
  secondo sospetto il tunnel (riprovare / aprire la scheda direct link).

## Stato della policy

- `studio/pipeline.py`: chiamate `apply_stubs` rimosse (nuove acquisizioni stub-free).
- 2026-11-20: 1919 stub eliminati su tutti i progetti; 1383 ripristinati da
  cross-fill/origine, 552 irrecuperabili cancellati (404 onesto).
