// Derived from the existing save counters; no new history or migration is required.
export function careerRecord(save){
 const count=v=>Number.isFinite(v)?Math.max(0,Math.floor(v)):0;
 const wins=count(save?.wins),losses=count(save?.losses),total=wins+losses;
 return {wins,losses,total,winRate:total?wins/total*100:0,lossRate:total?losses/total*100:0};
}
