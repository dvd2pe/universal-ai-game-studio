// Stored charge is independent of the battle's 10-energy meter.
export const QUICK_CHARGE_REWARD=5;
export const QUICK_CHARGE_COOLDOWN_MS=60_000;
export const newQuickCharge=()=>({points:0,lastAdAt:null});
export function normalizeQuickCharge(raw){
 return {points:Number.isSafeInteger(raw?.points)&&raw.points>=0?raw.points:0,
  lastAdAt:Number.isFinite(raw?.lastAdAt)&&raw.lastAdAt>=0?raw.lastAdAt:null};
}
export function quickChargeOffer(save,now=Date.now()){
 const state=normalizeQuickCharge(save.quickCharge);
 const remaining=state.lastAdAt===null?0:Math.max(0,Math.min(QUICK_CHARGE_COOLDOWN_MS,state.lastAdAt+QUICK_CHARGE_COOLDOWN_MS-now));
 return {...state,remaining,available:remaining===0&&state.points<=Number.MAX_SAFE_INTEGER-QUICK_CHARGE_REWARD};
}
export function grantQuickCharge(save,{adCompleted=false,now=Date.now()}={}){
 if(!adCompleted||!Number.isFinite(now)||now<0||!quickChargeOffer(save,now).available)return false;
 const state=normalizeQuickCharge(save.quickCharge);
 save.quickCharge={points:state.points+QUICK_CHARGE_REWARD,lastAdAt:now};
 return {points:QUICK_CHARGE_REWARD};
}
export function spendQuickCharge(save){
 const state=normalizeQuickCharge(save.quickCharge);if(state.points<1)return false;
 save.quickCharge={...state,points:state.points-1};return true;
}
