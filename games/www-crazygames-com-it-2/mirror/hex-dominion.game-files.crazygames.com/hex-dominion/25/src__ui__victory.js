const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const ease=t=>1-Math.pow(1-t,3);
const TAU=Math.PI*2;
export const VICTORY_HARVEST_DURATION=1520;

// A visual snapshot only: neither entities, energy nor the saved reward are changed.
export function victoryHarvestPlan(battle,renderer,bounds,{reducedMotion=false,target}={}){
 const destination=target||{x:bounds.width/2,y:clamp(bounds.height*.19,52,140)};
 const sources=[];
 for(const e of battle.entities){
  if(e.owner!==1||e.hp<=0||e.parent||e.kind==='bee')continue;
  const size=e.size===19?66:e.size===7?53:e.size===3?41:35;
  const y=e.y-(e.flying?5+Math.sin((renderer.lastDrawTime||0)*.007+e.uid)*1.6:0);
  const point=renderer.worldToClient(e.x,y),edge=renderer.worldToClient(e.x+size,y);
  if(!point||!edge||![point.x,point.y,edge.x].every(Number.isFinite))continue;
  sources.push({uid:e.uid,sprite:e.sprite,angle:(e.angle||0)+Math.PI/2,
   x:point.x-bounds.left,y:point.y-bounds.top,size:Math.max(1,Math.abs(edge.x-point.x))});
 }
 // Every weapon gets its own coin. Extra decorative coins are bounded; unusually
 // large armies still need only one canvas, with one representation per weapon.
 const coinsPerSource=sources.length?Math.max(1,Math.min(3,Math.floor(60/sources.length))):0;
 const coins=sources.flatMap((source,index)=>Array.from({length:coinsPerSource},(_,part)=>({
  source:index,part,delay:Math.min(index*18,180)+part*38,
  ox:part?Math.cos((part+index*.37)*2.4)*12:0,
  oy:part?Math.sin((part+index*.37)*2.4)*9:0
 })));
 const sourceIds=new Set(sources.map(e=>e.uid));
 const hiddenIds=battle.entities.filter(e=>sourceIds.has(e.uid)||(e.owner===1&&sourceIds.has(e.parent))).map(e=>e.uid);
 return {sources,coins,hiddenIds,target:destination,duration:sources.length?(reducedMotion?180:VICTORY_HARVEST_DURATION):0,reducedMotion};
}

export function victoryCoinFrame(plan,coin,elapsed){
 const source=plan.sources[coin.source],local=elapsed-coin.delay;
 const morph=clamp(local/240,0,1),flight=clamp((local-300)/820,0,1),travel=ease(flight);
 const sx=source.x+coin.ox*morph,sy=source.y+coin.oy*morph;
 const bend=Math.sin(travel*Math.PI),side=(coin.source%2?1:-1)*(22+coin.part*12);
 return {x:sx+(plan.target.x-sx)*travel+bend*side,
  y:sy+(plan.target.y-sy)*travel-bend*Math.min(95,35+Math.abs(plan.target.y-sy)*.17),
  opacity:morph*(1-clamp((flight-.86)/.14,0,1)),
  scale:(.6+.4*morph)*(1-.68*travel),spin:local*.011+coin.part,arrived:flight>=1};
}

function paintCoin(c,x,y,r,spin,alpha){
 c.save();c.globalAlpha=alpha;c.translate(x,y);c.scale(.72+Math.abs(Math.cos(spin))*.28,1);
 c.shadowColor='#ffdb69';c.shadowBlur=9;c.fillStyle='#e6a224';c.strokeStyle='#9c5818';c.lineWidth=1.2;
 c.beginPath();c.ellipse(1.5,1.5,r,r,0,0,TAU);c.fill();c.stroke();c.shadowBlur=0;
 const gold=c.createLinearGradient(-r,-r,r,r);gold.addColorStop(0,'#fffbb5');gold.addColorStop(.5,'#ffd453');gold.addColorStop(1,'#e99c1b');
 c.fillStyle=gold;c.beginPath();c.arc(0,0,r,0,TAU);c.fill();c.stroke();c.strokeStyle='#fff0a4';c.lineWidth=Math.max(1,r*.1);c.beginPath();c.arc(0,0,r*.72,0,TAU);c.stroke();
 c.fillStyle='#c88119';c.font='900 '+Math.round(r*1.35)+'px Arial';c.textAlign='center';c.textBaseline='middle';c.fillText('✦',0,.5);c.restore();
}

function paintHarvest(c,canvas,plan,atlas,elapsed,dpr){
 c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,canvas.width/dpr,canvas.height/dpr);
 for(let index=0;index<plan.sources.length;index++){
  const source=plan.sources[index],local=elapsed-Math.min(index*18,180),morph=clamp(local/240,0,1);
  if(morph<1&&atlas?.complete&&atlas.naturalWidth){
   c.save();c.globalAlpha=1-morph;c.translate(source.x,source.y);c.rotate(source.angle);const size=source.size*(1+.13*Math.sin(morph*Math.PI));
   c.shadowColor='#ffe18a';c.shadowBlur=morph*22;const sw=(atlas.width||atlas.naturalWidth)/4,sh=(atlas.height||atlas.naturalHeight)/5;
   c.drawImage(atlas,source.sprite%4*sw,Math.floor(source.sprite/4)*sh,sw,sh,-size/2,-size/2,size,size);c.restore();
  }
  if(local>=0&&local<360){
   c.save();c.globalAlpha=Math.sin(clamp(local/360,0,1)*Math.PI)*.8;c.strokeStyle='#fff0a9';c.lineWidth=1.7;c.beginPath();c.arc(source.x,source.y,5+local*.075,0,TAU);c.stroke();c.restore();
  }
 }
 for(const coin of plan.coins){const frame=victoryCoinFrame(plan,coin,elapsed);if(frame.opacity>0)paintCoin(c,frame.x,frame.y,10*frame.scale,frame.spin,frame.opacity);}
}

