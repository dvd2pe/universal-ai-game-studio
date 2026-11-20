import {settleRoad,stageBudget} from './src__economy__road.js';
import {CATALOG} from './src__weapons__catalog.js';import {currentLevel} from './src__progression__progress.js';
export function weaponOffer(save,id){const w=CATALOG[id];if(!w||save.cards[id]?.owned||w.unlock>currentLevel(save))return null;const gems=Math.min(400,150+20*Math.max(0,w.unlock-2)),adGems=Math.ceil(gems*2/3/5)*5;return {gems,adGems,ads:Math.min(1,save.weaponAds?.[id]||0),requiredAds:1};}
export function unlockWeapon(save,id,route='gems'){const o=weaponOffer(save,id);if(!o||!['gems','ads'].includes(route))return false;const cost=route==='ads'?o.adGems:o.gems;if(route==='ads'&&o.ads<o.requiredAds||save.gems<cost)return false;save.gems-=cost;save.cards[id].owned=true;save.cards[id].copies+=3;return true;}
export function creditWeaponAd(save,id){const o=weaponOffer(save,id);if(!o||o.ads>=o.requiredAds)return false;save.weaponAds??={};save.weaponAds[id]=o.ads+1;return true;}
export function levelReward(level){return stageBudget(Math.max(0,Math.min(14,level-2)));}
export function claimLevel(save,level,rng=Math.random){
  if(!Number.isInteger(level)||level<2||level>15||currentLevel(save)<level||save.rewardedLevels.includes(level))return null;
  const reward=settleRoad(save,rng,level-2);
  return reward.rewards.length||reward.levels.length?reward:null;
}
// Compatibility for an explicit legacy level claim; never invoked by match completion.
export function settleLevels(save,rng=Math.random){return settleRoad(save,rng);}
