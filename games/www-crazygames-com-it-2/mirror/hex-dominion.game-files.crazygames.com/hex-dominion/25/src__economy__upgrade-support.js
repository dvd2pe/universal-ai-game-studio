import {upgradeCost,boostFraction} from './src__progression__progress.js';
export const UPGRADE_GOLD_CAP=1000;
export const UPGRADE_GOLD_COOLDOWN=10*60*1000;
export function upgradeSupport(save,id,now=Date.now()){
 const card=save.cards[id],cost=upgradeCost(card?.level||1),eligible=!!card?.owned&&card.level<30;
 const copiesMissing=eligible?Math.max(0,cost.copies-card.copies):0;
 const goldMissing=eligible?Math.max(0,cost.gold-save.gold):0;
 const last=save.claims.upgradeGold;
 const remaining=Number.isFinite(last)&&last<=now?Math.max(0,Math.min(UPGRADE_GOLD_COOLDOWN,last+UPGRADE_GOLD_COOLDOWN-now)):0;
 const boostReady=eligible&&boostFraction(card)>=1;
 return {cost,copiesMissing,boostReady,goldMissing,amount:Math.min(UPGRADE_GOLD_CAP,goldMissing),remaining,available:eligible&&(copiesMissing===0||boostReady)&&goldMissing>0&&remaining===0};
}
export function claimUpgradeGold(save,id,{adCompleted=false,now=Date.now()}={}){
 if(adCompleted!==true||!Number.isFinite(now)||now<0)return null;
 const offer=upgradeSupport(save,id,now);if(!offer.available)return null;
 save.gold+=offer.amount;save.claims.upgradeGold=now;
 return {gold:offer.amount,missing:offer.goldMissing-offer.amount};
}
