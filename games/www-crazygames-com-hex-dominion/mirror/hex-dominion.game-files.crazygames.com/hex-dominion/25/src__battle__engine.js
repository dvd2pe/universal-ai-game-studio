import {Grid,WIDTH,HEIGHT,area} from './src__territory__grid.js';
import {CATALOG,stats} from './src__weapons__catalog.js';
import {damageModifier} from './src__weapons__tactics.js';
import {botStep,rngFrom} from './src__ai__bot.js';
import {effectiveDeploymentCost} from './src__economy__deployment.js';
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
// Stable compaction avoids allocating new large arrays every animation tick.
function compact(list,keep){let live=0;for(let i=0;i<list.length;i++)if(keep(list[i]))list[live++]=list[i];list.length=live;}
export function arenaSetup(level,rng){
 if(level<=1)return {level:1,blue:200,red:200,neutral:600,cannons:0,variant:'classic'};
 const roll=rng(),[blue,red]=roll<.45?[200,200]:roll<.6?[250,250]:roll<.8?[300,200]:[200,300];
 const hazard=rng(),cannons=hazard<.55?0:hazard<.83?1:2;
 return {level,blue,red,neutral:1000-blue-red,cannons,variant:blue===red?(blue===200?'classic':'balanced-front'):'uneven-front'};
}
export class Battle{
 constructor(deck,levels,enemy,seed=Date.now(),options={}){
 this.deploymentDiscounts=Object.freeze({1:options.deploymentDiscounts?.[1]??0,2:options.deploymentDiscounts?.[2]??0});this.rng=rngFrom(seed);this.arena=arenaSetup(options.level??enemy.arenaLevel??1,this.rng);this.grid=new Grid(this.arena);this.sides={1:{deck:Object.freeze([...deck]),queue:[...deck],levels,energy:5,nextThink:0,revealed:[],profile:'matched'},2:{deck:Object.freeze([...enemy.deck]),queue:[...enemy.deck],levels:enemy.levels,energy:5,nextThink:0,revealed:[],profile:enemy.profile||'matched'}};this.entities=[];this.projectiles=[];this.shotPool=[];this.effects=[];this.mines=[];this.elapsed=0;this.phase='normal';this.limit=180;this.timeExtensions=0;this.winner=0;this.reason='';this.firstPlayer=false;this.uid=0;this.events=[];this.paused=false;this.captures=[0,0,0];for(const side of Object.values(this.sides))this.prepareHand(side);this.addNeutralCannons();
 }
 addNeutralCannons(){
 const count=this.arena.cannons;
 for(let i=0;i<count;i++){
  const h=this.grid.at(count===1?WIDTH/2:WIDTH*(i?.7:.3),count===1?HEIGHT/2:HEIGHT*(i?.55:.45));
  if(!h||!this.grid.canPlace(h.id,7,0,this.entities))continue;
  const e=this.spawn({...stats('sweeper'),id:'neutral-cannon',kind:'neutral',size:7,hp:70,interval:1.8,damage:7,range:180,protect:true},0,h.x,h.y);
  e.footprint=this.grid.footprint(h.id,7);e.nextTarget=this.rng()<.5?1:2;e.cooldown=1.4+i*.6;e.angle=e.nextTarget===1?Math.PI/2:-Math.PI/2;
  for(const id of e.footprint)this.grid.cells[id].protect=e.uid;
 }
 }
 prepareHand(side){
 side.flakDrawLimit=side.deck.includes('flak')?Math.floor(this.rng()*4):0;side.flakDraws=0;
 const slot=side.queue.slice(0,3).indexOf('flak');
 if(slot>=0&&side.flakDrawLimit===0){const reserve=side.queue.findIndex((id,i)=>i>=3&&id!=='flak');[side.queue[slot],side.queue[reserve]]=[side.queue[reserve],side.queue[slot]];}
 if(side.queue.slice(0,3).includes('flak'))side.flakDraws++;
 }
 rerollHand(side){
 const previous=side.queue.slice(0,3),eligible=side.deck.filter(id=>id!=='flak'||side.flakDraws<side.flakDrawLimit),hands=[];
 // Exhausted flak stays in the battle deck, but no longer enters the playable hand.
 for(const a of eligible)for(const b of eligible)for(const c of eligible){
  if(a===b||a===c||b===c)continue;const hand=[a,b,c];
  if(hand.every((id,i)=>id!==previous[i])&&hand.some(id=>!previous.includes(id)))hands.push(hand);
 }
 const hand=hands[Math.floor(this.rng()*hands.length)];
 const reserve=side.deck.filter(id=>!hand.includes(id));if(this.rng()<.5)reserve.reverse();
 side.queue=[...hand,...reserve];
 if(hand.includes('flak'))side.flakDraws++;
 }

