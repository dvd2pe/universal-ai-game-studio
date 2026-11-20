/** Pointer-based drag and drop: shared mouse, pen and touch behavior. */
export function bindDeckDrag(root,{onDrop,onDragEnd=()=>{},onStatus=()=>{},describeTarget=()=>'',onError=()=>{}}){
 const doc=root.ownerDocument,win=doc.defaultView;let gesture=null,destroyed=false,scrollFrame=0,lastScrollTime=0;
 const scroll=now=>{
  scrollFrame=0;const current=gesture;if(!current?.active)return;
  const rect=root.getBoundingClientRect(),edge=Math.min(72,rect.height/3),y=current.clientY;
  const speed=y<rect.top+edge?-Math.min(1,(rect.top+edge-y)/edge):y>rect.bottom-edge?Math.min(1,(y-rect.bottom+edge)/edge):0;
  const elapsed=lastScrollTime?Math.min(40,now-lastScrollTime):16;lastScrollTime=now;
  if(speed&&current.clientX>=rect.left-80&&current.clientX<=rect.right+80){root.scrollTop+=speed*elapsed*.65;setTarget(targetAt(current.clientX,current.clientY));}
  scrollFrame=win.requestAnimationFrame(scroll);
 };
 const targetAt=(x,y)=>{const el=doc.elementFromPoint(x,y)?.closest('[data-deck-target]');return el&&root.contains(el)?el:null;};
 const setTarget=target=>{if(!gesture||gesture.target===target)return;gesture.target?.classList.remove('deck-drop-target');gesture.target=target;target?.classList.add('deck-drop-target');onStatus(target?describeTarget(gesture.id,target.dataset.deckTarget):'');};
 const finish=(cancelled=false,event=null)=>{
  const current=gesture;if(!current)return;gesture=null;win.cancelAnimationFrame(scrollFrame);scrollFrame=0;lastScrollTime=0;
  const target=!cancelled&&event?targetAt(event.clientX,event.clientY):null;
  current.target?.classList.remove('deck-drop-target');current.source.classList.remove('deck-drag-source');current.ghost?.remove();root.classList.remove('deck-dragging');
  try{if(current.source.hasPointerCapture(current.pointerId))current.source.releasePointerCapture(current.pointerId);}catch{}
  onStatus(null);
  if(current.active){onDragEnd();event?.preventDefault();if(target&&target.dataset.deckTarget!==current.id){try{Promise.resolve(onDrop(current.id,target.dataset.deckTarget)).catch(onError);}catch(error){onError(error);}}}
 };
 const move=event=>{
  const current=gesture;if(!current||event.pointerId!==current.pointerId)return;
  current.clientX=event.clientX;current.clientY=event.clientY;
  if(!current.active){
   if(Math.hypot(event.clientX-current.x,event.clientY-current.y)<(current.pointerType==='touch'?10:6))return;
   current.active=true;scrollFrame=win.requestAnimationFrame(scroll);root.classList.add('deck-dragging');current.source.classList.add('deck-drag-source');
   const ghost=doc.createElement('div');ghost.className='deck-drag-ghost';ghost.setAttribute('aria-hidden','true');
   const art=current.source.querySelector('.weapon-art');if(art)ghost.append(art.cloneNode(true));
   current.size=Math.min(105,Math.max(68,current.source.getBoundingClientRect().width));ghost.style.width=current.size+'px';ghost.style.height=current.size+'px';doc.body.append(ghost);current.ghost=ghost;
  }
  event.preventDefault();current.ghost.style.left=(event.clientX-current.size/2)+'px';current.ghost.style.top=(event.clientY-current.size/2-(current.pointerType==='touch'?24:0))+'px';setTarget(targetAt(event.clientX,event.clientY));
 };
 const down=event=>{
  if(destroyed||gesture||event.button!==0||event.isPrimary===false)return;
  const source=event.target.closest('[data-deck-source]');if(!source||!root.contains(source)||source.disabled)return;
  gesture={id:source.dataset.deckSource,source,pointerId:event.pointerId,pointerType:event.pointerType,x:event.clientX,y:event.clientY,active:false,target:null,ghost:null};
  try{source.setPointerCapture(event.pointerId);}catch{}
 };
 const up=event=>{if(gesture?.pointerId===event.pointerId)finish(false,event);};
 const cancel=event=>{if(!event?.pointerId||gesture?.pointerId===event.pointerId)finish(true,event);};
 const key=event=>{if(gesture&&(event.key==='Escape'||event.key==='Tab'||event.key.toLowerCase()==='p')){finish(true);}};
 const nativeDrag=event=>{if(event.target.closest('[data-deck-source]'))event.preventDefault();};
 const hidden=()=>{if(doc.hidden)finish(true);};
 root.addEventListener('pointerdown',down);root.addEventListener('lostpointercapture',cancel);root.addEventListener('dragstart',nativeDrag);
 win.addEventListener('pointermove',move,{passive:false});win.addEventListener('pointerup',up,{passive:false});win.addEventListener('pointercancel',cancel);win.addEventListener('blur',cancel);win.addEventListener('resize',cancel);win.addEventListener('keydown',key);doc.addEventListener('visibilitychange',hidden);
 return {destroy(){if(destroyed)return;destroyed=true;finish(true);root.removeEventListener('pointerdown',down);root.removeEventListener('lostpointercapture',cancel);root.removeEventListener('dragstart',nativeDrag);win.removeEventListener('pointermove',move);win.removeEventListener('pointerup',up);win.removeEventListener('pointercancel',cancel);win.removeEventListener('blur',cancel);win.removeEventListener('resize',cancel);win.removeEventListener('keydown',key);doc.removeEventListener('visibilitychange',hidden);}};
}
