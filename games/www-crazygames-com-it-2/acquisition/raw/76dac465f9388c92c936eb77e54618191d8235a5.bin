import {WEAPONS,CATALOG} from './src__weapons__catalog.js';
export const BATTLE_AD_DISCOUNT=2;
export const TIME_SECONDS=15;
export const TIME_PRICE=1500;
export const TIME_STOCK_CAP=3;
export const TIME_RESTOCK_MS=2*60*60*1000;
const whole=(v,max)=>Number.isFinite(v)?Math.max(0,Math.min(max,Math.floor(v))):0;
const validTime=v=>Number.isFinite(v)&&v>=0?v:null;
export const newBattleSupplies=()=>({tokens:1,lastTimeGoldClaim:null,lastTimeAdClaim:null,pending:null,battlesStarted:0});
export function normalizeBattleSupplies(raw){
 // Missing state is a one-time migration gift; a saved zero must remain zero.
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return newBattleSupplies();
 const pending=raw.pending?.kind==='discount'?{kind:'discount'}:raw.pending?.kind==='loan'&&Object.hasOwn(CATALOG,raw.pending.weaponId)?{kind:'loan',weaponId:raw.pending.weaponId}:null;
 // A legacy claim blocked both methods. Preserve that remaining wait when upgrading a save.
 const legacy=validTime(raw.lastTimeClaim);
 return {tokens:whole(raw.tokens,TIME_STOCK_CAP),
  lastTimeGoldClaim:Object.hasOwn(raw,'lastTimeGoldClaim')?validTime(raw.lastTimeGoldClaim):legacy,
  lastTimeAdClaim:Object.hasOwn(raw,'lastTimeAdClaim')?validTime(raw.lastTimeAdClaim):legacy,
  pending,battlesStarted:whole(raw.battlesStarted,1e9)};
}
export function battleSupplyOffer(save){
 const state=normalizeBattleSupplies(save.battleSupplies),level=save.arenaProgress?.level||1;
 const pool=WEAPONS.filter(w=>!save.deck.includes(w.id)&&w.unlock<=level+1);
 const loan=pool.length?pool[state.battlesStarted%pool.length].id:null;
 return {pending:state.pending,loan:state.battlesStarted%3===2?loan:null};
}
export function armBattleSupply(save,kind,{adCompleted=false}={}){
 if(adCompleted!==true||save.wins+save.losses<1)return null;
 const offer=battleSupplyOffer(save);if(offer.pending)return null;
 const reward=kind==='discount'?{kind}:kind==='loan'&&offer.loan?{kind,weaponId:offer.loan}:null;
 if(!reward)return null;
 save.battleSupplies={...normalizeBattleSupplies(save.battleSupplies),pending:reward};return reward;
}
export function consumeBattleSupply(save){
 const state=normalizeBattleSupplies(save.battleSupplies),pending=state.pending;
 const deck=[...save.deck],levels=Object.fromEntries(deck.map(id=>[id,save.cards[id].level]));
 let loan=null;
 if(pending?.kind==='loan'){
  // Editing the saved deck after claiming a loan must still produce six unique cards.
  loan=!deck.includes(pending.weaponId)?pending.weaponId:WEAPONS.find(w=>!deck.includes(w.id)&&w.unlock<=(save.arenaProgress?.level||1)+1)?.id;
  if(loan){deck.push(loan);levels[loan]=save.cards[loan].owned?save.cards[loan].level:Math.max(1,Math.round(save.deck.reduce((sum,id)=>sum+save.cards[id].level,0)/5));}
 }
 save.battleSupplies={...state,pending:null,battlesStarted:state.battlesStarted+1};
 return {deck,levels,loan,discount:pending?.kind==='discount'?BATTLE_AD_DISCOUNT:0};
}
export function timeSupplyOffer(save,now=Date.now()){
 const state=normalizeBattleSupplies(save.battleSupplies),full=state.tokens>=TIME_STOCK_CAP;
 const remainingFor=last=>last===null||last>now?0:Math.max(0,Math.min(TIME_RESTOCK_MS,last+TIME_RESTOCK_MS-now));
 const goldRemaining=remainingFor(state.lastTimeGoldClaim),adRemaining=remainingFor(state.lastTimeAdClaim);
 const gold={remaining:goldRemaining,available:!full&&goldRemaining===0};
 const ad={remaining:adRemaining,available:!full&&adRemaining===0};
 return {tokens:state.tokens,full,affordable:save.gold>=TIME_PRICE,gold,ad,
  available:gold.available||ad.available,remaining:Math.min(goldRemaining,adRemaining)};
}
export function acquireTimeToken(save,method,{adCompleted=false,now=Date.now()}={}){
 if(!Number.isFinite(now)||now<0||!['gold','ad'].includes(method))return null;
 const offer=timeSupplyOffer(save,now);
 if(!offer[method].available||method==='gold'&&!offer.affordable||method==='ad'&&adCompleted!==true)return null;
 if(method==='gold')save.gold-=TIME_PRICE;
 const stamp=method==='gold'?'lastTimeGoldClaim':'lastTimeAdClaim';
 save.battleSupplies={...normalizeBattleSupplies(save.battleSupplies),tokens:offer.tokens+1,[stamp]:now};
 return {tokens:1,seconds:TIME_SECONDS,method};
}
export function spendTimeToken(save){
 const state=normalizeBattleSupplies(save.battleSupplies);if(state.tokens<1)return false;
 save.battleSupplies={...state,tokens:state.tokens-1};return true;
}
