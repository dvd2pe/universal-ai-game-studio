import {bounded} from './src__platform__loading.js';
export const SAVE_KEY='hex-dominion-save-v1';
export const BACKUP_KEY=SAVE_KEY+'.backup';
// Keep the preceding cloud save in the same SDK record: one Set call per commit.
export const BACKUP_FIELD='__hexPreviousSave';
const storedValue=value=>value==null||value===''?null:value;
const parse=value=>{
 if(value==null||value==='')return null;
 const data=JSON.parse(value);
 if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('corrupt-save');
 if(data.version!==1)throw new Error('unsupported-save');
 const {[BACKUP_FIELD]:backup,...progress}=data;
 return progress;
};
function isCrazyGames(value){try{return /(^|\.)crazygames\.com$/.test(new URL(value).hostname);}catch{return false;}}
export class Platform{
 constructor(options={}){this.sdk=null;this.mode='standalone';this.adsEnabled=false;this.adBusy=false;this.saveError=false;this.saveBlocked=false;this.saveIssue='';this.gameActive=false;this.options=options;this.loaded=false;this.expectedSave=null;this.cloudExpected=false;this.lastAdError='';}
 async init(){
  const here=globalThis.location,view=globalThis.window,page=globalThis.document;
  const local=here?.hostname==='localhost'||here?.hostname==='127.0.0.1';
  const ancestors=Array.from(here?.ancestorOrigins||[]);
  this.cloudExpected=isCrazyGames(here?.href)||isCrazyGames(page?.referrer)||ancestors.some(isCrazyGames);
  // Let the SDK detect supported hosts, including preview and international domains.
  if(here?.protocol!=='file:'||local||this.cloudExpected||view?.CrazyGames?.SDK){
   let script;
   try{
    if(!view?.CrazyGames?.SDK)await bounded(()=>new Promise((resolve,reject)=>{
     script=page.createElement('script');script.src='../../../sdk.crazygames.com/crazygames-sdk-v3.js';script.async=true;
     script.onload=resolve;script.onerror=()=>reject(new Error('SDK unavailable'));page.head.append(script);
    }),this.options.sdkTimeout??12000,'Platform script');
    const sdk=view?.CrazyGames?.SDK;
    if(!sdk?.init)throw new Error('SDK unavailable');
    await bounded(()=>sdk.init(),this.options.initTimeout??12000,'Platform initialization');
    if(sdk.environment!=='disabled'){this.sdk=sdk;this.mode=sdk.environment;this.event('loadingStart');}
    else if(this.cloudExpected)this.blockSave('platform-unavailable');
   }catch{if(this.cloudExpected)this.blockSave('platform-unavailable');console.info('Platform unavailable; continuing without platform features.');}
   finally{if(script){script.onload=null;script.onerror=null;if(!this.sdk)script.remove?.();}}
  }
  // Full Launch ads require both the release flag and a working SDK ad module.
  this.adsEnabled=typeof this.sdk?.ad?.requestAd==='function'&&view?.HEX_CONFIG?.rewardedAds===true;
  this.lastAdError=this.adsEnabled?'':this.sdk?'disabled':'sdk-unavailable';
 }
 async getUser(){
  const user=this.sdk?.user;
  // Local SDK defaults to a fake "user1"; only treat it as an account when a tester opts in.
  if(this.mode==='local'&&!new URLSearchParams(globalThis.location?.search||'').has('user_response'))return null;
  if(!user||user.isUserAccountAvailable===false||typeof user.getUser!=='function')return null;
  try{return await bounded(()=>user.getUser(),this.options.userTimeout??5000,'CrazyGames user');}catch{return null;}
 }
 watchUser(onChange){
  const user=this.sdk?.user;
  if(this.mode==='local'&&!new URLSearchParams(globalThis.location?.search||'').has('user_response'))return ()=>{};
  if(typeof user?.addAuthListener!=='function')return ()=>{};
  const listener=value=>onChange(value);
  try{user.addAuthListener(listener);}catch{return ()=>{};}
  return ()=>{try{user.removeAuthListener?.(listener);}catch{}};
 }
 blockSave(issue){this.saveBlocked=true;this.saveError=true;this.saveIssue=issue;}
 // SDK audio policy is temporary and must not overwrite the player's saved preferences.
 watchAudioSettings(onMute){
  const game=this.sdk?.game;let active=true;
  const listener=settings=>{if(active)onMute(settings?.muteAudio===true);};
  try{listener(game?.settings);}catch{}
  // A subscription failure must not undo an already-applied platform mute.
  try{game?.addSettingsChangeListener?.(listener);}catch{}
  return ()=>{if(!active)return;active=false;try{game?.removeSettingsChangeListener?.(listener);}catch{}};
 }
 storage(){const storage=this.sdk?this.sdk.data:globalThis.localStorage;if(!storage?.getItem||!storage?.setItem)throw new Error('Storage unavailable');return storage;}
 load(){
  this.loaded=true;
  if(this.saveBlocked)return null;
  let storage,value;
  try{storage=this.storage();value=storage.getItem(SAVE_KEY);this.expectedSave=storedValue(value);}catch{this.blockSave('read-failed');return null;}
  try{return parse(value);}catch(error){
   // Never replace an unreadable or newer save with normalized starter progress.
   this.blockSave(error.message==='unsupported-save'?'unsupported-save':'corrupt-save');
   try{const backup=JSON.parse(value)?.[BACKUP_FIELD];if(backup)return parse(JSON.stringify(backup));}catch{}
   try{return parse(storage.getItem(BACKUP_KEY));}catch{return null;}
  }
 }
 save(data){
  if(!this.loaded)this.load();
  if(this.saveBlocked)return false;
  try{
   const storage=this.storage(),progress=parse(JSON.stringify(data)),json=JSON.stringify(progress),previous=storage.getItem(SAVE_KEY);
   // A tab must never erase progress committed after the version it loaded.
   if(storedValue(previous)!==this.expectedSave){this.blockSave('save-conflict');return false;}
   // Validate the current value too: another tab may have changed it since load.
   let prior=null;
   if(previous!=null&&previous!==''){
    try{prior=parse(previous);}catch(error){this.blockSave(error.message==='unsupported-save'?'unsupported-save':'corrupt-save');return false;}
    if(JSON.stringify(prior)===json){this.saveError=false;return true;}
   }
   // Standalone storage retains its separate backup; SDK saves are atomic.
   if(prior&&!this.sdk)storage.setItem(BACKUP_KEY,previous);
   const payload=this.sdk&&prior?JSON.stringify({...progress,[BACKUP_FIELD]:prior}):json;
   storage.setItem(SAVE_KEY,payload);this.expectedSave=payload;this.saveError=false;return true;
  }catch{this.saveError=true;return false;}
 }
 event(name){
  if(name==='gameplayStart'&&this.gameActive)return false;
  if(name==='gameplayStop'&&!this.gameActive)return false;
  // Mark the transition only after the SDK accepted the call. A missing or
  // throwing provider must not suppress the next real gameplay transition.
  try{
   const game=this.sdk?.game;if(typeof game?.[name]!=='function')return false;
   game[name]();
   if(name==='gameplayStart')this.gameActive=true;
   if(name==='gameplayStop')this.gameActive=false;
   return true;
  }catch{return false;}
 }
 async retryAds(){
  if(this.adBusy)return false;
  if(!this.sdk?.ad?.requestAd||globalThis.window?.HEX_CONFIG?.rewardedAds!==true)return false;
  try{
   if(this.lastAdError==='adblock'&&typeof this.sdk.ad.hasAdblock==='function'&&await bounded(()=>this.sdk.ad.hasAdblock(),5000,'Adblock check'))return false;
  }catch{return false;}
  // This only re-enables the next explicit user request; never auto-play an ad.
  this.adsEnabled=true;this.lastAdError='';return true;
 }
 rewarded(callbacks={}){return this.requestAd('rewarded',callbacks);}
 midgame(callbacks={}){return this.requestAd('midgame',callbacks);}
 requestAd(type,callbacks={}){
  if(!this.adsEnabled||this.adBusy||typeof this.sdk?.ad?.requestAd!=='function')return Promise.resolve(false);
  this.adBusy=true;
  return new Promise(resolve=>{
   let done=false,started=false,timer;
   this.lastAdError='';
   const finish=ok=>{if(done)return;done=true;clearTimeout(timer);this.adBusy=false;try{callbacks.end?.();}catch{}resolve(ok);};
   const error=reason=>{
    if(done)return;
    this.lastAdError=typeof reason?.code==='string'?reason.code:'other';
    if(['adsDisabled','adsDisabledBasicLaunch','adblock'].includes(this.lastAdError))this.adsEnabled=false;
    finish(false);
   };
   try{
    // A silent failed auction must not trap the player. Stop this watchdog once video starts.
    timer=setTimeout(()=>error({code:'request-timeout'}),this.options.adRequestTimeout??45000);
    const request=this.sdk.ad.requestAd(type,{
     adStarted:()=>{if(done||started)return;started=true;clearTimeout(timer);try{callbacks.start?.();}catch{}},
     adFinished:()=>finish(true),adError:error
    });
    // Current SDK completion is callback-based; also consume optional provider rejections.
    Promise.resolve(request).catch(error);
   }catch(reason){error(reason);}
  });
 }
}
