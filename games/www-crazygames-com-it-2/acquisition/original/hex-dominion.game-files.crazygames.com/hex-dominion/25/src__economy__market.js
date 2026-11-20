const DAY=86400000;
const OFFERS=[
  {id:'adGold',type:'ad',title:'Gold drop',titleAr:'دفعة ذهب',reward:{gold:200},cooldown:10*60000},
  {id:'adGems',type:'ad',title:'Gem drop',titleAr:'دفعة ماس',reward:{gems:25},cooldown:20*60000},
  {id:'adBoost5',type:'ad',title:'Post-match boosts',titleAr:'تعزيزات بعد النزال',description:'Spend boost cores only after a battle',descriptionAr:'استخدم نوى التعزيز بعد النزال فقط',reward:{cores:5},cooldown:2*3600000},
  {id:'adPack',type:'ad',title:'Scout supply',titleAr:'حزمة استطلاع',reward:{packs:1},cooldown:6*3600000},
  {id:'goldCrate',type:'exchange',title:'Gold pouch',titleAr:'كيس الذهب',reward:{gold:400},cost:{gems:40}},
  {id:'goldVault',type:'exchange',title:'Gold vault',titleAr:'خزنة الذهب',reward:{gold:1200},cost:{gems:100}},
  {id:'coreCache',type:'exchange',title:'Core cache',titleAr:'مخزون النوى',reward:{cores:10},cost:{gems:80}},
  {id:'gemTrade',type:'exchange',title:'Gem trade',titleAr:'تجارة الماس',reward:{gems:15},cost:{gold:600},dailyLimit:2},
  {id:'supplyTrade',type:'exchange',title:'Supply trade',titleAr:'تجارة الحزم',reward:{packs:1},cost:{gold:900},dailyLimit:1}
];
export function marketOffers(save,now=Date.now()){
  const day=Math.floor(now/DAY);
  return OFFERS.map(def=>{
    const record=save.marketPurchases?.[def.id],used=record?.day===day?record.count:0,stockLeft=def.dailyLimit?Math.max(0,def.dailyLimit-used):null;
    const last=save.claims?.[def.id];
    // Existing players keep only the unexpired portion of the old 30-minute
    // core-ad clock. Their first new claim starts the new two-hour clock.
    const legacy=def.id==='adBoost5'?save.claims?.adCores:null;
    const legacyWait=Number.isFinite(legacy)&&legacy<=now?Math.max(0,legacy+30*60000-now):0;
    const wait=Math.max(def.cooldown&&Number.isFinite(last)&&last<=now?Math.max(0,last+def.cooldown-now):0,legacyWait);
    const remaining=stockLeft===0?Math.max(wait,(day+1)*DAY-now):wait;
    const ready=remaining===0,affordable=Object.entries(def.cost||{}).every(([key,amount])=>(save[key]||0)>=amount);
    return {...def,reward:{...def.reward},...(def.cost?{cost:{...def.cost}}:{}),cooldown:def.cooldown||0,remaining,ready,affordable,available:ready&&affordable,stockLeft};
  });
}
export function claimMarket(save,id,{adCompleted=false,now=Date.now()}={}){
  if(!Number.isFinite(now)||now<0)return null;
  const offer=marketOffers(save,now).find(item=>item.id===id);
  if(!offer?.available||offer.type==='ad'&&adCompleted!==true)return null;
  for(const [key,amount] of Object.entries(offer.cost||{}))save[key]-=amount;
  for(const [key,amount] of Object.entries(offer.reward))save[key]+=amount;
  if(offer.cooldown){save.claims??={};save.claims[id]=now;}
  if(offer.dailyLimit){
    save.marketPurchases??={};
    const day=Math.floor(now/DAY),record=save.marketPurchases[id];
    save.marketPurchases[id]={day,count:(record?.day===day?record.count:0)+1};
  }
  return {id,type:offer.type,reward:{...offer.reward},cost:{...(offer.cost||{})}};
}



