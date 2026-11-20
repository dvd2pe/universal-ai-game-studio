import {upgradeCost,boostFraction} from './src__progression__progress.js';
export function upgradeState(save,id){
 const card=save.cards?.[id],cost=upgradeCost(card?.level||1),max=!!card&&card.level>=30;
 const copiesReady=!!card?.owned&&!max&&card.copies>=cost.copies;
 const boostReady=!!card?.owned&&!max&&boostFraction(card)>=1;
 const goldMissing=Math.max(0,cost.gold-(Number(save.gold)||0));
 return {cost,max,copiesMissing:Math.max(0,cost.copies-(card?.copies||0)),copiesReady,boostReady,ready:(copiesReady||boostReady)&&goldMissing===0,goldMissing};
}
