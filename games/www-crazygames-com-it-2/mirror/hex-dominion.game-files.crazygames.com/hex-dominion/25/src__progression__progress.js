import {newQuickCharge,normalizeQuickCharge} from './src__economy__quick-charge.js';
import {newBattleSupplies,normalizeBattleSupplies} from './src__economy__battle-supplies.js';
import {WEAPONS,STARTER} from './src__weapons__catalog.js';
import {newDailyProgress,normalizeDailyProgress} from './src__economy__daily.js';
import {newDeploymentProgress,normalizeDeploymentProgress} from './src__economy__deployment.js';
import {newMissionProgress,normalizeMissionProgress} from './src__economy__missions.js';
import {newStagePackProgress,normalizeStagePackProgress} from './src__economy__stage-packs.js';
// Pre-1.7 career thresholds remain only for save migration; gameplay uses LEVEL_TARGETS/currentLevel.
export const THRESHOLDS=[0,150,180,210,245,280,320,360,405,450,500,550,605,660,705];
export const LEVEL_TARGETS=[150,180,210,245,280,320,360,405,450,500,550,605,660,705,750];
export const ARENA_REVISION=1;
export const currentLevel=save=>Math.max(1,Math.min(15,Math.floor(Number(save.arenaProgress?.level))||progressLevel(save.best)));
// Level trophies are collected independently of the lifetime matchmaking rating.
// A completed level opens the next at zero; excess win trophies stay in the rating only.
export function addArenaTrophies(save,amount){
  const level=currentLevel(save),target=LEVEL_TARGETS[level-1];
  const trophies=Math.min(target,Math.max(0,Number(save.arenaProgress?.trophies)||0)+Math.max(0,Number(amount)||0));
  save.arenaProgress=trophies>=target&&level<15?{level:level+1,trophies:0}:{level,trophies};
  return save.arenaProgress;
}
function normalizeArena(save,raw){
  const p=raw.arenaProgress;
  if(raw.arenaRevision===ARENA_REVISION&&p&&Number.isInteger(p.level)&&p.level>=1&&p.level<=15){
    save.arenaProgress={level:p.level,trophies:Math.max(0,Math.min(LEVEL_TARGETS[p.level-1],Math.floor(Number(p.trophies)||0)))};
    addArenaTrophies(save,0);
  }else{
    // Preserve an old player's unlocked level and the actual trophies already collected there.
    // Reaching the old final endpoint represented a completely finished road.
    const level=progressLevel(save.best),start=THRESHOLDS[level-1],end=THRESHOLDS[level]||750;
    save.arenaProgress={level,trophies:save.best>=750?750:Math.max(0,Math.min(end-start,save.best-start))};
    // Keep unclicked reward eligibility when the targets become larger.
    for(let index=0;index<15;index++){
      const oldStart=THRESHOLDS[index],oldTarget=(THRESHOLDS[index+1]||750)-oldStart,count=index===0?3:4;
      for(let marker=0;marker<count;marker++){
        const position=(15+75*marker/(count-1))/100;
        if(save.best>=oldStart+Math.ceil(oldTarget*position))save.roadReady.push('road-'+index+'-'+marker);
      }
    }
  }
  if(Array.isArray(raw.roadReady))for(const id of raw.roadReady)if(typeof id==='string'&&/^road-(?:[0-9]|1[0-4])-[0-3]$/.test(id))save.roadReady.push(id);
  save.roadReady=[...new Set(save.roadReady)];
}

