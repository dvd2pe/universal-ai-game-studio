// Keep the game's UI locked from the auction request through its final callback.
// Audio is a separate policy: it is muted only when the video actually starts.
export class RewardedAdSession {
 constructor({platform,sound,page,roots}) {
  this.platform=platform;this.sound=sound;this.page=page;this.roots=roots;this.busy=false;
 }
 async request(label) {
  if(this.busy||this.platform.adBusy||!this.platform.adsEnabled)return false;
  this.busy=true;
  const previousFocus=this.page.activeElement;
  const state=this.roots.map(root=>({root,inert:root.inert,busy:root.getAttribute('aria-busy')}));
  const overlay=this.page.createElement('div');
  overlay.id='ad-wait';overlay.tabIndex=-1;overlay.setAttribute('role','status');overlay.setAttribute('aria-live','polite');
  overlay.style.cssText='position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;gap:14px;background:#211436dd;color:#fff5e7;font:700 18px system-ui;text-align:center;padding:24px';
  const spinner=this.page.createElement('span');spinner.className='spinner';spinner.setAttribute('aria-hidden','true');
  const message=this.page.createElement('span');message.textContent=label;overlay.append(spinner,message);
  try {
   for(const {root} of state){root.inert=true;root.setAttribute('aria-busy','true');}
   this.page.body.append(overlay);overlay.focus({preventScroll:true});
   return await this.platform.rewarded({start:()=>{this.sound.muteAd(true);overlay.style.display='none';}});
  } finally {
   try{this.sound.muteAd(false);}catch{}
   overlay.remove();
   for(const {root,inert,busy} of state){root.inert=inert;if(busy===null)root.removeAttribute('aria-busy');else root.setAttribute('aria-busy',busy);}
   this.busy=false;
   if(previousFocus?.isConnected&&!previousFocus.closest?.('[inert]'))previousFocus.focus?.({preventScroll:true});
  }
 }
}
