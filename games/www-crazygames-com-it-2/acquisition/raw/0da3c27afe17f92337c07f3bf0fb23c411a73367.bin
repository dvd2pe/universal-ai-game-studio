// Client-side calendar rewards: one durable receipt per UTC day, bounded storage.
// Call on a cloned save and commit that save before exposing the granted balance.
export const DAY_MS=86400000;
export const DAILY_REWARDS=Object.freeze([
  {gold:150},{gems:30},{cores:4},{gold:300},{packs:1},{gems:60},{gold:500,cores:5,packs:1}
].map((loot,index)=>Object.freeze({day:index+1,loot:Object.freeze(loot)})));
const object=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
const validDay=value=>Number.isSafeInteger(value)&&value>=0&&value<=100000000;
const count=value=>Number.isSafeInteger(value)&&value>=0?Math.min(value,1e9):0;
export function newDailyProgress(){return {version:1,totalClaims:0,lastClaimDay:null,lastReceipt:null};}
export function normalizeDailyProgress(raw){
  const progress=newDailyProgress();
  if(!object(raw))return progress;
  progress.totalClaims=count(raw.totalClaims);
  progress.lastClaimDay=validDay(raw.lastClaimDay)?raw.lastClaimDay:null;
  const receipt=raw.lastReceipt;
  if(object(receipt)&&validDay(receipt.dayKey)&&Number.isInteger(receipt.rewardDay)&&receipt.rewardDay>=1&&receipt.rewardDay<=7&&Number.isSafeInteger(receipt.cycle)&&receipt.cycle>=1&&receipt.cycle<=Math.ceil(1e9/7)){
    const total=(receipt.cycle-1)*7+receipt.rewardDay;
    // The receipt is the authority if one of the summary fields was damaged.
    progress.totalClaims=Math.max(progress.totalClaims,total);
    progress.lastClaimDay=Math.max(progress.lastClaimDay??0,receipt.dayKey);
    progress.lastReceipt={dayKey:receipt.dayKey,rewardDay:receipt.rewardDay,cycle:receipt.cycle,claimedAt:Number.isFinite(receipt.claimedAt)?receipt.claimedAt:receipt.dayKey*DAY_MS,loot:{...DAILY_REWARDS[receipt.rewardDay-1].loot}};
  }
  // Retain a known claim date even if other optional daily metadata is missing.
  if(progress.lastClaimDay!==null&&progress.totalClaims===0)progress.totalClaims=1;
  return progress;
}
export function dailyStatus(save,now=Date.now()){
  const progress=normalizeDailyProgress(save?.daily),dayKey=Math.floor(now/DAY_MS),validClock=Number.isFinite(now)&&validDay(dayKey);
  const clockBehind=validClock&&progress.lastClaimDay!==null&&dayKey<progress.lastClaimDay;
  const ready=validClock&&(progress.lastClaimDay===null||dayKey>progress.lastClaimDay);
  const completed=progress.totalClaims%7;
  // Keep all seven cards collected until the next day's new cycle becomes available.
  const claimed=completed===0&&progress.totalClaims>0&&!ready?7:completed;
  const rewardDay=completed+1,cycle=Math.floor(progress.totalClaims/7)+1;
  return {ready,clockBehind,validClock,dayKey,rewardDay,cycle,claimed,
    remaining:validClock&&!ready?Math.max(0,((progress.lastClaimDay??dayKey)+1)*DAY_MS-now):0,
    lastReceipt:progress.lastReceipt,
    rewards:DAILY_REWARDS.map(reward=>({...reward,claimed:reward.day<=claimed,ready:ready&&reward.day===rewardDay}))};
}
export function claimDaily(save,now=Date.now()){
  const status=dailyStatus(save,now);
  if(!status.ready)return null;
  const progress=normalizeDailyProgress(save.daily),loot={...DAILY_REWARDS[status.rewardDay-1].loot};
  const receipt={dayKey:status.dayKey,rewardDay:status.rewardDay,cycle:status.cycle,claimedAt:now,loot};
  for(const [key,amount] of Object.entries(loot))save[key]+=amount;
  save.daily={version:1,totalClaims:progress.totalClaims+1,lastClaimDay:status.dayKey,lastReceipt:receipt};
  return receipt;
}