export const BOOST_RATES=[40,37,34,31,28,25,22,19,16,13,12,11,10,9,8,7.5,7,6.5,6,5.5,5,4.5,4,3.5,3,2.75,2.5,2.25,2];
export const progressLevel=t=>Math.max(1,THRESHOLDS.filter(v=>v<=t).length);
export const newSave=()=>({version:1,balanceRevision:2,arenaRevision:ARENA_REVISION,arenaProgress:{level:1,trophies:0},roadRevision:2,roadClaims:{},roadReady:[],roadLegacyBest:null,marketPurchases:{},avatar:0,pendingPack:null,daily:newDailyProgress(),deployment:newDeploymentProgress(),battleSupplies:newBattleSupplies(),quickCharge:newQuickCharge(),missions:newMissionProgress(),weaponAds:{},welcomeGiftClaimed:false,welcomeMessage:false,name:'Commander',identity:{kind:'guest',guestName:'',accountId:'',avatarSource:'custom'},gold:0,gems:0,cores:0,trophies:0,best:0,wins:0,losses:0,deck:[...STARTER],cards:Object.fromEntries(WEAPONS.map(w=>[w.id,{level:1,copies:0,boost:0,owned:STARTER.includes(w.id)}])),claims:{},packs:0,packCycle:0,stagePacks:newStagePackProgress(),pity:0,rewardedLevels:[],weekly:{key:0,score:0},settings:{lang:'en',sound:true,music:true,musicVolume:50,arenaZoom:1,reduced:false},tutorial:false,pending:null});
const isObject=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
const finite=(value,fallback=0)=>Number.isFinite(Number(value))?Number(value):fallback;
const bounded=(value,min=0,max=1e9)=>Math.max(min,Math.min(max,finite(value,min)));
export function normalizeSave(raw){
  const base=newSave();
  if(!isObject(raw))return base;
  if(raw.version!==1){base.welcomeGiftClaimed=true;return base;}
  base.welcomeGiftClaimed=raw.welcomeGiftClaimed!==false;
  base.welcomeMessage=raw.welcomeMessage===true;
  for(const key of ['gold','gems','cores','trophies','best','wins','losses','packs','packCycle','pity'])base[key]=bounded(raw[key]);
  base.avatar=Number.isInteger(raw.avatar)&&raw.avatar>=0&&raw.avatar<12?raw.avatar:0;
  base.name=typeof raw.name==='string'&&raw.name?raw.name.slice(0,64):'Commander';
  if(isObject(raw.identity)){
    base.identity.kind=raw.identity.kind==='crazygames'?'crazygames':'guest';
    if(typeof raw.identity.guestName==='string'&&/^Commander_[0-9]{4}$/.test(raw.identity.guestName))base.identity.guestName=raw.identity.guestName;
    if(typeof raw.identity.accountId==='string')base.identity.accountId=raw.identity.accountId.slice(0,128);
    base.identity.avatarSource=raw.identity.avatarSource==='crazygames'?'crazygames':'custom';
  }
  for(const w of WEAPONS)if(Number.isInteger(raw.weaponAds?.[w.id]))base.weaponAds[w.id]=bounded(raw.weaponAds[w.id],0,3);
  if(isObject(raw.claims))for(const [key,value] of Object.entries(raw.claims)){
    if(key.length>100||['__proto__','constructor','prototype'].includes(key))continue;
    if(typeof value==='boolean')base.claims[key]=value;
    else if((typeof value==='number'||typeof value==='string')&&Number.isFinite(Number(value)))base.claims[key]=Math.max(0,Number(value));
  }
  if(isObject(raw.settings)){
    base.settings.lang=raw.settings.lang==='ar'?'ar':'en';
    if([1,1.25,1.45,1.75,2].includes(raw.settings.arenaZoom))base.settings.arenaZoom=raw.settings.arenaZoom;
    if(Number.isFinite(raw.settings.musicVolume))base.settings.musicVolume=Math.max(0,Math.min(100,raw.settings.musicVolume));
    for(const key of ['sound','music','reduced'])if(typeof raw.settings[key]==='boolean')base.settings[key]=raw.settings[key];
  }
  for(const w of WEAPONS){
    const c=raw.cards?.[w.id];
    if(isObject(c))base.cards[w.id]={owned:c.owned===true||STARTER.includes(w.id),level:Math.floor(bounded(c.level,1,30)),copies:Math.floor(bounded(c.copies)),boost:bounded(c.boost)};
  }
  const deck=[...new Set(Array.isArray(raw.deck)?raw.deck:[])].filter(id=>typeof id==='string'&&Object.hasOwn(base.cards,id)&&base.cards[id].owned);
  base.deck=deck.length===5?deck:[...STARTER];
  if(raw.balanceRevision!==2&&base.deck.includes('storm')&&!base.deck.includes('flak'))base.deck[base.deck.indexOf('storm')]='flak';
  base.rewardedLevels=Array.isArray(raw.rewardedLevels)?[...new Set(raw.rewardedLevels)].filter(v=>Number.isInteger(v)&&v>=2&&v<=15):[];
  normalizeArena(base,raw);
  base.stagePacks=normalizeStagePackProgress(raw.stagePacks,currentLevel(base),base.packCycle,base.arenaProgress.trophies);
  base.roadLegacyBest=raw.roadRevision>=1?(Number.isFinite(raw.roadLegacyBest)?Math.max(0,Math.min(base.best,raw.roadLegacyBest)):null):base.best;
  if(isObject(raw.roadClaims))for(const [id,r] of Object.entries(raw.roadClaims)){
    if(!/^road-(?:[0-9]|1[0-4])-[0-3]$/.test(id)||!isObject(r)||r.id!==id)continue;
    const receipt={id,kind:typeof r.kind==='string'?r.kind:'',amount:bounded(r.amount),threshold:bounded(r.threshold)};
    if(isObject(r.card)&&Object.hasOwn(base.cards,r.card.id)&&Number.isInteger(r.card.amount)&&r.card.amount>0)receipt.card={id:r.card.id,amount:bounded(r.card.amount),isNew:!!r.card.isNew};
    if(isObject(r.loot))receipt.loot=Object.fromEntries(['gold','gems','cores','packs'].map(k=>[k,bounded(r.loot[k])]));
    base.roadClaims[id]=receipt;
  }
  if(isObject(raw.marketPurchases))for(const [id,p] of Object.entries(raw.marketPurchases)){
    if(!/^[a-zA-Z][a-zA-Z0-9-]{0,40}$/.test(id)||!isObject(p)||!Number.isInteger(p.day)||!Number.isInteger(p.count)||p.count<0)continue;
    base.marketPurchases[id]={day:p.day,count:Math.min(100,p.count)};
  }
  if(isObject(raw.weekly)&&Number.isFinite(raw.weekly.key)&&Number.isFinite(raw.weekly.score))base.weekly={key:Math.trunc(raw.weekly.key),score:bounded(raw.weekly.score,-1e9,1e9)};
  base.tutorial=!!raw.tutorial;
  base.pending=normalizeResult(raw.pending);
  const p=raw.pendingPack;
  if(isObject(p)&&Number.isInteger(p.tier)&&p.tier>=0&&p.tier<=2&&Number.isFinite(p.gold)&&p.gold>=0&&Array.isArray(p.cards)&&p.cards.length<=20&&p.cards.every(c=>isObject(c)&&Object.hasOwn(base.cards,c.id)&&Number.isInteger(c.amount)&&c.amount>0))base.pendingPack={...p,cards:p.cards.map(c=>({...c}))};
  base.daily=normalizeDailyProgress(raw.daily);
  base.deployment=normalizeDeploymentProgress(raw.deployment);
  base.battleSupplies=normalizeBattleSupplies(raw.battleSupplies);
  base.quickCharge=normalizeQuickCharge(raw.quickCharge);
  base.missions=normalizeMissionProgress(raw.missions);
  return base;
}
export function upgradeCost(level){return {copies:[3,5,10,15,20][level-1]||Math.ceil(20*1.19**(level-5)),gold:[100,150,300,500,1000][level-1]||Math.ceil(1000*1.22**(level-5)/50)*50};}
// Boost fills an alternate upgrade requirement. Only an explicit paid Arsenal upgrade changes level.
export function boostRequirement(level){return level>=30?Infinity:100/BOOST_RATES[level-1];}
export function boostFraction(card){return card.level>=30?1:Math.min(1,card.boost/boostRequirement(card.level));}
export function boostCard(save,id,result){
 const c=save.cards[id];
 if(!c?.owned||!result?.deck.includes(id)||result.boosted.includes(id)||c.level>=30||boostFraction(c)>=1||save.cores<1)return false;
 save.cores--;c.boost++;result.boosted.push(id);return true;
}
export function upgradeCard(save,id,method='copies'){
 const c=save.cards[id];if(!c?.owned||c.level>=30||!['copies','boost'].includes(method))return false;
 const cost=upgradeCost(c.level),need=boostRequirement(c.level);
 if(save.gold<cost.gold||method==='copies'&&c.copies<cost.copies||method==='boost'&&c.boost+1e-9<need)return false;
 save.gold-=cost.gold;
 if(method==='copies')c.copies-=cost.copies;
 else c.boost=Math.max(0,c.boost-need);
 c.level++;
 if(c.level===30)c.boost=0;
 return true;
}
export function weekKey(now=Date.now()){return Math.floor((now-345600000)/604800000);}
export function updateWeek(save){const key=weekKey();if(save.weekly.key!==key)save.weekly={key,score:0};}