/**
 * Display the already-awarded gold reward; this function never awards currency.
 * `finished` always settles, including cancellation. Call cleanup on navigation.
 * The completed target and hidden weapons remain until cleanup to avoid a flash
 * of the original army between this sequence and the result banner.
 */
export function playVictoryHarvest({battle,renderer,container,coinHTML='',rewardLabel='',reducedMotion=false}){
 const empty={duration:0,cleanup(){},finished:Promise.resolve({cancelled:false})};
 if(!battle||battle.winner!==1||!renderer||!container)return empty;
 const doc=container.ownerDocument,host=doc.defaultView||globalThis;
 const reduced=!!reducedMotion||!!host.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 const bounds=container.getBoundingClientRect();
 if(!(bounds.width>0&&bounds.height>0))return empty;
 const plan=victoryHarvestPlan(battle,renderer,bounds,{reducedMotion:reduced});
 if(!plan.sources.length)return empty;
 const layer=doc.createElement('div');layer.className='victory-harvest'+(reduced?' is-reduced':'');layer.setAttribute('aria-hidden','true');
 const target=doc.createElement('div');target.className='victory-harvest-target';target.style.left=plan.target.x+'px';target.style.top=plan.target.y+'px';
 const icon=doc.createElement('span');icon.className='victory-harvest-icon';icon.innerHTML=coinHTML||'<i class="victory-fallback-gold">✦</i>';
 const label=doc.createElement('strong');label.textContent=rewardLabel;target.append(icon,label);layer.append(target);
 const canvas=doc.createElement('canvas');canvas.className='victory-harvest-canvas';canvas.setAttribute('aria-hidden','true');
 const dpr=Math.min(host.devicePixelRatio||1,2);canvas.width=Math.max(1,Math.round(bounds.width*dpr));canvas.height=Math.max(1,Math.round(bounds.height*dpr));layer.append(canvas);
 const context=canvas.getContext('2d');if(!context)return empty;
 const previousHidden=new Set(renderer.hiddenEntities||[]);container.append(layer);
 renderer.setHiddenEntities?.([...previousHidden,...plan.hiddenIds]);
 // Draw the frozen battlefield immediately so the disappearing sources are not
 // present under their animated copies for even one extra frame.
 renderer.draw?.(battle,renderer.lastDrawTime||0);
 let raf=0,timer=0,observer=null,settled=false,cleaned=false,resolveFinished;
 const finished=new Promise(resolve=>{resolveFinished=resolve;});
 const settle=cancelled=>{if(!settled){settled=true;resolveFinished({cancelled});}};
 const cleanup=({restoreWeapons=true}={})=>{
  if(cleaned)return;cleaned=true;host.cancelAnimationFrame?.(raf);host.clearTimeout(timer);observer?.disconnect();
  host.removeEventListener?.('resize',cleanup);host.visualViewport?.removeEventListener('resize',cleanup);renderer.canvas?.removeEventListener?.('hex:camera-change',cleanup);
  layer.remove();if(restoreWeapons)renderer.setHiddenEntities?.(previousHidden);settle(true);
 };
 const start=host.performance?.now?.()??Date.now();
 const draw=now=>{
  if(cleaned)return;
  if(!container.isConnected){cleanup();return;}
  const elapsed=Math.max(0,now-start);
  if(!reduced)paintHarvest(context,canvas,plan,renderer.atlas,elapsed,dpr);
  if(elapsed>=780)target.classList.add('is-collecting');
  if(elapsed<plan.duration)raf=host.requestAnimationFrame(draw);
 };
 if(reduced){
  // No travelling particles, flashing or scaling in reduced-motion mode.
  for(const source of plan.sources)paintCoin(context,source.x*dpr,source.y*dpr,9*dpr,0,.9);
 }else{
  paintHarvest(context,canvas,plan,renderer.atlas,0,dpr);raf=host.requestAnimationFrame(draw);
 }
 timer=host.setTimeout(()=>{if(cleaned)return;host.cancelAnimationFrame?.(raf);context.clearRect(0,0,canvas.width,canvas.height);target.classList.add('is-collected');settle(false);},plan.duration);
 host.addEventListener?.('resize',cleanup);host.visualViewport?.addEventListener('resize',cleanup);renderer.canvas?.addEventListener?.('hex:camera-change',cleanup);
 if(host.ResizeObserver){observer=new host.ResizeObserver(()=>{const current=container.getBoundingClientRect();if(Math.abs(current.width-bounds.width)>.5||Math.abs(current.height-bounds.height)>.5)cleanup();});observer.observe(container);}
 return {duration:plan.duration,cleanup,finished};
}
