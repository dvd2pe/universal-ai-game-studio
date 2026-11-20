import {bounded,decodeImage,nextPaint} from './src__platform__loading.js';
// A real-resource loading gate. Normal startup enters automatically; only
// protected-save practice mode requires a deliberate player action.
export function createBoot(app) {
 const page=app.ownerDocument,body=page.body;
 let readyPromise,resolveReady,onEnter,button=null,entered=false,resourcesReady=false,completed=0,locale='en',reduced=false,saveBlocked=false;
 const copy={en:{loading:'Preparing your arsenal…',ready:'Your arena is ready — 100%',hint:'Build your deck. Claim your territory.'},ar:{loading:'نجهّز ترسانتك…',ready:'حلبتك جاهزة — 100%',hint:'شكّل ترسانتك. وسيطر على الأرض.'}};
 const view=page.createElement('section');
 view.className='hex-boot'; view.setAttribute('aria-label','HEX Dominion');
 view.innerHTML='<div class="boot-glow" aria-hidden="true"></div><picture class="boot-art"><source media="(min-aspect-ratio: 1/1)" srcset="assets__loading-wide.webp"><img src="assets__loading-cover.webp" alt="HEX Dominion — a cannon and bee hive overlooking a colorful hex arena" fetchpriority="high" decoding="async"></picture><div class="boot-vignette" aria-hidden="true"></div><div class="boot-sparks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div class="boot-controls"><h1 class="boot-accessible-title">HEX Dominion</h1><p class="boot-tagline"></p><div class="boot-loading"><p class="boot-status" role="status" aria-live="polite"></p><div class="boot-progress" role="progressbar" aria-label="Loading game" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div></div></div>';
 app.replaceChildren(view);body.classList.add('boot-active');
 const status=view.querySelector('.boot-status'),bar=view.querySelector('.boot-progress'),fill=bar.firstElementChild;
 const setCopy=()=>{
  const text=copy[locale];view.dir=locale==='ar'?'rtl':'ltr';
  view.querySelector('.boot-tagline').textContent=saveBlocked?(locale==='ar'?'تعذر فتح تقدمك المحفوظ. أعد تحميل الصفحة للمحاولة، أو العب للتدريب دون حفظ. تقدمك السابق محمي.':'Saved progress is unavailable. Reload to retry, or practice without saving. Your previous progress is protected.'):text.hint;
  if(button)button.querySelector('span').textContent=locale==='ar'?'تدريب دون حفظ':'PRACTICE · NO SAVE';
  status.textContent=resourcesReady?text.ready:text.loading;
  bar.setAttribute('aria-label',locale==='ar'?'تحميل اللعبة':'Loading game');
 };
 setCopy();
 const reducedMotion=()=>reduced||page.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 const nextFrame=()=>nextPaint(page.defaultView);
 const finishProgress=async()=>{
  // Reading animations flushes the final width change, so the gate follows the
  // visible fill rather than hiding it during its CSS transition to 100 percent.
  if(fill.getAnimations){
   await bounded(()=>Promise.allSettled(fill.getAnimations().filter(animation=>animation.transitionProperty==='width').map(animation=>animation.finished)),600,'Loading animation').catch(()=>{});
  }else if(!reducedMotion()){
   // Older embedded browsers can animate CSS without exposing getAnimations().
   const style=page.defaultView.getComputedStyle(fill),properties=style.transitionProperty.split(','),durations=style.transitionDuration.split(','),delays=style.transitionDelay.split(',');
   const milliseconds=value=>parseFloat(value)*(value.trim().endsWith('ms')?1:1000)||0;
   const duration=Math.max(0,...properties.map((property,index)=>['width','all'].includes(property.trim())?milliseconds(durations[index%durations.length])+milliseconds(delays[index%delays.length]):0));
   if(duration)await new Promise(resolve=>setTimeout(resolve,Math.min(duration,600)));
  }
  // Give the complete bar a painted frame even with cached assets or reduced motion.
  await nextFrame();await nextFrame();
 };
 const enter=()=>{
  if(!resourcesReady||entered)return;
  entered=true;if(button)button.disabled=true;view.classList.add('boot-exit');
  // Normal entry is automatic, so this optional lifecycle callback must not
  // depend on a browser user gesture (audio unlock is handled by real input).
  try {const result=onEnter?.();result?.catch?.(()=>{});}catch{}
  const finish=()=>{
   body.classList.remove('boot-active');body.classList.add('boot-reveal');
   view.remove();resolveReady();
   setTimeout(()=>body.classList.remove('boot-reveal'),700);
  };
  setTimeout(finish,reducedMotion()?40:420);
 };
 return {
  progress(value) {
   if(entered||!Number.isFinite(value))return;
   completed=Math.max(completed,Math.max(0,Math.min(1,value)));
   fill.style.width=completed*100+'%';bar.setAttribute('aria-valuenow',String(Math.round(completed*100)));
  },
  ready(callback,options={}) {
   if(readyPromise)return readyPromise;
   onEnter=callback;locale=options.lang==='ar'?'ar':'en';reduced=!!options.reduced;saveBlocked=!!options.saveBlocked;
   if(reducedMotion())view.classList.add('boot-reduced');
   if(saveBlocked){
    button=page.createElement('button');button.id='enter-game';button.className='boot-enter';button.type='button';button.disabled=true;
    button.setAttribute('data-action','enterGame');button.innerHTML='<span></span><i aria-hidden="true">▶</i>';
    button.addEventListener('click',()=>{if(!button.disabled)enter();});
    view.querySelector('.boot-controls').append(button);
   }
   readyPromise=new Promise(resolve=>{resolveReady=resolve;});setCopy();
   const showEntry=async()=>{
    this.progress(1);await finishProgress().catch(()=>{});
    resourcesReady=true;view.classList.add('boot-ready');setCopy();
    page.defaultView?.dispatchEvent?.(new Event('hex:boot-ready'));
    if(button){
     button.disabled=false;button.focus({preventScroll:true});
    }else enter();
   };
   const cover=view.querySelector('.boot-art img');
   if(cover.complete&&cover.naturalWidth)showEntry();
   else decodeImage(cover,3000).catch(()=>view.classList.add('boot-art-missing')).then(showEntry);
   return readyPromise;
  }
 };
}