function isValidResult(r){return !!r&&typeof r.won==='boolean'&&Array.isArray(r.counts)&&r.counts.length===3&&r.counts.every(n=>Number.isFinite(n)&&n>=0&&n<=1000)&&r.counts.reduce((a,b)=>a+b)===1000&&Array.isArray(r.deck)&&r.deck.length===5&&new Set(r.deck).size===5&&r.deck.every(id=>WEAPONS.some(w=>w.id===id))&&Array.isArray(r.boosted)&&r.boosted.every(id=>r.deck.includes(id))&&r.offer&&WEAPONS.some(w=>w.id===r.card)&&WEAPONS.some(w=>w.id===r.offer.card)&&['gold','cores','copies','gems'].every(k=>Number.isFinite(r.offer[k])&&r.offer[k]>=0)&&Number.isFinite(r.delta)&&Number.isFinite(r.gold)&&Number.isFinite(r.copies);}

function normalizeResult(r){
  if(!isValidResult(r))return null;
  const offered=Array.isArray(r.offer.cards)?r.offer.cards:null;
  const validCards=offered&&offered.length>=1&&offered.length<=5&&offered.every(c=>isObject(c)&&WEAPONS.some(w=>w.id===c.id)&&Number.isSafeInteger(c.amount)&&c.amount>0)&&new Set(offered.map(c=>c.id)).size===offered.length;
  const cards=validCards?offered.map(c=>({...c})):[{id:r.offer.card,amount:Math.floor(bounded(r.offer.copies))}];
  const offerStatus=r.adClaimed===true||r.offerStatus==='claimed'?'claimed':r.offerStatus==='declined'?'declined':'pending';
  const result={...r,counts:[...r.counts],deck:[...r.deck],boosted:[...new Set(r.boosted)],offer:{...r.offer,cards},offerStatus,adClaimed:offerStatus==='claimed',gems:bounded(r.gems),cores:bounded(r.cores),summarySeen:r.summarySeen===true};
  const stageAward=r.stagePackAward;
  if(isObject(stageAward)&&Number.isInteger(stageAward.stageIndex)&&stageAward.stageIndex>=0&&stageAward.stageIndex<15&&typeof stageAward.earned==='boolean'){
    result.stagePackAward={stageIndex:stageAward.stageIndex,earned:stageAward.earned};
    if(stageAward.earned&&Number.isInteger(stageAward.slot)&&stageAward.slot>=0&&stageAward.slot<5)result.stagePackAward.slot=stageAward.slot;
  }else delete result.stagePackAward;
  if(isObject(r.milestone)){
    const m=r.milestone;
    result.milestone={...m,cards:Array.isArray(m.cards)?m.cards.filter(c=>isObject(c)&&WEAPONS.some(w=>w.id===c.id)&&Number.isInteger(c.amount)&&c.amount>0).map(c=>({...c})):[],levels:Array.isArray(m.levels)?m.levels.filter(level=>Number.isInteger(level)&&level>=2&&level<=15):[],rewards:Array.isArray(m.rewards)?m.rewards.filter(isObject):[]};
  }else result.milestone={cards:[],levels:[],rewards:[]};
  return result;
}




