import {THRESHOLDS,LEVEL_TARGETS,currentLevel} from './src__progression__progress.js';
import {WEAPONS} from './src__weapons__catalog.js';

export const ROAD_REVISION=2;
export const ROAD_END=750;
const WALLET=['gold','gems','cores','packs'];
// Preserve the original thresholds when recognizing pre-road legacy awards.
// Moving markers must never replay an award or silently mark a new one claimed.
const LEGACY_PATTERNS=[
  [['gems',.2],['gold',.47],['packs',.73],['cores',1]],
  [['gold',.18],['cores',.43],['gems',.7],['packs',1]],
  [['packs',.24],['gems',.52],['cores',.78],['gold',1]],
  [['cores',.16],['gold',.4],['packs',.68],['gems',1]]
];
export function stageBudget(stageIndex){const level=Math.min(15,stageIndex+2);return {gold:level*100,gems:75+5*Math.max(0,level-2),cores:5,packs:1};}
function definitions(stageIndex){
  const index=Math.max(0,Math.min(14,Math.floor(stageIndex)||0)),start=0,target=LEVEL_TARGETS[index],end=target,legacyStart=THRESHOLDS[index],legacyEnd=THRESHOLDS[index+1]||ROAD_END,legacyTarget=legacyEnd-legacyStart,loot=stageBudget(index);
  const entries=index===0?[{kind:'mystery',amount:5,legacyThreshold:60},{kind:'mystery',amount:7,legacyThreshold:120},{kind:'cache',amount:1,legacyThreshold:legacyEnd,loot}]:LEGACY_PATTERNS[(index-1)%LEGACY_PATTERNS.length].map(([kind,position])=>({kind,amount:loot[kind],legacyThreshold:Math.round(legacyStart+legacyTarget*position)}));
  return {index,start,end,target,rewards:entries.map((r,i)=>{
    // Keep the visual spacing exact, even when a stage spans an odd trophy count.
    const position=(15+75*i/(entries.length-1))/100,localThreshold=Math.ceil(target*position);
    return {...r,id:'road-'+index+'-'+i,stageIndex:index,position,localThreshold,threshold:start+localThreshold};
  })};
}
function legacyClaimed(save,reward){return Number.isFinite(save.roadLegacyBest)&&reward.legacyThreshold<=save.roadLegacyBest;}
function stageTrophies(save,index){
  const active=currentLevel(save)-1,target=LEVEL_TARGETS[index];
  return index<active?target:index>active?0:Math.max(0,Math.min(target,Number(save.arenaProgress?.trophies)||0));
}
function isEligible(save,reward){return stageTrophies(save,reward.stageIndex)>=reward.localThreshold||save.roadReady?.includes(reward.id);}
function receiptFor(save,reward){return save.roadClaims?.[reward.id];}
function isClaimed(save,reward){return !!receiptFor(save,reward)||legacyClaimed(save,reward);}
export function stageRoad(save,stageIndex){
  const stage=definitions(stageIndex),current=stageTrophies(save,stage.index);
  return {...stage,current,remaining:stage.target-current,progress:current/stage.target,rewards:stage.rewards.map(reward=>{
    const receipt=receiptFor(save,reward),claimed=isClaimed(save,reward);
    return {...reward,claimed,ready:!!isEligible(save,reward)&&!claimed,...(receipt?.card?{card:{...receipt.card}}:{})};
  })};
}
function blankReceipt(){return {gold:0,gems:0,cores:0,packs:0,cards:[],rewards:[],levels:[]};}
function randomIndex(rng,length){return Math.max(0,Math.min(length-1,Math.floor((Number(rng())||0)*length)));}
function finishStage(save,index,total){
  const stage=definitions(index),level=index+2;
  if(level>15||stageTrophies(save,index)<stage.target||save.rewardedLevels.includes(level)||!stage.rewards.every(r=>isClaimed(save,r)))return;
  save.rewardedLevels.push(level);total.levels.push(level);
}
function applyReward(save,reward,rng){
  if(!isEligible(save,reward)||isClaimed(save,reward))return null;
  const receipt={id:reward.id,kind:reward.kind,threshold:reward.threshold,amount:reward.amount};
  const total=blankReceipt();
  if(reward.kind==='mystery'){
    // Choose only at claim time. The second mystery always differs from the first.
    const previous=new Set(Object.values(save.roadClaims||{}).map(r=>r?.card?.id).filter(Boolean));
    const pool=WEAPONS.filter(w=>w.unlock<=reward.stageIndex+1&&!previous.has(w.id));
    const eligible=pool.length?pool:WEAPONS.filter(w=>w.unlock<=reward.stageIndex+1);
    const weapon=eligible[randomIndex(rng,eligible.length)],card=save.cards[weapon.id];
    receipt.card={id:weapon.id,amount:reward.amount,isNew:!card.owned};
    card.owned=true;card.copies+=reward.amount;total.cards.push({...receipt.card});
  }else{
    const loot=reward.kind==='cache'?reward.loot:{[reward.kind]:reward.amount};
    receipt.loot={...loot};
    for(const key of WALLET){const amount=loot[key]||0;save[key]+=amount;total[key]+=amount;}
  }
  save.roadClaims??={};save.roadClaims[reward.id]=receipt;
  total.rewards.push({...receipt});finishStage(save,reward.stageIndex,total);
  return total;
}
function merge(total,receipt){if(!receipt)return;for(const key of WALLET)total[key]+=receipt[key];for(const key of ['cards','rewards','levels'])total[key].push(...receipt[key]);}
export function claimRoad(save,id,rng=Math.random){
  if(typeof id!=='string'||!/^road-(?:[0-9]|1[0-4])-[0-3]$/.test(id))return null;
  const index=Number(id.split('-')[1]),reward=definitions(index).rewards.find(r=>r.id===id);
  return reward?applyReward(save,reward,rng):null;
}
// Explicit legacy/batch claim helper only. Match completion must not call this.
// The player-facing road uses claimRoad(save, markerId), one clicked marker at a time.
export function settleRoad(save,rng=Math.random,stageIndex=null){
  const total=blankReceipt();
  const indices=stageIndex===null?LEVEL_TARGETS.map((_,i)=>i):[stageIndex];
  for(const index of indices){const stage=definitions(index);for(const reward of stage.rewards)merge(total,applyReward(save,reward,rng));finishStage(save,index,total);}
  return total;
}

// Old unclaimed markers retain priority after a level change or a reload.
// Reading this queue never grants currency; each receipt still requires a click.
export function readyRoadRewards(save){
 return Array.from({length:15},(_,index)=>stageRoad(save,index).rewards.filter(reward=>reward.ready)).flat();
}
