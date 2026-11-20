import {WEAPONS} from './src__weapons__catalog.js';
import {currentLevel,addArenaTrophies,updateWeek} from './src__progression__progress.js';
import {creditStagePackWin} from './src__economy__stage-packs.js';
export const COOLDOWNS={gold:24*3600000,gems:7*3600000,cores:24*3600000,adGems:20*60000,adGold:10*60000,adCores:30*60000,adPack:6*3600000};
export function claimWelcome(save){if(save.welcomeGiftClaimed)return false;save.welcomeGiftClaimed=true;save.welcomeMessage=true;save.gold+=300;save.gems+=30;save.cores+=5;save.packs++;return true;}
export function remaining(save,key,now=Date.now()){return Math.max(0,(Number(save.claims[key])||0)+(COOLDOWNS[key]||86400000)-now);}
export function claim(save,key,now=Date.now()){if(remaining(save,key,now)>0||!['gold','gems','cores'].includes(key))return false;save.claims[key]=now;save[key]+=key==='gold'?100:key==='gems'?20:10;return true;}
export function openPack(save,tier=0,rng=Math.random,options={}){
 const level=Math.min(currentLevel(save),Math.max(1,Math.min(15,Math.floor(options.level)||currentLevel(save))));
 const eligible=WEAPONS.filter(w=>w.unlock<=level),locked=eligible.filter(w=>!save.cards[w.id].owned);
 const guaranteed=eligible.find(w=>w.id===options.guaranteedId);
 save.pity++;const result={gold:[60,160,450][tier],cards:[]};let total=[8,20,55][tier];
 for(let i=0;i<3;i++){
  let pool=eligible;const roll=rng(),rarity=roll<.4?'common':roll<.8?'rare':'epic';
  const preferred=pool.filter(w=>w.rarity===rarity);if(preferred.length)pool=preferred;
  const fixed=i===0&&guaranteed,forced=!fixed&&i===0&&locked.length&&(save.pity>=4||rng()<.3);
  const w=fixed|| (forced?locked[Math.floor(rng()*locked.length)]:pool[Math.floor(rng()*pool.length)]);
  const amount=i===2?total:Math.max(1,Math.floor(total/(3-i)));total-=amount;
  const c=save.cards[w.id],isNew=!c.owned;c.owned=true;c.copies+=amount;if(isNew)save.pity=0;
  if(fixed)result.guaranteedCard={id:w.id,amount,isNew};
  const item=result.cards.find(c=>c.id===w.id);
  if(item){item.amount+=amount;item.isNew||=isNew;}else result.cards.push({id:w.id,amount,isNew});
 }
 save.gold+=result.gold;return result;
}
export function makeResult(save,won,reason,counts,enemyTrophies,rng=Math.random,options={}){
 updateWeek(save);
 const stageIndex=Number.isInteger(options.stageIndex)?options.stageIndex:currentLevel(save)-1;
 const stagePackAward=won&&reason!=='surrender'?creditStagePackWin(save,stageIndex):{stageIndex,earned:false};
 const diff=enemyTrophies-save.trophies,delta=won?30:diff>=10?-15:diff<=-10?-25:-20;
 const applied=Math.max(0,save.trophies+delta)-save.trophies;
 save.trophies+=applied;save.best=Math.max(save.best,save.trophies);save.weekly.score+=applied;
 if(won){addArenaTrophies(save,30);save.wins++;}else save.losses++;
 const owned=WEAPONS.filter(w=>save.cards[w.id].owned);
 const card=owned[Math.floor(rng()*owned.length)].id;
 const copies=won?2+Math.floor(rng()*3):reason==='surrender'?0:1;
 const baseGold=won?100+Math.floor(rng()*51):reason==='surrender'?0:35;
 const baseGems=won?12:reason==='surrender'?0:3;
 const baseCores=won?2:reason==='surrender'?0:1;
 save.gold+=baseGold;save.gems+=baseGems;save.cores+=baseCores;save.cards[card].copies+=copies;
 const milestone={gold:0,gems:0,cores:0,packs:0,cards:[],rewards:[],levels:[]};
 // The video adds a second copy of the match gold, ten spendable boost cores,
 // and upgrade materials for each card in the player's current five-card deck.
 // Copies alone never upgrade a weapon; Arsenal still charges its gold cost.
 const offerCards=save.deck.map(id=>({id,amount:3}));
 const result={won,reason,stagePackAward,summarySeen:false,counts:[...counts],delta:applied,
  gold:baseGold,gems:baseGems,cores:baseCores,milestone,card,copies,deck:[...save.deck],boosted:[],
  offer:{gold:baseGold,cores:10,cards:offerCards,card:offerCards[0].id,copies:3,gems:0},
  offerStatus:'pending',adClaimed:false};
 save.pending=result;
 return result;
}
function validOffer(save,offer){
 if(!offer||!Number.isSafeInteger(offer.gold)||offer.gold<0||!Number.isSafeInteger(offer.cores)||offer.cores<0||!Number.isSafeInteger(offer.gems)||offer.gems<0)return null;
 const cards=Array.isArray(offer.cards)?offer.cards:[{id:offer.card,amount:offer.copies}];
 if(cards.length<1||cards.length>5)return null;
 const seen=new Set();
 for(const item of cards){
  if(!item||typeof item.id!=='string'||!save.cards?.[item.id]||!Number.isSafeInteger(item.amount)||item.amount<=0||seen.has(item.id))return null;
  seen.add(item.id);
 }
 for(const [key,amount] of [['gold',offer.gold],['gems',offer.gems],['cores',offer.cores]])if(!Number.isSafeInteger(save[key])||save[key]<0||save[key]+amount>1e9)return null;
 if(cards.some(item=>!Number.isSafeInteger(save.cards[item.id].copies)||save.cards[item.id].copies<0||save.cards[item.id].copies+item.amount>1e9))return null;
 return cards;
}
export function claimMatchAd(save,result,{adCompleted=false}={}){
 if(!adCompleted||result!==save?.pending||result.adClaimed||['claimed','declined'].includes(result.offerStatus))return false;
 const offer=result.offer,cards=validOffer(save,offer);
 if(!cards)return false;
 save.gold+=offer.gold;save.gems+=offer.gems;save.cores+=offer.cores;
 for(const item of cards)save.cards[item.id].copies+=item.amount;
 result.offerStatus='claimed';result.adClaimed=true;
 return true;
}
export function declineMatchAd(save,result){
 if(result!==save?.pending||result.adClaimed||['claimed','declined'].includes(result.offerStatus))return false;
 result.offerStatus='declined';
 return true;
}
