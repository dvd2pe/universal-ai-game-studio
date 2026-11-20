// Deployment upgrades change the energy needed to place a weapon, never its fire rate.
// These functions are storage-free: callers mutate a cloned save and publish it only
// after persistence succeeds. A temporary pass is consumed at actual battle start.
export const DEPLOYMENT_DISCOUNT=1;
export const DEPLOYMENT_PRICES=Object.freeze({temporary:1000,permanent:15000});
export const newDeploymentProgress=()=>({permanent:false,temporary:0});

export function normalizeDeploymentProgress(raw){
  if(!raw||typeof raw!=='object'||Array.isArray(raw))return newDeploymentProgress();
  const permanent=raw.permanent===true;
  return {permanent,temporary:!permanent&&raw.temporary===1?1:0};
}

export function deploymentStatus(save){
  const state=normalizeDeploymentProgress(save?.deployment);
  return {...state,discount:state.permanent||state.temporary?DEPLOYMENT_DISCOUNT:0};
}

export function deploymentOffers(save){
  const state=deploymentStatus(save),gold=Number.isFinite(save?.gold)?save.gold:0;
  return ['temporary','permanent'].map(id=>{
    const price=DEPLOYMENT_PRICES[id],affordable=gold>=price;
    // Use an armed pass before upgrading so a paid pass is never silently discarded.
    const reason=state.permanent?'owned':state.temporary?'armed':!affordable?'funds':null;
    return {id,price,discount:DEPLOYMENT_DISCOUNT,duration:id==='temporary'?1:null,affordable,available:reason===null,reason};
  });
}

export function purchaseDeployment(save,id){
  const offer=deploymentOffers(save).find(item=>item.id===id);
  if(!offer?.available)return null;
  save.gold-=offer.price;
  save.deployment=id==='permanent'?{permanent:true,temporary:0}:{permanent:false,temporary:1};
  return {id,price:offer.price,discount:DEPLOYMENT_DISCOUNT};
}

export function consumeDeployment(save){
  const state=deploymentStatus(save);
  if(state.permanent)return {discount:DEPLOYMENT_DISCOUNT,source:'permanent',consumed:false};
  if(state.temporary){
    save.deployment={permanent:false,temporary:0};
    return {discount:DEPLOYMENT_DISCOUNT,source:'temporary',consumed:true};
  }
  return {discount:0,source:'none',consumed:false};
}

export function effectiveDeploymentCost(baseCost,discount=0){
  const amount=Number.isFinite(discount)?Math.max(0,Math.min(2,Math.floor(discount))):0;
  return Math.max(1,baseCost-amount);
}