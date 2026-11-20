// Wait for the CrazyGames interstitial callback before revealing the full result.
// The SDK can decline an ad; an error still completes this break.
export async function waitForMatchBreakAd({platform,sound,tutorial=false}){
 if(tutorial||!platform.adsEnabled)return false;
 let muted=false;
 const unmute=()=>{if(muted){muted=false;sound.muteAd(false);}};
 try{
  return await platform.midgame({
   start:()=>{if(!muted){muted=true;sound.muteAd(true);}},
   end:unmute
  });
 }catch{
  return false;
 }finally{
  unmute();
 }
}
export async function completeMatchBreak({platform,sound,tutorial=false,isCurrent,continueToResult}){
 if(!isCurrent())return false;
 await waitForMatchBreakAd({platform,sound,tutorial});
 if(!isCurrent())return false;
 continueToResult();
 return true;
}
// Reading time is independent of motion settings. Hidden tabs do not consume it.
export const MATCH_RESULT_READ_MS=2200;
export async function waitForVisibleResult(duration,isCurrent,{
 now=()=>performance.now(),sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms)),
 visible=()=>globalThis.document?.visibilityState!=='hidden'
}={}){
 let remaining=duration,last=now(),wasVisible=visible();
 while(remaining>0&&isCurrent()){
  await sleep(Math.min(100,remaining));
  const current=now(),isVisible=visible();
  if(wasVisible&&isVisible)remaining-=Math.max(0,current-last);
  last=current;wasVisible=isVisible;
 }
}
// One transition per completed battle; repeated animation callbacks share its promise.
export function createMatchResultTransition({wait=waitForVisibleResult,...flow}){
 let pending;
 return ()=>pending??=(async()=>{
  if(!flow.isCurrent())return false;
  await wait(MATCH_RESULT_READ_MS,flow.isCurrent);
  return completeMatchBreak(flow);
 })();
}
