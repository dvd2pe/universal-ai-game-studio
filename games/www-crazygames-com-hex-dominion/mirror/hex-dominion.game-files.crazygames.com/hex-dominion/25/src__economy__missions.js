// Daily battle goals are separate from the seven-day login reward.
// Storage-free: mutate a cloned save, persist it, then expose the new wallet.
import {DAY_MS} from './src__economy__daily.js';
export const MISSION_MIN_SECONDS=60;
export const DAILY_MISSIONS=Object.freeze([
  {id:'first-battle',metric:'battles',target:1,loot:{gold:100}},
  {id:'deploy-eight',metric:'deployments',target:8,loot:{gold:150}},
  {id:'three-battles',metric:'battles',target:3,loot:{cores:2,packs:1}}
].map(goal=>Object.freeze({...goal,loot:Object.freeze(goal.loot)})));
const object=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
const validDay=value=>Number.isSafeInteger(value)&&value>=0&&value<=100000000;
const count=(value,max)=>Number.isSafeInteger(value)&&value>=0?Math.min(value,max):0;
const validId=value=>typeof value==='string'&&value.length>0&&value.length<=120;
const goalById=id=>DAILY_MISSIONS.find(goal=>goal.id===id);
export function newMissionProgress(){return {version:1,dayKey:null,battles:0,deployments:0,claimed:[],battleIds:[],claimReceipts:[]};}
export function normalizeMissionProgress(raw){
  const progress=newMissionProgress();
  if(!object(raw))return progress;
  progress.dayKey=validDay(raw.dayKey)?raw.dayKey:null;
  const receipts=Array.isArray(raw.claimReceipts)?raw.claimReceipts.filter(r=>object(r)&&validDay(r.dayKey)&&goalById(r.missionId)):[];
  for(const receipt of receipts)progress.dayKey=Math.max(progress.dayKey??0,receipt.dayKey);
  if(progress.dayKey===null)return progress;
  // Counters and claims belong to one date. A durable receipt prevents re-claiming
  // even if its optional summary fields are absent after an interrupted migration.
  if(raw.dayKey===progress.dayKey){
    progress.battles=count(raw.battles,3);
    progress.deployments=count(raw.deployments,8);
    progress.claimed=Array.isArray(raw.claimed)?[...new Set(raw.claimed.filter(id=>!!goalById(id)))]:[];
    progress.battleIds=Array.isArray(raw.battleIds)?[...new Set(raw.battleIds.filter(validId))].slice(-32):[];
  }
  for(const rawReceipt of receipts){
    if(rawReceipt.dayKey!==progress.dayKey||progress.claimReceipts.some(r=>r.missionId===rawReceipt.missionId))continue;
    const goal=goalById(rawReceipt.missionId);
    const multiplier=rawReceipt.multiplier===2?2:1;
    const normalizedReceipt={dayKey:progress.dayKey,missionId:goal.id,claimedAt:Number.isFinite(rawReceipt.claimedAt)?rawReceipt.claimedAt:progress.dayKey*DAY_MS,loot:Object.fromEntries(Object.entries(goal.loot).map(([key,amount])=>[key,amount*multiplier]))};
    if(multiplier===2)normalizedReceipt.multiplier=2;
    progress.claimReceipts.push(normalizedReceipt);
    if(!progress.claimed.includes(goal.id))progress.claimed.push(goal.id);
  }
  for(const id of progress.claimed){const goal=goalById(id);progress[goal.metric]=Math.max(progress[goal.metric],goal.target);}
  return progress;
}
function forDay(progress,dayKey){return progress.dayKey===dayKey?progress:{...newMissionProgress(),dayKey};}
export function missionStatus(save,now=Date.now()){
  const stored=normalizeMissionProgress(save?.missions),dayKey=Math.floor(now/DAY_MS),validClock=Number.isFinite(now)&&validDay(dayKey);
  const clockBehind=validClock&&stored.dayKey!==null&&dayKey<stored.dayKey;
  const progress=validClock&&!clockBehind?forDay(stored,dayKey):stored;
  const goals=DAILY_MISSIONS.map(goal=>{
    const value=Math.min(goal.target,progress[goal.metric]),claimed=progress.claimed.includes(goal.id),complete=value>=goal.target;
    return {...goal,loot:{...goal.loot},progress:value,complete,claimed,ready:validClock&&!clockBehind&&complete&&!claimed};
  });
  return {dayKey,validClock,clockBehind,goals,ready:goals.filter(goal=>goal.ready).length,claimed:goals.filter(goal=>goal.claimed).length,complete:goals.filter(goal=>goal.complete).length,
    remaining:validClock?Math.max(0,((clockBehind?stored.dayKey:dayKey)+1)*DAY_MS-now):0};
}
export function recordMissionBattle(save,battle,now=Date.now()){
  const status=missionStatus(save,now);
  if(!status.validClock||status.clockBehind||!object(battle)||!validId(battle.id))return null;
  if(!Number.isFinite(battle.completedAt)||battle.completedAt>now||Math.floor(battle.completedAt/DAY_MS)!==status.dayKey)return null;
  if(!['time','overtime','sudden','domination'].includes(battle.reason)||!Number.isFinite(battle.elapsed)||battle.elapsed<=0||(battle.elapsed<MISSION_MIN_SECONDS&&battle.reason!=='domination'))return null;
  if(!Number.isSafeInteger(battle.deployments)||battle.deployments<0)return null;
  const progress=forDay(normalizeMissionProgress(save.missions),status.dayKey);
  if(progress.battleIds.includes(battle.id))return null;
  const addedBattles=progress.battles<3?1:0,addedDeployments=Math.min(8-progress.deployments,battle.deployments);
  if(!addedBattles&&!addedDeployments)return null;
  progress.battles+=addedBattles;progress.deployments+=addedDeployments;
  // At most 11 useful receipts per date: three battles and eight deployments.
  progress.battleIds.push(battle.id);progress.battleIds=progress.battleIds.slice(-32);
  save.missions=progress;
  const after=missionStatus(save,now);
  return {dayKey:status.dayKey,addedBattles,addedDeployments,completed:after.goals.filter(goal=>goal.complete&&!status.goals.find(before=>before.id===goal.id).complete).map(goal=>goal.id)};
}
function claimMissionReward(save,missionId,now,multiplier){
  const status=missionStatus(save,now),goal=status.goals.find(item=>item.id===missionId);
  if(!goal?.ready)return null;
  const progress=forDay(normalizeMissionProgress(save.missions),status.dayKey);
  const loot=Object.fromEntries(Object.entries(goal.loot).map(([key,amount])=>[key,amount*multiplier]));
  // Reject a damaged wallet rather than consuming a claim without granting it.
  if(Object.keys(loot).some(key=>!Number.isFinite(save[key])||save[key]<0))return null;
  const receipt={dayKey:status.dayKey,missionId:goal.id,claimedAt:now,loot};
  if(multiplier===2)receipt.multiplier=2;
  for(const [key,amount] of Object.entries(loot))save[key]+=amount;
  progress.claimed.push(goal.id);progress.claimReceipts.push(receipt);save.missions=progress;
  return receipt;
}
export function claimMission(save,missionId,now=Date.now()){
  return claimMissionReward(save,missionId,now,1);
}
export function claimMissionDouble(save,missionId,{adCompleted=false,now=Date.now()}={}){
  if(!adCompleted)return null;
  return claimMissionReward(save,missionId,now,2);
}