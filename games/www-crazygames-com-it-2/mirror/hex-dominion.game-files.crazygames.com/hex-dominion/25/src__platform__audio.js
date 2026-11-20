const optionalAudio=operation=>{try{operation()?.catch?.(()=>{});}catch{}};
const MENU_MUSIC_GAIN=.36;
const BATTLE_MUSIC_GAIN=.34;
const EFFECT_GAIN=1;

// Recorded orchestral music with original, layered Web Audio effects.
// Search percussion owns its own bus so it can end cleanly before combat.
export class GameAudio {
 constructor() {
  this.context=null; this.sound=true; this.music=true; this.musicVolume=50; this.inBattle=false;
  this.searching=false; this.searchNodes=new Set(); this.effectNodes=new Set();
  this.searchTimer=0; this.hidden=false; this.platformMuted=false;this.adMuted=false; this.unlocked=false; this.lastCue=new Map();
  this.track=new Audio('assets__adventure.mp3');
  this.track.loop=true; this.track.preload='none'; this.track.volume=MENU_MUSIC_GAIN*.5;
  this.track.addEventListener('error',()=>{this.unavailable=true;});
 }
 get musicVolume() { return this._musicVolume; }
 set musicVolume(value) {
  this._musicVolume=Number.isFinite(value)?Math.max(0,Math.min(100,value)):50;
 }
 unlock() {
  this.unlocked=true;
  if(!this.context&&!this.effectsUnavailable) {
   let context,bus;
   try {
    context=new (window.AudioContext||window.webkitAudioContext)();
    const n=context.sampleRate,noise=context.createBuffer(1,n,n),data=noise.getChannelData(0);
    for(let i=0;i<n;i++)data[i]=Math.random()*2-1;
    bus=context.createGain();bus.gain.value=EFFECT_GAIN;bus.connect(context.destination);
    // Publish the effect graph only when every required node is ready.
    this.context=context;this.noise=noise;this.effectBus=bus;
   } catch {
    optionalAudio(()=>bus?.disconnect());optionalAudio(()=>context?.close?.());
    this.effectsUnavailable=true;
   }
  }
  if(this.context?.state==='suspended'&&!this.muted)optionalAudio(()=>this.context.resume());
  this.sync();
 }
 sync() {
  // Keep menus and combat at a comparable level while leaving room for effects.
  const level=this.musicVolume/100;
  this.track.volume=(this.inBattle?BATTLE_MUSIC_GAIN:MENU_MUSIC_GAIN)*level;
  this.track.muted=this.muted;
  if(this.effectBus) this.effectBus.gain.value=this.sound&&!this.muted?EFFECT_GAIN:0;
  if(this.searchBus) this.searchBus.gain.value=this.music&&!this.muted?.72*level:0;
  if(!this.sound||this.platformMuted||this.adMuted) this.stopEffects();
  if(!this.music||level===0) this.stopNodes(this.searchNodes);
  if(!this.unlocked||!this.music||level===0||this.muted||this.searching) {
   optionalAudio(()=>this.track.pause()); return;
  }
  if(this.track.paused&&!this.unavailable)optionalAudio(()=>this.track.play());
 }
 startSearch(duration) {
  this.endSearch(false); this.searching=true; this.searchFinished=false;
  this.searchStarted=performance.now(); this.searchDuration=Math.max(1,duration); this.searchBeat=0;
  if(this.context) {
   try{this.searchBus=this.context.createGain();this.searchBus.gain.value=0;this.searchBus.connect(this.context.destination);}
   catch{this.disableEffects();}
  }
  this.sync(); this.searchPulse();
 }
 searchPulse() {
  if(!this.searching||this.searchFinished) return;
  const progress=Math.min(1,(performance.now()-this.searchStarted)/this.searchDuration),beat=this.searchBeat++;
  if(this.music&&this.musicVolume>0&&!this.muted&&this.context?.state==='running') {
   this.drum(beat%4===0?'low':beat%2?'snare':'tom',beat%4===0?1:.6);
   if(progress>.55) this.drum('hat',.22);
  }
  this.searchTimer=setTimeout(()=>this.searchPulse(),310-progress*200);
 }
 drum(kind,strength=1) {try{this.drumCue(kind,strength);}catch{this.disableEffects();}}
 drumCue(kind,strength=1) {
  const a=this.context;
  if(!this.searchBus||!this.music||this.musicVolume===0||this.muted||!a||a.state!=='running') return;
  const t=a.currentTime,g=a.createGain(),nodes=[g]; g.connect(this.searchBus);
  const duration=kind==='cymbal'?.65:kind==='low'?.35:kind==='tom'?.22:.09;
  let n;
  if(kind==='low'||kind==='tom') {
   n=a.createOscillator(); n.type='sine';
   n.frequency.setValueAtTime(kind==='low'?150:230,t);
   n.frequency.exponentialRampToValueAtTime(kind==='low'?45:78,t+duration);
   n.connect(g); g.gain.setValueAtTime(.0001,t);
   g.gain.exponentialRampToValueAtTime(.16*strength,t+.008);
  } else {
   n=a.createBufferSource(); n.buffer=this.noise;
   const f=a.createBiquadFilter(); nodes.push(f);
   f.type=kind==='snare'?'bandpass':'highpass';
   f.frequency.value=kind==='snare'?1700:5700; f.Q.value=.7;
   n.connect(f).connect(g); g.gain.setValueAtTime((kind==='cymbal'?.12:.08)*strength,t);
  }
  g.gain.exponentialRampToValueAtTime(.0001,t+duration);
  this.register(n,nodes,this.searchNodes); n.start(t); n.stop(t+duration);
 }
 finishSearch() {
  if(!this.searching||this.searchFinished) return;
  this.searchFinished=true; clearTimeout(this.searchTimer);
  if(this.music&&this.musicVolume>0&&!this.muted) { this.drum('low',1.5); this.drum('cymbal',.8); }
 }
 endSearch(resume=true) {
  clearTimeout(this.searchTimer); this.searching=false; this.searchFinished=true;
  this.stopNodes(this.searchNodes);optionalAudio(()=>this.searchBus?.disconnect());this.searchBus=null;
  if(resume) this.sync();
 }
 releaseVoice(voice,stop=false) {
  voice.source.onended=null;
  if(stop)optionalAudio(()=>voice.source.stop());
  optionalAudio(()=>voice.source.disconnect());
  for(const node of voice.nodes)optionalAudio(()=>node.disconnect());
 }
 register(source,nodes,set=this.effectNodes) {
  const voice={source,nodes};set.add(voice);
  source.onended=()=>{set.delete(voice);this.releaseVoice(voice);};
 }
 stopNodes(set) {for(const voice of set)this.releaseVoice(voice,true);set.clear();}
 stopEffects() {this.stopNodes(this.effectNodes);}
 disableEffects() {
  this.stopEffects();this.stopNodes(this.searchNodes);
  optionalAudio(()=>this.searchBus?.disconnect());optionalAudio(()=>this.effectBus?.disconnect());
  optionalAudio(()=>this.context?.close?.());
  this.searchBus=null;this.effectBus=null;this.noise=null;this.context=null;this.effectsUnavailable=true;
 }
 layer(freq,end,duration,volume,type='sine',delay=0) {
  const a=this.context,t=a.currentTime+delay,o=a.createOscillator(),g=a.createGain();
  o.type=type; o.frequency.setValueAtTime(freq,t);
  o.frequency.exponentialRampToValueAtTime(end,t+duration);
  g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(volume,t+.008);
  g.gain.exponentialRampToValueAtTime(.0001,t+duration);
  o.connect(g).connect(this.effectBus); this.register(o,[g]); o.start(t); o.stop(t+duration);
 }
 noiseHit(duration=.2,cutoff=900,volume=.1,delay=0,mode='lowpass') {
  const a=this.context,t=a.currentTime+delay,n=a.createBufferSource(),filter=a.createBiquadFilter(),g=a.createGain();
  n.buffer=this.noise; filter.type=mode; filter.frequency.setValueAtTime(cutoff,t);
  filter.frequency.exponentialRampToValueAtTime(mode==='highpass'?cutoff*.6:130,t+duration);
  filter.Q.value=.6; g.gain.setValueAtTime(.0001,t);
  g.gain.exponentialRampToValueAtTime(volume,t+.006);
  g.gain.exponentialRampToValueAtTime(.0001,t+duration);
  n.connect(filter).connect(g).connect(this.effectBus);
  this.register(n,[filter,g]); n.start(t); n.stop(t+duration);
 }
 canPlay(key,gap=70) {
  if(!this.sound||this.muted||!this.effectBus||!this.noise||this.context?.state!=='running') return false;
  const now=performance.now(),last=this.lastCue.get(key);
  if(last!==undefined&&now-last<gap) return false;
  this.lastCue.set(key,now); return true;
 }
 playDeploy(id) {try{this.deployCue(id);}catch{this.disableEffects();}}
 deployCue(id) {
  if(!this.canPlay('deploy',65)) return;
  // Foley-like mechanical, organic and charged cues make each placement distinct.
  const thump=(low=110)=>{this.noiseHit(.11,800,.06);this.layer(low,40,.22,.055);};
  const metal=(freq=980,delay=0)=>{this.noiseHit(.07,3400,.035,delay,'bandpass');this.layer(freq,freq*.94,.18,.012,'sine',delay);};
  switch(id) {
   case 'hive':
    thump(92); this.layer(170,225,.34,.022,'triangle',.05);
    this.layer(177,231,.3,.013,'triangle',.065); this.noiseHit(.22,1300,.02,.08); break;
   case 'laser':
    thump(90); this.layer(170,700,.33,.028); this.layer(350,1050,.31,.011,'sine',.04);
    this.noiseHit(.15,4300,.025,.24,'highpass'); break;
   case 'sweeper':
    thump(125); metal(850,.03); metal(1240,.105); this.noiseHit(.09,2100,.03,.16); break;
   case 'horn':
    thump(105); this.layer(196,185,.38,.033,'triangle',.07);
    this.layer(294,278,.34,.015,'sine',.08); break;
   case 'storm':
    this.noiseHit(.48,2600,.075); this.layer(82,30,.55,.05);
    this.noiseHit(.11,6500,.045,.06,'highpass'); break;
   case 'flak':
    thump(135); metal(1350,.04); metal(1510,.15);
    this.layer(280,120,.21,.018,'triangle',.07); break;
   case 'sapper':
    this.noiseHit(.15,550,.045); metal(740,.04); metal(840,.13);
    this.layer(98,47,.18,.045); break;
   case 'mortar':
    thump(75); this.layer(65,31,.4,.06); metal(540,.1); this.noiseHit(.19,650,.04,.06); break;
   case 'ninjas':
    this.noiseHit(.2,6200,.05,0,'highpass'); this.noiseHit(.18,4300,.04,.11,'highpass');
    this.layer(360,120,.18,.015,'sine',.09); break;
   case 'iron':
    thump(84); metal(630,.07); metal(1260,.1); this.layer(132,66,.35,.035); break;
   case 'alien':
    this.layer(145,330,.42,.026); this.layer(218,490,.37,.014,'sine',.04);
    this.noiseHit(.32,3700,.028,0,'bandpass'); break;
   case 'huntress':
    this.noiseHit(.09,780,.038); this.layer(410,160,.2,.028,'triangle',.025);
    this.noiseHit(.14,4200,.026,.07,'highpass'); break;
   case 'ballista':
    thump(116); this.layer(185,90,.22,.03,'triangle',.035);
    metal(460,.1); this.noiseHit(.18,1200,.04,.09); break;
   case 'grenadier':
    thump(108); metal(1160,.04); this.noiseHit(.22,680,.05,.13); this.layer(78,35,.28,.035,'sine',.13); break;
   case 'tnt':
    this.layer(120,45,.24,.05); this.noiseHit(.35,5600,.042,.05,'highpass');
    this.noiseHit(.08,900,.028,.08); break;
   case 'ball':
    thump(80); this.noiseHit(.4,480,.07,.04); this.layer(145,52,.43,.025,'triangle',.02); break;
   case 'deflector':
    thump(135); this.layer(430,810,.28,.022); this.layer(650,1215,.29,.012,'sine',.03);
    metal(1660,.15); break;
   case 'flame':
    this.noiseHit(.1,2900,.045); this.noiseHit(.5,1300,.065,.07);
    this.layer(74,43,.36,.03,'sine',.05); break;
   case 'tank':
    this.layer(65,32,.52,.075); this.noiseHit(.45,520,.06);
    metal(540,.09); metal(690,.19); metal(460,.28); break;
   case 'tesla':
    thump(115); this.layer(240,680,.26,.02,'triangle',.04);
    this.noiseHit(.09,5800,.04,.1,'highpass'); this.noiseHit(.075,4700,.035,.23,'highpass'); break;
   default: thump(); metal();
  }
 }
 celebration(kind) {
  const notes=kind==='newWeapon'?[392,523.25,659.25,783.99]:kind==='win'?[392,493.88,587.33,783.99]:[523.25,659.25,783.99];
  const gap=kind==='win'?.11:.085;
  for(const [i,n] of notes.entries()) {
   this.layer(n,n*1.0008,.64,.026,'sine',i*gap);
   this.layer(n*2,n*2,.36,.006,'sine',i*gap+.008);
  }
  if(kind==='win') {this.layer(98,49,.52,.045);this.noiseHit(.65,6800,.024,.15,'highpass');}
  else if(kind==='newWeapon') {this.noiseHit(.5,6100,.032,.07,'highpass');this.layer(131,65,.35,.028);}
  else {this.noiseHit(.22,4300,.022,.11,'highpass');}
 }
 play(name) {try{this.playCue(name);}catch{this.disableEffects();}}
 playCue(name) {
  if(name==='deploy') return this.playDeploy();
  const reward=['win','boost','upgrade','newWeapon'].includes(name);
  if(!this.canPlay(reward?'celebration':name,reward?140:name==='laser'?130:70)) return;
  if(['blast','destroy'].includes(name)) {this.noiseHit(.35,700,.12);this.layer(100,36,.28,.085);}
  else if(name==='laser') {this.noiseHit(.35,5500,.065);this.layer(620,95,.36,.028);}
  else if(reward) this.celebration(name==='boost'?'upgrade':name);
  else if(name==='pack') {this.noiseHit(.55,4800,.13);this.layer(160,55,.35,.06);}
  else if(name==='defeat') {this.layer(196,146.83,.65,.03);this.layer(130.81,98,.75,.022,'sine',.07);this.noiseHit(.4,460,.035);}
  else if(name==='deny') this.layer(160,100,.18,.035);
  else {this.noiseHit(.05,2900,.045);this.layer(780,530,.07,.023);}
 }
 get muted() { return this.hidden||this.platformMuted||this.adMuted; }
 muteAd(value) {
  this.adMuted=!!value;
  this.applyMute();
 }
 mutePlatform(value) {
  this.platformMuted=!!value;
  this.applyMute();
 }
 muteHidden(value) {
  this.hidden=!!value;
  this.applyMute();
 }
 applyMute() {
  if(this.muted) {
   this.stopEffects();this.stopNodes(this.searchNodes);optionalAudio(()=>this.context?.suspend());
  } else if(this.unlocked)optionalAudio(()=>this.context?.resume());
  this.sync();
 }
}
