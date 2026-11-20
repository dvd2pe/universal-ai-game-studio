// Optional network and paint resources must never hold the game on its loading screen.
export function bounded(operation,ms=8000,label='Resource'){
 return new Promise((resolve,reject)=>{
  let settled=false;
  const finish=(ok,value)=>{if(settled)return;settled=true;clearTimeout(timer);ok?resolve(value):reject(value);};
  const timer=setTimeout(()=>finish(false,new Error(label+' timed out')),ms);
  try{Promise.resolve(typeof operation==='function'?operation():operation).then(value=>finish(true,value),error=>finish(false,error));}catch(error){finish(false,error);}
 });
}
export function decodeImage(image,timeout=8000){
 if(image.complete&&image.naturalWidth)return Promise.resolve(image);
 if(typeof image.decode==='function')return bounded(()=>image.decode(),timeout,'Image');
 return new Promise((resolve,reject)=>{
  let timer;
  const finish=error=>{clearTimeout(timer);image.removeEventListener?.('load',loaded);image.removeEventListener?.('error',failed);error?reject(error):resolve(image);};
  const loaded=()=>finish(),failed=()=>finish(new Error('Image unavailable'));
  if(!image.addEventListener){failed();return;}
  image.addEventListener('load',loaded,{once:true});image.addEventListener('error',failed,{once:true});
  timer=setTimeout(()=>finish(new Error('Image timed out')),timeout);
  if(image.complete)(image.naturalWidth?loaded:failed)();
 });
}
// Weapon art is required by both CSS cards and the battlefield. Use one decoded
// source for both, try an independent format, then bypass a cached failed request.
// Exhaustion rejects startup so bootstrap can offer Retry instead of blank weapons.
export async function loadRequiredImage(sources,{baseURL=globalThis.document?.baseURI,createImage=()=>new Image(),timeout=4000}={}){
 if(!sources.length)throw new Error('Required image has no sources');
 let cause;
 for(let round=0;round<2;round++){
  for(const source of sources){
   const url=new URL(source,baseURL);
   if(round)url.searchParams.set('hex-retry',String(Date.now()));
   const image=createImage();image.src=url.href;
   try{
    await decodeImage(image,timeout);
    if(!image.naturalWidth||!image.naturalHeight)throw new Error('Image is empty');
    return image;
   }catch(error){cause=error;}
  }
 }
 throw new Error('Required weapon artwork could not load. Please retry.',{cause});
}
export function nextPaint(view,timeout=120){
 return new Promise(resolve=>{
  let frame,timer,done=false;
  const finish=()=>{if(done)return;done=true;clearTimeout(timer);if(frame!=null)view?.cancelAnimationFrame?.(frame);resolve();};
  timer=setTimeout(finish,timeout);
  try{frame=view?.requestAnimationFrame?.(finish);}catch{finish();}
 });
}