 cost(owner,id){const weapon=Object.hasOwn(CATALOG,id)?CATALOG[id]:null;return this.sides[owner]&&weapon?effectiveDeploymentCost(weapon.cost,this.deploymentDiscounts[owner]):Infinity;}
 deploy(owner,index,id){
 if(this.winner||this.paused||!this.sides[owner]||!Number.isInteger(index)||index<0||index>2)return false;const side=this.sides[owner],key=side.queue[index],d=stats(key,side.levels[key]||1),cost=this.cost(owner,key);
 if(side.energy+1e-6<cost||!this.grid.cells[id]||!this.grid.canPlace(id,d.size,owner,this.entities))return false;
 side.energy=Math.max(0,side.energy-cost);this.rerollHand(side);if(!side.revealed.includes(key))side.revealed.push(key);if(owner===1)this.firstPlayer=true;
 const h=this.grid.cells[id];const e=this.spawn(d,owner,h.x,h.y);e.footprint=this.grid.footprint(id,d.size);if(d.protect)for(const n of e.footprint)this.grid.cells[n].protect=e.uid;
 if(d.kind==='ninjas'){e.x=WIDTH*(.2+.6*this.rng());e.y=owner===1?48:HEIGHT-48;const e2=this.spawn(d,owner,e.x+12,e.y+8);e.footprint=[];e2.footprint=[];}
 this.events.push({type:'deploy',owner,id:key});this.fx('deploy',h.x,h.y,owner,1);return true;
 }
 spawn(d,owner,x,y){const e={...d,uid:++this.uid,owner,x,y,maxHP:d.hp,cooldown:d.kind==='hive'?.1:d.kind==='laser'?d.interval:d.kind==='storm'?.9*d.interval/CATALOG.storm.interval:Math.min(.9,d.interval),age:0,angle:owner===1?-Math.PI/2:Math.PI/2,footprint:[],mobile:['ninjas','hunter','alien','sapper','tnt','ball','tank','bee'].includes(d.kind),flying:['bee','alien'].includes(d.kind),durability:40};this.entities.push(e);return e;}
 fx(type,x,y,owner,life=.4,extra={}){this.effects.push({type,x,y,owner,life,max:life,...extra});}
 capture(id,owner){if(this.grid.capture(id,owner)){this.captures[owner]++;return true;}return false;}
 blast(x,y,owner,radius=1,damage=0){const h=this.grid.at(x,y);if(h)for(const id of area(h.id,radius))this.capture(id,owner);if(damage)for(const e of this.entities)if(e.owner!==owner&&!e.flying&&dist(e,{x,y})<(radius+1)*16)e.hp-=damage*damageModifier('blast',e);this.fx('blast',x,y,owner,.55,{radius:(radius+1)*14});this.events.push({type:'blast'});}
 nearest(e,predicate=()=>true){let best=null,d=Infinity;for(const t of this.entities)if(t.owner!==e.owner&&t.hp>0&&predicate(t)){const dd=dist(e,t);if(dd<d){d=dd;best=t;}}return best;}
 landTarget(e,random=false){let best=null,d=Infinity,front=null,frontD=Infinity;const directional=['laser','spray','horn','mortar','ballista','flame','tank','grenadier'].includes(e.kind),dir=e.owner===1?-1:1;for(const h of this.grid.cells)if(h.owner!==e.owner&&!h.protect){const dd=dist(e,h)*(random?.5+this.rng():1);if(dd<d){d=dd;best=h;}if((h.y-e.y)*dir>=Math.abs(h.x-e.x)&&dd<frontD){frontD=dd;front=h;}}return directional?(front||best):best;}
 shot(e,angle,kind='normal',count=1){const p=this.shotPool.pop()||{};Object.assign(p,{x:e.x,y:e.y,vx:Math.cos(angle)*110,vy:Math.sin(angle)*110,owner:e.owner,kind,damage:e.damage??9*(1+((e.level||1)-1)*.025),remaining:count,last:-1,bounceCell:-1,age:0,dead:false});this.projectiles.push(p);}
 moveToward(e,t,speed,dt){const d=dist(e,t);if(d>.01){e.angle=Math.atan2(t.y-e.y,t.x-e.x);const step=Math.min(d,speed*dt);e.x+=Math.cos(e.angle)*step;e.y+=Math.sin(e.angle)*step;}e.x=Math.max(6,Math.min(WIDTH-6,e.x));e.y=Math.max(6,Math.min(HEIGHT-6,e.y));}
 updateEntity(e,dt){
 e.age+=dt;e.cooldown-=dt;if((e.stunUntil||0)>this.elapsed)return;const k=e.kind;
 if(k==='neutral'){
 if(e.cooldown<=0){
  const targetOwner=e.nextTarget;e.nextTarget=targetOwner===1?2:1;
  const units=this.entities.filter(t=>t.owner===targetOwner&&t.hp>0&&!t.flying).sort((a,b)=>dist(e,a)-dist(e,b));
  const land=this.grid.cells.filter(h=>h.owner===targetOwner).sort((a,b)=>dist(e,a)-dist(e,b));
  const target=units.length&&dist(e,units[0])<e.range?units[0]:land[Math.floor(this.rng()*Math.min(8,land.length))];
  if(target){e.angle=Math.atan2(target.y-e.y,target.x-e.x);this.shot(e,e.angle);this.fx('muzzle',e.x,e.y,0,.18);}
  e.cooldown=e.interval;
 }
 }
 else if(k==='hive'){const max=3+(e.level>=10?1:0)+(e.level>=20?1:0);e.beeSlots??=Array.from({length:max},(_,i)=>({uid:0,readyAt:.15+i*.18}));for(const slot of e.beeSlots){if(slot.uid&&!this.entities.some(v=>v.uid===slot.uid&&v.hp>0)){slot.uid=0;slot.readyAt=e.age+e.interval;}if(!slot.uid&&e.age>=slot.readyAt){const bee=this.spawn({id:'hive',sprite:0,kind:'bee',hp:14,interval:.8,level:e.level,size:1,parent:e.uid,protect:false},e.owner,e.x+(this.rng()-.5)*15,e.y);slot.uid=bee.uid;}}}
 else if(['bee','ninjas','hunter','alien'].includes(k)){
 const target=this.nearest(e,t=>k==='bee'||k==='alien'||!t.flying);
 if(target){const reach=k==='alien'?38:10;if(dist(e,target)>reach)this.moveToward(e,target,k==='bee'?32:k==='hunter'?17:23,dt);else if(e.cooldown<=0){target.hp-=(k==='bee'?10:k==='hunter'?15:k==='ninjas'?9:10)*damageModifier(k,target);if(k==='bee')e.hp=0;e.cooldown=e.interval;this.fx('hit',target.x,target.y,e.owner,.2,{fromX:e.x,fromY:e.y});}}
 else if(k==='bee'){e.x+=Math.sin(e.age*3+e.uid)*dt*4;e.y+=Math.cos(e.age*3+e.uid)*dt*4;}
 }
 else if(k==='flak'){
 const target=this.nearest(e,t=>t.flying&&dist(e,t)<=e.range);
 if(target){const aim=Math.atan2(target.y-e.y,target.x-e.x),difference=Math.atan2(Math.sin(aim-e.angle),Math.cos(aim-e.angle));e.angle+=Math.sign(difference)*Math.min(Math.abs(difference),2.2*dt);
 if(e.cooldown<=0&&Math.abs(difference)<.32){target.hp-=16;this.fx('hit',target.x,target.y,e.owner,.25,{fromX:e.x,fromY:e.y});e.cooldown=e.interval;}}
 }
 else if(['huntress','tesla'].includes(k)){
 if(e.cooldown<=0){let targets=this.entities.filter(t=>t.owner!==e.owner&&t.hp>0&&dist(e,t)<=e.range&&(k==='flak'?t.flying:k==='tesla'?t.mobile&&!t.flying:t.mobile||t.kind==='bee')).sort((a,b)=>dist(e,a)-dist(e,b));
 if(targets.length){e.angle=Math.atan2(targets[0].y-e.y,targets[0].x-e.x);for(const t of targets.slice(0,k==='tesla'?3:1)){t.hp-=(k==='flak'?16:k==='tesla'?17:12)*damageModifier(k,t);if(k==='tesla')t.stunUntil=this.elapsed+.3;this.fx('hit',t.x,t.y,e.owner,.25,{fromX:e.x,fromY:e.y,lightning:k==='tesla'});}e.cooldown=e.interval;}}
 }
 else if(k==='deflector'){if(e.cooldown<=0){const p=this.projectiles.find(p=>p.owner!==e.owner&&p.kind==='normal'&&dist(e,p)<e.range&&!p.dead);if(p){p.owner=e.owner;p.vx*=-1;p.vy*=-1;e.cooldown=e.interval;this.fx('deploy',p.x,p.y,e.owner,.4);}}}
 else if(k==='storm'){if(e.cooldown<=0){const t=this.landTarget(e);if(t)this.blast(t.x,t.y,e.owner);e.hp=0;}}
 else if(k==='sapper'){const t=this.landTarget(e);if(t&&dist(e,t)>15)this.moveToward(e,t,12,dt);if(e.cooldown<=0){if(this.mines.filter(m=>m.parent===e.uid).length<5)this.mines.push({x:e.x,y:e.y,owner:e.owner,parent:e.uid});e.cooldown=e.interval;}}
 else if(k==='tnt'){const t=this.landTarget(e);if(t){if(dist(e,t)<10){this.blast(t.x,t.y,e.owner,2);e.hp=0;}else{this.moveToward(e,{x:t.x+Math.sin(e.age*2)*13,y:t.y},24,dt);}}}
 else if(k==='ball'){e.x+=Math.cos(e.angle)*28*dt;e.y+=Math.sin(e.angle)*28*dt;if(e.x<6||e.x>WIDTH-6)e.angle=Math.PI-e.angle;if(e.y<6||e.y>HEIGHT-6)e.angle=-e.angle;const enemy=this.nearest(e,t=>!t.flying);if(enemy&&dist(e,enemy)<11){enemy.hp-=e.durability;e.hp=0;}else{const h=this.grid.at(e.x,e.y);if(h&&this.capture(h.id,e.owner)){e.durability--;if(e.durability<=0)e.hp=0;}else if(h?.protect&&h.owner!==e.owner)e.angle+=1.8;}}
 else{
 if(k==='tank'){const t=this.landTarget(e);if(t&&dist(e,t)>24)this.moveToward(e,t,9,dt);}
 if(e.cooldown>0)return;e.cooldown=e.interval;const foe=this.nearest(e,t=>!t.flying);let target=foe&&(foe.y-e.y)*(e.owner===1?-1:1)>=Math.abs(foe.x-e.x)*.7&&dist(e,foe)<(k==='mortar'||k==='grenadier'?190:130)?foe:this.landTarget(e,['mortar','grenadier'].includes(k));if(!target)return;const aim=Math.atan2(target.y-e.y,target.x-e.x);e.angle=aim;
 if(k==='laser'){let x=e.x,y=e.y,seen=new Set(),hitUnits=new Set();for(let i=0;i<300;i++){x+=Math.cos(aim)*4;y+=Math.sin(aim)*4;if(x<0||y<0||x>WIDTH||y>HEIGHT)break;const h=this.grid.at(x,y);if(h&&!seen.has(h.id)){seen.add(h.id);this.capture(h.id,e.owner);}for(const unit of this.entities)if(unit.owner!==e.owner&&!unit.flying&&unit.hp>0&&!hitUnits.has(unit.uid)&&dist(unit,{x,y})<(unit.size===19?23:unit.size===7?17:11)){hitUnits.add(unit.uid);unit.hp-=30*(1+(e.level-1)*.025);this.fx('damage',unit.x,unit.y,e.owner,.65,{amount:Math.round(30*(1+(e.level-1)*.025))});}}this.fx('beam',e.x,e.y,e.owner,.7,{toX:x,toY:y});this.events.push({type:'laser'});}
 else if(k==='mortar'||k==='grenadier'){this.fx('shell',e.x,e.y,e.owner,.85,{toX:target.x,toY:target.y,impact:true,damage:(k==='grenadier'?22:16)*(1+(e.level-1)*.025)});}
 else if(k==='horn'){const n=e.level>=20?9:e.level>=10?7:5;for(let i=0;i<n;i++)this.shot(e,aim-Math.PI/4+i*(Math.PI/2)/(n-1));}
 else if(k==='ballista'){for(let i=0;i<4;i++)this.shot(e,aim-.45+i*.3,'arrow',4);}
 else if(k==='flame'){for(let i=0;i<6;i++)this.shot(e,aim-.45+i*.18,'ember');}
 else{const sweep=k==='spray'?Math.sin(e.age*.9)*Math.PI/3:Math.sin(e.age)*.15;e.angle=(k==='spray'?(e.owner===1?-Math.PI/2:Math.PI/2):aim)+sweep;this.shot(e,e.angle);}
 }
 }
 hitUnit(p,e){const damage=p.kind==='arrow'?e.maxHP*.25:(p.damage||9)*damageModifier('normal',e);e.hp-=damage;p.dead=true;this.fx('hit',p.x,p.y,p.owner,.18);this.fx('damage',e.x,e.y,p.owner,.7,{amount:Math.round(damage)});}
 updateShots(dt){
 for(const p of this.projectiles){if(p.dead)continue;p.age+=dt;const steps=Math.max(1,Math.ceil(Math.hypot(p.vx,p.vy)*dt/4));for(let i=0;i<steps&&!p.dead;i++){
 p.x+=p.vx*dt/steps;p.y+=p.vy*dt/steps;
 if(p.x<3){p.x=3;p.vx=Math.abs(p.vx);}if(p.x>WIDTH-3){p.x=WIDTH-3;p.vx=-Math.abs(p.vx);}if(p.y<3){p.y=3;p.vy=Math.abs(p.vy);}if(p.y>HEIGHT-3){p.y=HEIGHT-3;p.vy=-Math.abs(p.vy);}
 const mine=this.mines.findIndex(m=>m.owner!==p.owner&&dist(m,p)<6);if(mine>=0){const m=this.mines.splice(mine,1)[0];this.blast(m.x,m.y,m.owner);p.dead=true;continue;}
 const target=this.entities.find(e=>e.owner!==p.owner&&e.hp>0&&!e.flying&&dist(e,p)<(e.size===19?23:e.size===7?17:e.size===3?12:8));if(target){this.hitUnit(p,target);continue;}
 const h=this.grid.at(p.x,p.y);if(!h)continue;
 if(h.protect&&h.owner!==p.owner){const defender=this.entities.find(e=>e.uid===h.protect&&e.hp>0&&!e.flying);if(defender){this.hitUnit(p,defender);continue;}if(p.bounceCell!==h.id){const nx=p.x-h.x,ny=p.y-h.y,len=Math.hypot(nx,ny)||1,dot=(p.vx*nx+p.vy*ny)/len;p.vx-=2*dot*nx/len;p.vy-=2*dot*ny/len;p.bounceCell=h.id;p.x+=p.vx*.035;p.y+=p.vy*.035;}continue;}p.bounceCell=-1;
 if(h.id!==p.last&&this.capture(h.id,p.owner)){p.remaining--;p.last=h.id;if(p.remaining<=0)p.dead=true;}
 // Embers lose propulsion after their short attack range, but remain alive as normal capture rounds.
 if(p.kind==='ember'&&p.age>0.7){p.kind='normal';p.vx*=.65;p.vy*=.65;}
 }}
 let live=0;for(const p of this.projectiles){if(p.dead){if(this.shotPool.length<256)this.shotPool.push(p);}else this.projectiles[live++]=p;}this.projectiles.length=live;
 }
 canExtendTime(){return !this.paused&&!this.winner&&this.phase!=='sudden'&&this.timeExtensions===0;}
 extendTime(){if(!this.canExtendTime())return false;this.limit+=15;this.timeExtensions++;return true;}
 canAddEnergy(owner,amount=1){return !this.paused&&!this.winner&&!!this.sides[owner]&&Number.isFinite(amount)&&amount>0&&Number.isFinite(this.sides[owner].energy)&&this.sides[owner].energy>=0&&this.sides[owner].energy+amount<=10;}
 addEnergy(owner,amount=1){if(!this.canAddEnergy(owner,amount))return false;this.sides[owner].energy+=amount;return true;}
 chargeEnergy(dt){if(this.paused||this.winner||!Number.isFinite(dt)||dt<=0)return;for(const side of Object.values(this.sides))side.energy=Math.min(10,side.energy+dt*.5);}
 step(dt){
 if(this.paused||this.winner)return;this.elapsed+=dt;this.chargeEnergy(dt);
 botStep(this,2);const initialCount=this.entities.length;for(let i=0;i<initialCount;i++){const e=this.entities[i];if(e.hp>0)this.updateEntity(e,dt);}
 for(const e of this.entities)if(e.mobile&&!e.flying){const cell=this.grid.at(e.x,e.y),id=cell?.id??-1;if(e.footprintCell!==id){e.footprintCell=id;e.footprint=cell?this.grid.footprint(id,e.size):[];}}else if(e.flying&&e.footprint.length)e.footprint=[];
 this.updateShots(dt);
 for(const e of this.entities)if(e.hp<=0){for(const id of e.footprint)if(this.grid.cells[id].protect===e.uid)this.grid.cells[id].protect=0;this.fx('blast',e.x,e.y,e.owner,.4,{radius:16});this.events.push({type:'destroy',owner:e.owner,kind:e.kind});}compact(this.entities,e=>e.hp>0);
 for(const f of this.effects){f.life-=dt;if(f.life<=0&&f.impact){f.impact=false;this.blast(f.toX,f.toY,f.owner,1,f.damage);}}compact(this.effects,f=>f.life>0);
 if(this.grid.counts[1]>=990)this.finish(1,'domination');else if(this.grid.counts[2]>=990)this.finish(2,'domination');
 else if(this.elapsed>=this.limit){const a=this.grid.counts[1],b=this.grid.counts[2];if(a!==b)this.finish(a>b?1:2,this.phase==='normal'?'time':this.phase);else if(this.phase==='normal'){this.phase='overtime';this.limit+=30;this.events.push({type:'overtime'});}else{this.phase='sudden';this.limit=this.elapsed;}}
 }
 finish(owner,reason){if(this.winner)return;this.winner=owner;this.reason=reason;if(reason==='surrender'){this.projectiles=[];this.effects=[];}}
 surrender(){this.finish(2,'surrender');}
}
