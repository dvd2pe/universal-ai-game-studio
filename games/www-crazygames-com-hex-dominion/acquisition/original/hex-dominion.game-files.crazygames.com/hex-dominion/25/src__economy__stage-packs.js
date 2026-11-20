import {WEAPONS,CATALOG} from './src__weapons__catalog.js';
import {currentLevel} from './src__progression__progress.js';
import {openPack} from './src__economy__economy.js';

export const STAGE_PACK_SLOTS=5;
export const GUARANTEED_PACK_LEVELS=Object.freeze([2,3,5,7,9,11,12]);
const object=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
const validIndex=index=>Number.isInteger(index)&&index>=0&&index<15;
const validSlot=slot=>Number.isInteger(slot)&&slot>=0&&slot<STAGE_PACK_SLOTS;
const idFor=(index,slot)=>'stage-pack-'+index+'-'+slot;
const count=value=>Number.isFinite(value)&&value>=0?Math.min(1e9,Math.floor(value)):0;
const copy=value=>JSON.parse(JSON.stringify(value));
const tierFor=slot=>slot===STAGE_PACK_SLOTS-1?2:0;
export function newStagePackProgress(){return {version:2,earnedByStage:Array(15).fill(0),claims:{}};}

export function normalizeStagePackProgress(raw,unlockedLevel=1,legacyCycle=0,arenaTrophies=0){
 const progress=newStagePackProgress();
 if(object(raw?.claims))for(const [id,receipt] of Object.entries(raw.claims)){
  const match=/^stage-pack-(\d+)-([0-4])$/.exec(id);if(!match||!object(receipt)||receipt.id!==id)continue;
  const index=Number(match[1]),slot=Number(match[2]);
  if(!validIndex(index)||id!==idFor(index,slot)||receipt.stageIndex!==index||receipt.slot!==slot)continue;
  // A valid claim identity remains consumed even if optional display metadata is damaged.
  const normalized={id,stageIndex:index,slot,tier:tierFor(slot),gold:count(receipt.gold),cards:[]};
  if(receipt.legacy===true)normalized.legacy=true;
  if(Array.isArray(receipt.cards))for(const card of receipt.cards.slice(0,20)){
   if(!object(card)||!Object.hasOwn(CATALOG,card.id)||CATALOG[card.id].unlock>index+1||!Number.isSafeInteger(card.amount)||card.amount<=0)continue;
   normalized.cards.push({id:card.id,amount:count(card.amount),isNew:card.isNew===true});
  }
  const guaranteed=receipt.guaranteedCard;
  if(object(guaranteed)&&Object.hasOwn(CATALOG,guaranteed.id)&&CATALOG[guaranteed.id].unlock<=index+1&&Number.isSafeInteger(guaranteed.amount)&&guaranteed.amount>0){
   normalized.guaranteedCard={id:guaranteed.id,amount:count(guaranteed.amount),isNew:guaranteed.isNew===true};
  }
  progress.claims[id]=normalized;
 }
 if(!object(raw)||![1,2].includes(raw.version)){
  // Legacy releases kept one cumulative counter, not per-stage receipts. Allocate
  // those already-opened packs once to the earliest unlocked tracks. Never grant
  // old rewards again, subtract unopened inventory, or pre-consume future stages.
  const unlocked=Math.max(1,Math.min(15,Math.floor(Number(unlockedLevel))||1));
  const consumed=Math.min(count(legacyCycle),unlocked*STAGE_PACK_SLOTS);
  for(let n=0;n<consumed;n++){
   const index=Math.floor(n/STAGE_PACK_SLOTS),slot=n%STAGE_PACK_SLOTS,id=idFor(index,slot);
   progress.claims[id]??={id,stageIndex:index,slot,tier:tierFor(slot),gold:0,cards:[],legacy:true};
  }
 }
 const unlocked=Math.max(1,Math.min(15,Math.floor(Number(unlockedLevel))||1));
 for(let index=0;index<15;index++){
  const stored=raw?.version===2&&Array.isArray(raw.earnedByStage)?raw.earnedByStage[index]:0;
  const known=raw?.version===2&&Array.isArray(raw.earnedByStage)&&Number.isSafeInteger(stored)&&stored>=0;
  const recorded=known?Math.min(STAGE_PACK_SLOTS,stored):0;
  // Arena trophies never decrease on losses. Infer old wins only during migration
  // or counter repair; a valid v2 counter is authoritative for the fought stage.
  const inferred=known?0:index<unlocked-1?STAGE_PACK_SLOTS:index===unlocked-1?Math.min(STAGE_PACK_SLOTS,Math.floor(count(arenaTrophies)/30)):0;
  let consumed=0;
  for(let slot=0;slot<STAGE_PACK_SLOTS;slot++)if(progress.claims[idFor(index,slot)])consumed=slot+1;
  progress.earnedByStage[index]=Math.max(recorded,inferred,consumed);
 }
 return progress;
}
function progressFor(save){return normalizeStagePackProgress(save.stagePacks,currentLevel(save),save.packCycle,save.arenaProgress?.trophies);}
export function creditStagePackWin(save,index){
 const award={stageIndex:index,earned:false};
 if(!validIndex(index)||index>=currentLevel(save))return award;
 const progress=progressFor(save),earned=progress.earnedByStage[index];
 if(earned<STAGE_PACK_SLOTS){progress.earnedByStage[index]=earned+1;award.earned=true;award.slot=earned;}
 save.stagePacks=progress;return award;
}
function guaranteedWeapon(save,level){
 const eligible=WEAPONS.filter(w=>w.unlock<=level);
 const unowned=eligible.filter(w=>!save.cards?.[w.id]?.owned);
 // Prefer this stage's own weapon. If it was already obtained elsewhere, grant
 // another eligible unowned weapon; a fully owned pool receives honest copies.
 const pool=unowned.length?unowned:eligible;
 return pool.find(w=>w.unlock===level)||[...pool].sort((a,b)=>b.unlock-a.unlock||a.sprite-b.sprite)[0];
}
export function stagePackTrack(save,index){
 const valid=validIndex(index),level=valid?index+1:null,unlocked=valid&&level<=currentLevel(save);
 const progress=progressFor(save);
 const earned=valid?progress.earnedByStage[index]:0;
 const slots=valid?Array.from({length:STAGE_PACK_SLOTS},(_,slot)=>{
  const id=idFor(index,slot),tier=tierFor(slot),receipt=progress.claims[id],guaranteed=slot===4&&GUARANTEED_PACK_LEVELS.includes(level);
  const weapon=guaranteed?guaranteedWeapon(save,level):null;
  return {id,stageIndex:index,slot,tier,earned:slot<earned,claimed:!!receipt,ready:false,guaranteed,receipt:receipt?copy(receipt):null,
   preview:{gold:tier===2?450:60,copies:tier===2?55:8,weapon:weapon?{id:weapon.id,amount:18,isNew:!save.cards?.[weapon.id]?.owned}:null}};
 }):[];
 const nextSlot=slots.find(slot=>!slot.claimed)?.slot??null;
 for(const slot of slots)slot.ready=unlocked&&slot.slot===nextSlot&&slot.earned&&!save.pendingPack;
 const available=slots.filter(slot=>slot.earned&&!slot.claimed).length;
 const claimed=slots.filter(slot=>slot.claimed).length;
 return {index,level,unlocked,slots,earned,claimed,nextSlot,complete:valid&&claimed===STAGE_PACK_SLOTS,available};
}
export function claimStagePack(save,index,slot,rng=Math.random){
 if(!validIndex(index)||!validSlot(slot)||save.pendingPack)return null;
 const track=stagePackTrack(save,index),item=track.slots[slot];
 if(!item?.ready||!Number.isFinite(save.gold)||save.gold<0||!Number.isFinite(save.pity)||save.pity<0)return null;
 const eligible=WEAPONS.filter(w=>w.unlock<=track.level);
 if(eligible.some(w=>!object(save.cards?.[w.id])||!Number.isFinite(save.cards[w.id].copies)||save.cards[w.id].copies<0))return null;
 const progress=progressFor(save);
 const result=openPack(save,item.tier,rng,{level:track.level,guaranteedId:item.preview.weapon?.id});
 const pending={...result,tier:item.tier,stageIndex:index,slot};
 const receipt={...copy(pending),id:item.id};
 // Stage wins are their own entitlement; general gifts and their pack cycle stay intact.
 progress.claims[item.id]=receipt;save.stagePacks=progress;
 // The caller commits its cloned save once: wallet, claim receipt and reveal.
 save.pendingPack=pending;
 return pending;
}



