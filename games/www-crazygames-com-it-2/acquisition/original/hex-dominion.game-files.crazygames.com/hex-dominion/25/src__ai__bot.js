import {TACTICS} from './src__weapons__tactics.js';
import {WEAPONS,STARTER,CATALOG,stats} from './src__weapons__catalog.js';
import {unlockedAvatars} from './src__progression__avatars.js';
import {rivalName} from './src__ai__social.js';
import {currentLevel} from './src__progression__progress.js';
export function rngFrom(seed){return ()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
export const BOT_PROFILES={
 // Introductory rivals use readable plans at the same decision pace as regular rivals.
 training:{id:'training',delay:12,jitter:.5,opening:12,script:'training'},
 beginner:{id:'beginner',delay:1.8,jitter:0,script:'beginner'},
 intermediate:{id:'intermediate',delay:1.8,jitter:0,script:'intermediate'},
 // Weak rivals take every turn and push forward, with slower reactions and less precise choices.
 novice:{id:'novice',delay:6,jitter:2,noise:6,samples:28,tactical:.28},
 relaxed:{id:'relaxed',delay:1.8,jitter:1.4,noise:6,samples:25,tactical:.25},
 regular:{id:'regular',delay:1.8,jitter:1.6,noise:4,samples:12,tactical:.55},
 matched:{id:'matched',delay:.8,jitter:1,noise:2,samples:7,tactical:1},
 skilled:{id:'skilled',delay:.75,jitter:.85,noise:1.2,samples:4,tactical:1.3},
 challenger:{id:'challenger',delay:.65,jitter:.8,noise:1.2,samples:4,tactical:1.35}
};
// Geometry is fixed for every arena. Reuse it without retaining old battles.
const placementFootprints=new Map();
function footprints(grid,size){
 if(!placementFootprints.has(size))placementFootprints.set(size,grid.cells.map(h=>grid.footprint(h.id,size)));
 return placementFootprints.get(size);
}
export function opponentProfile(save,roll){
 // Three easy wins, then two medium wins complete the 150-trophy first stage.
 // Later stages keep the 10% weak / 70% regular / 20% skilled mix.
 if(currentLevel(save)===1)return (Number(save.arenaProgress?.trophies)||0)<90?'beginner':'intermediate';
 return roll<.1?'novice':roll<.8?'regular':'skilled';
}
export function opponent(save,rng=Math.random){
 const pool=Array.from({length:18},()=>Math.max(0,save.trophies+Math.round((rng()-.5)*100)));
 pool.sort((a,b)=>Math.abs(a-save.trophies)-Math.abs(b-save.trophies));
 const trophies=pool[0],arenaLevel=currentLevel(save),level=arenaLevel,roll=rng();
 const profile=opponentProfile(save,roll);
 const available=WEAPONS.filter(w=>w.unlock<=level);
 const playerDeck=save.deck.filter(id=>CATALOG[id]&&CATALOG[id].unlock<=level);
 let deck=profile==='matched'&&playerDeck.length===5?[...playerDeck]:[...STARTER];
 if(level>1&&profile!=='matched'&&profile!=='novice'){
  const choices=available.filter(w=>!deck.includes(w.id));
  const take=profile==='challenger'?2:profile==='skilled'?2:1;
  for(let n=0;n<take&&choices.length;n++){
   // Advanced cards are earned-stage cards; challengers get variety, not free energy.
   const i=profile==='challenger'?choices.reduce((best,w,index)=>w.unlock>choices[best].unlock?index:best,0):Math.floor(rng()*choices.length);
   deck[4-n]=choices.splice(i,1)[0].id;
  }
 }
 const average=Math.round(save.deck.reduce((sum,id)=>sum+(save.cards[id]?.level||1),0)/5);
 const levels=Object.fromEntries(deck.map((id,index)=>[id,['beginner','intermediate'].includes(profile)?1:Math.max(1,Math.min(30,average+(arenaLevel>1&&profile==='challenger'&&index<2?1:arenaLevel>1&&['novice','relaxed'].includes(profile)?-1:0)))]));
 const avatars=unlockedAvatars({arenaProgress:{level,trophies:0},best:trophies,cards:Object.fromEntries(deck.map(id=>[id,{owned:true}]))});
 return {name:rivalName(rng),avatar:avatars[Math.floor(rng()*avatars.length)],trophies,deck,levels,profile,arenaLevel,challenge:profile==='challenger'};
}
// The guide demonstrates the same starter weapons through an easier scripted plan.
export function tutorialOpponent(save,rng=Math.random){
 const rival=opponent(save,rng);
 return {...rival,deck:[...STARTER],levels:Object.fromEntries(STARTER.map(id=>[id,1])),profile:'training',arenaLevel:1,challenge:false};
}
// These rivals commit to a readable weapon/placement plan instead of counter-picking.
// The first available card in each step is saved for normally; energy, hand rerolls,
// flak quotas and placement legality are still owned by Battle.deploy.
// Heavy weapons are lessons in the plan, not an escalating swarm or siege wall.
// All other deployments continue for the entire match; no overall army cap applies.
const INTRO_PLANS={
 training:{mortars:1,hiveTurn:10,cards:['horn','flak','sweeper','horn','hive','horn','mortar','horn'],columns:[20,22,19,21],rows:[2,1,2,3]},
 beginner:{mortars:2,hiveTurn:8,cards:['horn','sweeper','flak','mortar','hive','horn'],columns:[17,21,19,23],rows:[3,2,4,2]},
 intermediate:{mortars:3,hiveTurn:6,cards:['sweeper','horn','mortar','flak','hive','horn'],columns:[6,18,9,15],rows:[5,4,6,3]}
};
function scriptedStep(b,owner,name){
 const side=b.sides[owner],plan=INTRO_PLANS[name],turn=side.scriptTurn||0;
 const occupied=new Uint8Array(b.grid.cells.length);
 for(const e of b.entities)if(e.hp>0)for(const id of e.footprint||[])occupied[id]=1;
 const choices=side.queue.slice(0,3).map((id,index)=>{
  const w=stats(id,side.levels[id]||1),geometry=footprints(b.grid,w.size);
  const positions=b.grid.cells.filter(h=>h.owner===owner&&geometry[h.id].length===w.size&&geometry[h.id].every(n=>b.grid.cells[n].owner===owner&&!b.grid.cells[n].protect&&!occupied[n]));
  // Follow the next steps when the requested card is not offered. Avoid repeating
  // the last deployment when a different legal card is available in this hand.
  let priority=plan.cards.length;
  for(let n=0;n<plan.cards.length;n++)if(plan.cards[(turn+n)%plan.cards.length]===id){priority=n;break;}
  if(id===side.scriptLast)priority+=plan.cards.length;
  return {id,index,w,positions,priority};
 }).filter(o=>o.positions.length&&(o.id!=='hive'||(!side.scriptHiveUsed&&turn>=plan.hiveTurn))&&(o.id!=='mortar'||(side.scriptMortars||0)<plan.mortars)).sort((a,c)=>a.priority-c.priority||a.index-c.index);
 const choice=choices[0];if(!choice||side.energy+1e-6<b.cost(owner,choice.id))return;
 // A predictable side lane leaves an opening; medium rivals spread over two lanes.
 // They do not chase player weapons or advance to every newly captured front row.
 const col=plan.columns[turn%plan.columns.length],depth=plan.rows[turn%plan.rows.length];
 const row=owner===2?depth:39-depth;
 choice.positions.sort((a,c)=>(Math.abs(a.row-row)*3+Math.abs(a.col-col))-(Math.abs(c.row-row)*3+Math.abs(c.col-col))||a.id-c.id);
 if(b.deploy(owner,choice.index,choice.positions[0].id)){side.scriptTurn=turn+1;side.scriptLast=choice.id;if(choice.id==='hive')side.scriptHiveUsed=true;if(choice.id==='mortar')side.scriptMortars=(side.scriptMortars||0)+1;}
}
export function botStep(b,owner=2){
 const side=b.sides[owner];if(!side||(!b.firstPlayer&&b.elapsed<5)||b.elapsed<side.nextThink)return;
 const profile=BOT_PROFILES[side.profile]||BOT_PROFILES.matched;
 if(b.elapsed<(profile.opening||0))return;
 side.nextThink=b.elapsed+profile.delay+b.rng()*profile.jitter;
 if(profile.script){scriptedStep(b,owner,profile.script);return;}
 if(profile.skip&&b.rng()<profile.skip)return;
 // Decide the rare hive allowance once per battle, never once per thinking turn.
 if(profile.hiveChance&&side.beginnerHiveAllowed===undefined)side.beginnerHiveAllowed=b.rng()<profile.hiveChance;
 const strategic=profile.id==='skilled'||profile.id==='challenger';
 const enemies=b.entities.filter(e=>e.owner!==owner&&e.hp>0),flyers=enemies.filter(e=>e.flying).length,hunters=enemies.filter(e=>e.mobile).length;
 const allies=b.entities.filter(e=>e.owner===owner&&e.hp>0),flak=allies.filter(e=>e.kind==='flak');
 if(profile.maxWeapons&&allies.filter(e=>!e.parent).length>=profile.maxWeapons)return;
 const occupied=new Uint8Array(b.grid.cells.length);
 for(const e of b.entities)if(e.hp>0)for(const id of e.footprint||[])occupied[id]=1;
 const positionsBySize=new Map();
 const legalPositions=w=>{
  if(!positionsBySize.has(w.size)){
   const geometry=footprints(b.grid,w.size),cells=b.grid.cells;
   positionsBySize.set(w.size,cells.filter(h=>h.owner===owner&&geometry[h.id].length===w.size&&geometry[h.id].every(id=>cells[id].owner===owner&&!cells[id].protect&&!occupied[id])));
  }
  return positionsBySize.get(w.size);
 };
 const options=side.queue.slice(0,3).map((id,index)=>{
  const w=stats(id,side.levels[id]||1);let score=w.tags.includes('territory')?3:enemies.length?2:0;
  if(flyers&&w.tags.includes('anti-air'))score+=5;
  if(hunters&&['tesla','huntress'].includes(w.kind))score+=5;
  if(enemies.length>2&&w.kind==='hive')score+=4;
  score+=Math.min(4,enemies.filter(e=>TACTICS[w.id].strong.includes(e.id)).length*1.4);
  score-=Math.min(3,enemies.filter(e=>TACTICS[w.id].weak.includes(e.id)).length*.8);
  if(w.kind==='flak'&&!flyers&&flak.length)score-=4;
  return {w,index,cost:b.cost(owner,id),priority:score*profile.tactical,score:score*profile.tactical+b.rng()*profile.noise};
 }).sort((a,c)=>c.score-a.score);
 const allowed=o=>!profile.allowedIds||profile.allowedIds.includes(o.w.id)||(o.w.id==='hive'&&side.beginnerHiveAllowed&&!side.beginnerHiveUsed&&b.elapsed>=profile.hiveAfter);
 const affordable=options.filter(o=>o.cost<=side.energy&&allowed(o));
 if(strategic&&b.limit-b.elapsed>4){
  const playable=affordable.find(o=>legalPositions(o.w).length);
  // At most two energy (four seconds of normal regeneration), and only for a
  // clearly better card in the visible hand that can actually fit on our land.
  const saving=options.find(o=>o.cost>side.energy&&o.cost-side.energy<=2&&o.priority>(playable?.priority??0)+3&&legalPositions(o.w).length);
  if(saving)return;
 }
 for(const o of affordable){
  let positions=legalPositions(o.w);
  if(!positions.length)continue;
  const targets=strategic?enemies.filter(e=>o.w.kind==='flak'?e.flying&&!flak.some(f=>Math.hypot(f.x-e.x,f.y-e.y)<f.range-10):o.w.kind==='tesla'?e.mobile&&!e.flying:o.w.kind==='huntress'?e.mobile:false):[];
  positions=positions.map(h=>{
   const danger=enemies.some(e=>!e.flying&&Math.hypot(e.x-h.x,e.y-h.y)<42)?10:0;
   const protectedByFlak=flak.some(e=>Math.hypot(e.x-h.x,e.y-h.y)<e.range-15)?(flyers?9:2):0;
   const coverage=o.w.kind==='flak'?Math.min(12,allies.filter(e=>!e.mobile&&Math.hypot(e.x-h.x,e.y-h.y)<o.w.range-15).length*4):0;
   const overlap=o.w.kind==='flak'&&flak.some(e=>Math.hypot(e.x-h.x,e.y-h.y)<45)?9:0;
   // Skilled rivals react to threats within the counter's actual range;
   // backline raids can outweigh the usual preference for the front row.
   const interception=Math.min(30,targets.reduce((sum,e)=>sum+Math.max(0,1-Math.hypot(e.x-h.x,e.y-h.y)/o.w.range)*20,0));
   const crowding=strategic&&o.w.protect?Math.min(8,allies.filter(e=>!e.mobile&&Math.hypot(e.x-h.x,e.y-h.y)<48).length*4):0;
   const advance=(owner===2?h.row:39-h.row)*(profile.backline?-1:1);
   return {h,score:(advance-danger+protectedByFlak+coverage-overlap+interception-crowding)*profile.tactical+b.rng()*profile.noise*3};
  }).sort((a,c)=>c.score-a.score);
  const pick=positions[Math.floor(b.rng()*Math.min(profile.samples,positions.length))].h;
  if(b.deploy(owner,o.index,pick.id)){if(profile.hiveChance&&o.w.id==='hive')side.beginnerHiveUsed=true;return;}
 }
}








