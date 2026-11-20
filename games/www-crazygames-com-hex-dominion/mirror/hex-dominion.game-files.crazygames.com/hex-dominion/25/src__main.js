import {quickChargeOffer,grantQuickCharge,spendQuickCharge} from './src__economy__quick-charge.js';
import {quickChargeShop,quickChargeControl} from './src__ui__quick-charge.js';
import {battleSupplyOffer,armBattleSupply,consumeBattleSupply,timeSupplyOffer,acquireTimeToken,spendTimeToken} from './src__economy__battle-supplies.js';
import {upgradeSupport,claimUpgradeGold} from './src__economy__upgrade-support.js';
import {battleBoostPanel,timeShopPanel,upgradeHelpPanel,adStatusNote,timeIcon,rewardedAdIcon} from './src__ui__supplies.js';
import {WEAPONS,CATALOG,STARTER,stats} from './src__weapons__catalog.js';
import {TACTICS,FEATURED} from './src__weapons__tactics.js';
import {weaponOffer,unlockWeapon,creditWeaponAd,levelReward,claimLevel} from './src__economy__unlocks.js';
import {stageRoad,claimRoad,readyRoadRewards} from './src__economy__road.js';
import {missionStatus,recordMissionBattle,claimMission,claimMissionDouble} from './src__economy__missions.js';
import {renderMissions} from './src__ui__missions.js';
import {dailyStatus,claimDaily,DAILY_REWARDS} from './src__economy__daily.js';
import {dailyPanel} from './src__ui__daily.js';
import {deploymentStatus,purchaseDeployment,consumeDeployment} from './src__economy__deployment.js';
import {deploymentPanel} from './src__ui__deployment.js';
import {createBoot} from './src__ui__boot.js';
import {marketOffers,claimMarket} from './src__economy__market.js';
import {Battle} from './src__battle__engine.js';
import {opponent,tutorialOpponent,rngFrom} from './src__ai__bot.js';
import {WIDTH,HEIGHT} from './src__territory__grid.js';
import {normalizeSave,currentLevel,upgradeCost,upgradeCard,boostCard,boostFraction,updateWeek} from './src__progression__progress.js';
import {remaining,claim,openPack,makeResult,claimMatchAd,declineMatchAd,claimWelcome} from './src__economy__economy.js';
import {Platform} from './src__platform__platform.js';
import {applyDeviceLayout} from './src__platform__device.js';
import {bounded,decodeImage,loadRequiredImage} from './src__platform__loading.js';
import {GameAudio} from './src__platform__audio.js';
import {RewardedAdSession} from './src__platform__ad-session.js';
import {createMatchResultTransition} from './src__platform__match-break.js';
import {canAffordHandCard} from './src__ui__placement.js';
import {pinScreenActions} from './src__ui__viewport.js';
import {scrollToSection,containGameScroll} from './src__ui__scroll.js';
import {Renderer} from './src__ui__renderer.js';
import {translator} from './src__ui__i18n.js';
import {AVATARS,unlockedAvatars,activeAvatar,chooseAvatar} from './src__progression__avatars.js';
import {applyPlayerIdentity,portalPictureUrl} from './src__progression__identity.js';
import {STAGES} from './src__ui__stages.js';
import {EMOTES,RivalEmotes,rivalName} from './src__ai__social.js';
import {createMatchSearch,MATCH_SEARCH_MS} from './src__ui__matchmaking.js';
import {stagePackTrack,claimStagePack} from './src__economy__stage-packs.js';
import {upgradeState} from './src__ui__upgrades.js';
import {replaceDeckWeapon} from './src__progression__deck.js';
import {measureCollectionCapacity} from './src__ui__collection-layout.js';
import {bindDeckDrag} from './src__ui__deck-drag.js';
import {playVictoryHarvest} from './src__ui__victory.js';
import {careerRecord} from './src__progression__record.js';
import {renderRivalPicker} from './src__ui__rival-picker.js';

const app=document.querySelector('#app'),modalRoot=document.querySelector('#modal-root'),toastEl=document.querySelector('#toast');
const boot=createBoot(app);
applyDeviceLayout();
const platform=new Platform(),sound=new GameAudio();
const weaponAtlas=loadRequiredImage(['assets__weapons-v1.10.15.webp','assets__weapons.png?v=1.10.15']);
const adSession=new RewardedAdSession({platform,sound,page:document,roots:[app,modalRoot]});
const island=new Image();island.src='assets__arenas.png';
const rewardsAtlas=new Image();rewardsAtlas.src='assets__ui-icons.png';
const portraitAtlas=new Image();portraitAtlas.src='assets__avatars.png';const packAtlas=new Image();packAtlas.src='assets__packs.png';
const loadingAtlases=[island,rewardsAtlas,portraitAtlas,packAtlas];let decodedAtlases=0;
// Start platform, atlas and font work together; decorative resources can arrive later.
const [atlas]=await Promise.all([
 weaponAtlas,
 Promise.allSettled([
 platform.init().then(()=>{applyDeviceLayout(platform.sdk);platform.watchAudioSettings(muted=>sound.mutePlatform(muted));boot.progress(.2);}),
 Promise.allSettled(loadingAtlases.map(image=>decodeImage(image).finally(()=>boot.progress(.2+.65*(++decodedAtlases/loadingAtlases.length))))),
 bounded(()=>document.fonts?.ready,3000,'Fonts')
 ])
]);
document.documentElement.style.setProperty('--weapon-atlas','url("'+atlas.src+'")');
boot.progress(.92);
let portalUser=await platform.getUser();
const loadedProgress=platform.load();
let identityNeedsSave=false;
function playerSave(raw){const normalized=normalizeSave(raw);identityNeedsSave=applyPlayerIdentity(normalized,portalUser)||identityNeedsSave;return normalized;}
let save=playerSave(loadedProgress),t=translator(save.settings.lang),screen=save.pending&&!save.pending.summarySeen?'outcome':save.pending?.offerStatus==='pending'?'offer':'battle',modal='',filter='all',collectionPage=0,collectionPageSize=6,battle=null,renderer=null,selected=-1,hoverId=912,enemy=null,lastFrame=0,accumulator=0,hudStamp='',toastTimer,matchToken=0,swapId=null,modalReturn=null;
let stageIndex=null,stageMoving=false,social=null,resultEmote=null,detailId='hive',detailOrigin='cards',detailTab='stats',detailSwap=false,outcomeTimer,stageRewardKey=null,packReturn='battle',packPhase='sealed',renderedScreen=null;
let quickChargeBusy=false;
let combatDeckOwner=0,endingBattle=false,startingBattle=null,rewardFlowBusy=false;
let guidedBattle=false,playerDeployments=0,activeBattleId=null,runtimeFault=false,recovering=false;
let boardGesture=null,victoryEffect=null,deckDragController=null,deckDragSuppressUntil=0;
const viewScroll={};
let roadChaptersOpen=null;
const matchSearch=createMatchSearch();
let matchPreview=null,matchReady=false,matchCandidates=[];
sound.music=save.settings.music;sound.sound=save.settings.sound;sound.musicVolume=save.settings.musicVolume;
// Automatic entry must not attempt audible autoplay. Unlock on the first real interaction.
const unlockAudio=e=>{if(!e.isTrusted)return;sound.unlock();document.removeEventListener("click",unlockAudio,true);document.removeEventListener("keydown",unlockAudio,true);};
document.addEventListener("click",unlockAudio,true);document.addEventListener("keydown",unlockAudio,true);
window.addEventListener('hex:boot-ready',()=>platform.event('loadingStop'),{once:true});
await boot.ready(null,{lang:save.settings.lang,reduced:save.settings.reduced,saveBlocked:platform.saveBlocked});

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const label=w=>save.settings.lang==='ar'?w.ar:w.name;
const tr=(en,ar)=>save.settings.lang==='ar'?ar:en;
const numberFormats={en:new Intl.NumberFormat('en'),ar:new Intl.NumberFormat('ar')};
const fmt=n=>numberFormats[save.settings.lang==='ar'?'ar':'en'].format(Math.floor(n));
const sym={gold:'●',gems:'◆',cores:'ϟ',trophy:'🏆',energy:'ϟ'};
function uiArt(n,extra=''){return '<i aria-hidden="true" class="reward-art ui-art '+extra+'" style="background-image:url(assets__ui-icons.png);background-size:500% 200%;background-position:'+((n%5)/4*100)+'% '+(Math.floor(n/5)*100)+'%"></i>';}
function rewardArt(n,extra=''){return n<3?'<i aria-hidden="true" class="reward-art pack-art '+extra+'" style="background-image:url(assets__packs.png);background-size:300% 100%;background-position:'+(n/2*100)+'% 0%"></i>':uiArt({3:5,4:6,5:7,6:3,7:4,8:2}[n],extra);}
function avatarArt(n){return '<span aria-hidden="true" class="avatar-portrait" style="--px:'+((n%4)/3*100)+'%;--py:'+(Math.floor(n/4)/2*100)+'%"></span>';}
function portalAvatarArt(){
 const src=portalPictureUrl(portalUser),n=activeAvatar(save);
 if(!src)return avatarArt(n);
 return '<span aria-hidden="true" class="avatar-portrait portal-avatar" style="--px:'+((n%4)/3*100)+'%;--py:'+(Math.floor(n/4)/2*100)+'%"><img class="portal-picture" src="'+esc(src)+'" alt="" draggable="false" style="display:block;width:100%;height:100%;object-fit:cover;border-radius:inherit"></span>';
}
function playerAvatarArt(){return save.identity.avatarSource==='crazygames'&&portalPictureUrl(portalUser)?portalAvatarArt():avatarArt(activeAvatar(save));}
function coin(type){const n={gold:3,gems:4,cores:5,trophy:6}[type];return n===undefined?'<i aria-hidden="true" class="coin '+type+'">'+sym[type]+'</i>':rewardArt(n,'coin '+type);}
function persist(){if(platform.saveBlocked)return false;const saved=platform.save(save);if(!saved){syncSaveNotice();toast(t('saveError'));}return saved;}
function syncSaveNotice(){let notice=document.querySelector('#save-notice');document.body.classList.toggle('save-protected',!!platform.saveBlocked);if(!platform.saveBlocked){notice?.remove();return;}if(!notice){notice=document.createElement('aside');notice.id='save-notice';notice.setAttribute('role','status');document.body.append(notice);}notice.innerHTML='<span>'+(platform.saveIssue==='save-conflict'?tr('Progress changed in another tab. Reload to use the latest save.','تغيّر التقدم في تبويب آخر. أعد التحميل لاستخدام أحدث حفظ.'):tr('Practice mode: saving unavailable. Your previous progress is protected.','وضع التدريب: الحفظ غير متاح. تقدّمك السابق محفوظ دون تعديل.'))+'</span><button data-action="retrySave">'+tr('Retry','إعادة المحاولة')+'</button>';}
async function withSaveLock(action){
 if(!navigator.locks?.request)return action();
 try{return await navigator.locks.request('hex-dominion-save',action);}catch(error){if(error?.name==='SecurityError'||error?.name==='NotSupportedError')return action();throw error;}
}
function refreshProgress(){
 if(platform.saveBlocked)return false;
 if(platform.saveError&&!persist())return false;
 const latest=platform.load();if(platform.saveBlocked){syncSaveNotice();return false;}
 save=playerSave(latest||save);updateWeek(save);return true;
}
function plannedCost(id){return Math.max(1,CATALOG[id].cost-(platform.saveBlocked?0:save.battleSupplies.pending?.kind==='discount'?2:deploymentStatus(save).discount));}
function energyBadge(id,cost=plannedCost(id)){const base=CATALOG[id].cost,discounted=cost<base;return '<span class="cost '+(discounted?'is-discounted':'')+'" title="'+esc(tr('Energy: '+cost+(discounted?' (normally '+base+')':''),'الطاقة: '+cost+(discounted?' (بدلًا من '+base+')':'')))+'">'+cost+'</span>';}
function deploymentLobbyStatus(){const boost=deploymentStatus(save);if(!boost.discount||platform.saveBlocked)return '';return '<button class="deployment-lobby-status" data-action="deploymentShop">'+tr(boost.permanent?'Deployment −1 · permanent':'Deployment −1 · next battle',boost.permanent?'تكلفة النشر −1 · دائم':'تكلفة النشر −1 · المعركة التالية')+'</button>';}
function deploymentCombatStatus(){const discount=battle?.deploymentDiscounts[1]||0;return discount?'<small class="deployment-combat-status">'+tr('Deployment boost active · −'+discount+' energy','تخفيض النشر مفعّل · −'+discount+' طاقة')+'</small>':'';}

function showMissions(){modal='missions';openModal(renderMissions(save,save.settings.lang,Date.now(),{saveBlocked:platform.saveBlocked,adsEnabled:platform.adsEnabled}),'missions-modal');}
function dailyTeaser(){const d=dailyStatus(save),loot=DAILY_REWARDS[d.rewardDay-1].loot;const reward=Object.entries(loot).map(([key,n])=>n+' '+(key==='packs'?tr('pack','باكيج'):t(key))).join(' + ');return '<button class="daily-teaser" data-action="nav" data-id="rewards"><b>'+tr(d.ready?'Daily gift ready':'Next daily gift',d.ready?'جائزة اليوم جاهزة':'جائزة اليوم التالي')+'</b><span>'+esc(reward)+'</span></button>';}
function engagementLinks(){return '<div class="engagement-links">'+renderMissions(save,save.settings.lang,Date.now(),{compact:true,saveBlocked:platform.saveBlocked})+dailyTeaser()+'</div>'+boostLobbyLink();}
function nextGoal(){const road=stageRoad(save,currentLevel(save)-1),target=road.rewards.find(r=>!r.claimed);return '<p class="next-goal">'+(target?tr(target.ready?'A trophy-road reward is ready in the lobby.':Math.max(0,target.localThreshold-road.current)+' trophies to your next road reward.',target.ready?'جائزة مسار الكؤوس جاهزة في الرئيسية.':'باقي '+Math.max(0,target.localThreshold-road.current)+' كأسًا لجائزة المسار التالية.'):tr('Next goal: complete this level.','الهدف التالي: إكمال المستوى.'))+'</p>';}
function resultActions(){return '<div class="result-actions">'+btn('resultContinue',tr('Continue','متابعة'),'green')+'</div>';}
function boostLobbyLink(){return save.pending?'<button class="optional-boost" data-action="openBoost">'+tr('Boost weapons · optional','تعزيز الأسلحة · اختياري')+' <span>›</span></button>':'';}
function completeResult(again=false){
 clearTimeout(outcomeTimer);
 if(save.pending?.offerStatus==='pending'){screen='offer';render();return false;}
 if(save.pending&&!save.pending.summarySeen){
  const candidate=structuredClone(save);candidate.pending.summarySeen=true;
  if(!platform.saveBlocked&&!platform.save(candidate)){
   syncSaveNotice();toast(t('saveError'));
   const notice=document.querySelector('.outcome-timer');if(notice)notice.innerHTML=btn('resultContinue',tr('Retry saving & return','إعادة الحفظ والعودة'),'quiet');
   return false;
  }
  save=candidate;
 }
 renderer?.destroy();renderer=null;battle=null;social=null;enemy=null;screen='battle';runtimeFault=false;sound.inBattle=false;closeModal();if(again){render();prepareMatch();}else render();return true;
}
function queueOutcomeReturn(){
 clearTimeout(outcomeTimer);const pending=save.pending;
 outcomeTimer=setTimeout(()=>{
  if(screen!=='outcome'||save.pending!==pending)return;
  if(document.hidden||modal){queueOutcomeReturn();return;}
  advanceOutcome();
 },2800);
}
function playerRecordModal(){
 const record=careerRecord(save),pct=value=>new Intl.NumberFormat(save.settings.lang,{maximumFractionDigits:1}).format(value)+'%';
 modal='profile';openModal('<div class="record-heading">'+playerAvatarArt()+'<div><h2>'+esc(save.name)+'</h2><p>'+t('level')+' '+currentLevel(save)+' · '+fmt(save.trophies)+' '+tr('trophies','كأس')+'</p></div></div><div class="record-stats">'+[
  [tr('Battles played','المباريات'),fmt(record.total),'total'],[tr('Wins','الانتصارات'),fmt(record.wins),'wins'],[tr('Losses','الخسائر'),fmt(record.losses),'losses'],[tr('Win rate','نسبة الفوز'),pct(record.winRate),'wins'],[tr('Loss rate','نسبة الخسارة'),pct(record.lossRate),'losses']
 ].map(([label,value,kind])=>'<div class="record-stat '+kind+'"><small>'+label+'</small><strong>'+value+'</strong></div>').join('')+'</div><p class="record-note">'+(record.total?tr('Your saved lifetime record. Surrender counts as a loss.','سجلك المحفوظ منذ البداية. يُحتسب الانسحاب خسارة.'):tr('Complete your first battle to start your record.','أكمل أول نزال لبدء سجلك.'))+'</p>'+btn('avatars',tr('Change portrait','تغيير الصورة'),'blue wide'),'player-record-modal');
}
function handleRuntimeError(error){
 if(runtimeFault)return;runtimeFault=true;console.error('[HEX 1.10.17-preview]',error);
 if(battle&&!battle.winner)battle.paused=true;platform.event('gameplayStop');
 try{const key='hex-runtime-diagnostics',prior=JSON.parse(sessionStorage.getItem(key)||'[]');sessionStorage.setItem(key,JSON.stringify([...prior.slice(-4),{version:'1.10.17-preview',screen,at:Date.now(),message:String(error?.message||error).slice(0,240)}]));}catch{}
 modal='recovery';openModal('<h2>'+tr('Let’s get you back into the game','لنعد إلى اللعبة')+'</h2><p>'+tr('The game paused after an unexpected error. Your saved progress has not been reset.','توقفت اللعبة بعد خطأ غير متوقع. لم تتم إعادة ضبط تقدمك المحفوظ.')+'</p>'+btn('recoverBattle',tr('Try to continue','محاولة المتابعة'),'green wide')+btn('reloadGame',tr('Reload game','إعادة تحميل اللعبة'),'quiet wide'),'recovery-modal');
}

function weeklyDailyPanel(){const html=dailyPanel(save);return platform.saveBlocked?html.replace('data-action="claimDaily"','data-action="claimDaily" disabled'):html;}
function toast(message){toastEl.textContent=message;toastEl.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove('show'),2800);}
function art(id,extra=''){const w=CATALOG[id];return '<span aria-hidden="true" class="weapon-art weapon-'+id+' '+extra+'" style="--ax:'+((w.sprite%4)/3*100)+'%;--ay:'+(Math.floor(w.sprite/4)/4*100)+'%"></span>';}
function btn(action,text,cls='',attrs=''){return '<button type="button" class="btn '+cls+'" data-action="'+action+'" '+attrs+'>'+text+'</button>';}
function upgradeCallout(id){const u=upgradeState(save,id);return u.ready?'<span class="upgrade-callout" title="'+esc(t('upgrade'))+'" aria-hidden="true">↑</span>':'';}
function miniCard(id,action='card',extra=''){const w=CATALOG[id],c=save.cards[id],u=upgradeState(save,id);return '<button class="mini-card '+w.rarity+' '+extra+' '+(u.ready?'upgrade-ready':u.copiesReady?'upgrade-needs-gold':'')+'" data-action="'+action+'" data-id="'+id+'" aria-label="'+esc(label(w)+(u.ready?' · '+t('upgrade'):''))+'">'+energyBadge(id)+art(id)+'<span class="mini-name">'+esc(label(w))+'</span><span class="mini-level">'+t('level')+' '+c.level+'</span>'+upgradeCallout(id)+'</button>';}

function header(){return '<header class="topbar"><button class="profile" data-action="profile" aria-label="'+tr('Player record','سجل اللاعب')+'"><span class="avatar">'+playerAvatarArt()+'</span><span><b>'+esc(save.name)+'</b><small>'+coin('trophy')+' '+fmt(save.trophies)+' <em>'+t('level')+' '+currentLevel(save)+'</em></small></span></button><button class="settings-btn" data-action="settings" aria-label="'+t('settings')+'">⚙</button></header><div class="wallet">'+['gold','gems','cores'].map(key=>'<button data-action="wallet" data-id="'+key+'" aria-label="'+t(key)+' '+save[key]+'">'+coin(key)+'<b>'+fmt(save[key])+'</b><span class="wallet-plus">+</span></button>').join('')+'</div>';}
function nav(){const icons={shop:uiArt(0),cards:uiArt(1),battle:uiArt(2),rank:uiArt(3),rewards:uiArt(4)};return '<nav class="bottom-nav" aria-label="'+tr('Game navigation','التنقل')+'">'+['shop','cards','battle','rank','rewards'].map(key=>'<button data-action="nav" data-id="'+key+'" class="'+(screen===key?'active ':'')+(key==='battle'?'main-tab':'')+'" '+(screen===key?'aria-current="page"':'')+'><span>'+icons[key]+'</span><b>'+t(key)+'</b>'+navNotice(key)+'</button>').join('')+'</nav>';}
function navNotice(key){return ((key==='cards'&&WEAPONS.some(w=>upgradeState(save,w.id).ready))?'<i class="notification ready-notice">'+WEAPONS.filter(w=>upgradeState(save,w.id).ready).length+'</i>':'')+(key==='rewards'&&(dailyStatus(save).ready||missionStatus(save).goals.some(m=>m.ready)||['gold','gems','cores'].some(k=>remaining(save,k)===0))?'<i class="notification"></i>':'');}
function syncNav(root){for(const button of root.querySelectorAll('[data-action="nav"]')){const key=button.dataset.id,active=screen===key;button.classList.toggle('active',active);if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');const html=navNotice(key),notice=button.querySelector('.notification');if((notice?.outerHTML||'')!==html){notice?.remove();if(html)button.insertAdjacentHTML('beforeend',html);}}}
function ribbon(text,color=''){return '<h2 class="ribbon '+color+'">'+text+'</h2>';}
function roadRewardAmount(r){return r.kind==='cache'?['gold','gems','cores','packs'].filter(k=>r.loot[k]).map(k=>'<span class="road-amount-part">'+fmt(r.loot[k])+' '+(k==='packs'?rewardArt(0):coin(k))+'</span>').join(''):'<span class="road-amount-part">'+(r.kind==='mystery'?'×':'+')+fmt(r.amount)+'</span>';}
function roadRewardLabel(r){const amount=r.kind==='cache'?['gold','gems','cores','packs'].filter(k=>r.loot[k]).map(k=>fmt(r.loot[k])+' '+t(k)).join(' + '):fmt(r.amount)+' '+(r.kind==='mystery'?tr('weapon copies','نسخ سلاح'):t(r.kind));return amount+' · '+fmt(r.localThreshold)+' '+tr('level trophies','كأسًا في المستوى');}
function stagePacksMarkup(idx){
 const track=stagePackTrack(save,idx);
 return '<div class="stage-pack-row"><div class="cache-track stage-pack-track">'+track.slots.map(slot=>{
  const description=tr('Pack '+(slot.slot+1),'باكيج '+fmt(slot.slot+1))+' · '+(slot.claimed?t('claimed'):slot.ready?t('open'):tr('Win battles to earn packs','اربح المعارك لكسب الباكيجات'));
  return '<button class="cache stage-pack '+(slot.claimed?'claimed ':slot.ready?'ready current ':'')+'" data-action="stagePack" data-stage="'+idx+'" data-slot="'+slot.slot+'" aria-label="'+esc(description)+'" title="'+esc(description)+'" '+(slot.ready&&!platform.saveBlocked?'':'disabled')+'>'+rewardArt(slot.tier)+(slot.claimed?'<span class="pack-claimed">✓</span>':'')+(slot.ready?'<i class="notification">!</i>':'')+'</button>';
 }).join('')+'</div></div>';
}
function lobbyShortcuts(){
 const missions=missionStatus(save),daily=dailyStatus(save);
 const icons={missions:'assets__lobby-missions.svg',daily:'assets__lobby-daily.svg',boost:'assets__lobby-boost.svg'};
 const icon=(key,action,title,ready,attrs='')=>'<button class="lobby-float float-'+key+'" data-action="'+action+'" '+attrs+' aria-label="'+esc(title)+'" title="'+esc(title)+'"><img src="'+icons[key]+'" alt="" width="48" height="48"><small>'+title+'</small>'+(ready?'<i class="notification"></i>':'')+'</button>';
 return icon('missions','missions',tr('Tasks','المهام'),missions.goals.some(m=>m.ready),'data-mission-day="'+Math.floor(Date.now()/86400000)+'"')+icon('daily','dailyGift',tr('Daily','اليومية'),daily.ready)+ (save.pending?icon('boost','openBoost',tr('Boost','التعزيز'),false):'');
}
function dailyGiftModal(){modal='dailyGift';openModal(weeklyDailyPanel(),'daily-gift-modal');modalRoot.querySelector('.login-rewards')?.setAttribute('aria-labelledby','modal-title');}

function preferredLobbyStage(){
 const road=readyRoadRewards(save)[0];if(road)return road.stageIndex;
 for(let index=0;index<currentLevel(save);index++)if(stagePackTrack(save,index).slots.some(slot=>slot.ready))return index;
 return currentLevel(save)-1;
}
function lobby(){
 const level=currentLevel(save),pending=readyRoadRewards(save),next=pending[0];stageIndex??=preferredLobbyStage();
 const idx=stageIndex,stage=STAGES[idx],road=stageRoad(save,idx),unlocked=idx<level,chosen=road.rewards.find(r=>r.id===stageRewardKey);
 const claimContext='<small class="claim-context">'+(next?tr('Level '+(next.stageIndex+1)+' reward · '+pending.length+' ready','جائزة المستوى '+fmt(next.stageIndex+1)+' · '+fmt(pending.length)+' جاهزة'):!unlocked?tr('Complete level '+idx+' to unlock','أكمل المستوى '+idx+' لفتح هذا المستوى'):'&#160;')+'</small>';
 const primary=next?btn('claimNextRoad','<span class="primary-action-label">'+tr('CLAIM','استلام')+'</span><small class="primary-action-reward">'+roadRewardArt(next)+' '+roadRewardAmount(next)+'</small>','battle-button claim-ready',platform.saveBlocked?'disabled':''):btn('play',unlocked?t('play'):tr('LOCKED','مقفل'),'battle-button',unlocked?'':'disabled');
 return '<section class="lobby"><div class="lobby-scene"><div class="stage-caption"><small>HEX DOMINION</small></div><div class="stage-art" style="--stage-x:'+((idx%3)/2*100)+'%;--stage-y:'+(Math.floor(idx/3)/4*100)+'%"></div><button class="help-float" data-action="how" aria-label="'+t('how')+'">?</button><button class="gift-float" data-action="nav" data-id="rewards">'+rewardArt(7)+'<small>'+t('free')+'</small></button>'+lobbyShortcuts()+'<div class="road-peek" role="status">'+(chosen&&!chosen.claimed?roadRewardDescription(chosen):next?tr('Your reward is ready — tap CLAIM','جائزتك جاهزة — اضغط استلام'):tr('Reach a marker to earn its reward','بلغ العلامة لتحصل على جائزتها'))+'</div></div><div class="lobby-controls"><div class="trophy-progress reward-road"><div class="road-markers" dir="ltr">'+road.rewards.map(r=>'<button class="road-node '+(r.claimed?'collected ':'')+(stageRewardKey===r.id?'chosen ':'')+(r.ready?'ready ':'')+'" data-action="stageReward" data-id="'+r.id+'" style="--pos:'+r.position*100+'%" aria-label="'+esc(roadRewardLabel(r))+'" title="'+esc(roadRewardLabel(r))+'"><span class="road-icon">'+roadRewardArt(r)+'</span>'+(!r.claimed?'<small>'+(r.kind==='cache'?'<span class="road-amount-part">×1</span>':roadRewardAmount(r))+'</small>':'')+'<i class="road-stem"></i>'+(r.claimed?'<em>✓</em>':'')+'</button>').join('')+'</div><div class="track" dir="ltr"><i style="width:'+road.progress*100+'%"></i><b>'+coin('trophy')+' '+fmt(road.current)+' / '+fmt(road.target)+'</b></div><div class="stage-selector" dir="ltr"><button data-action="stage" data-id="-1" aria-label="'+tr('Previous level','المستوى السابق')+'" '+(idx===0?'disabled':'')+'>‹</button><b>'+(idx+1)+'. '+stage[save.settings.lang==='ar'?1:0]+'</b><button data-action="stage" data-id="1" aria-label="'+tr('Next level','المستوى التالي')+'" '+(idx===14?'disabled':'')+'>›</button></div><small class="progress-remaining">'+tr(road.remaining+' trophies to '+(idx===14?'complete the road':'the next level'),'باقي '+road.remaining+' كأسًا '+(idx===14?'لإكمال المسار':'للمستوى التالي'))+'</small></div>'+stagePacksMarkup(idx)+primary+claimContext+'</div></section><div class="lobby-primary">'+primary+claimContext+'</div>';
}

async function claimRoadReward(id=null){
 return withSaveLock(()=>{
  if(!refreshProgress()){syncSaveNotice();toast(t('saveError'));return false;}
  id??=readyRoadRewards(save)[0]?.id;if(!id)return false;
  const candidate=structuredClone(save),receipt=claimRoad(candidate,id);if(!receipt)return false;
  if(!platform.save(candidate)){syncSaveNotice();toast(t('saveError'));return false;}
  save=candidate;stageRewardKey=null;if(screen==='battle')stageIndex=preferredLobbyStage();render();
  if(receipt.cards.length)celebrate(receipt.cards[0].id,receipt.cards[0].isNew?'new':'boost');else{sound.play('boost');rewardSparkles(document.querySelector('.reward-road')||app,receipt.gold?'gold':'star');}
  return true;
 });
}

function roadRewardArt(r){return r.kind==='mystery'?(r.card?art(r.card.id):'<span class="mystery-card"><i>?</i></span>'):r.kind==='cache'?rewardArt(7):r.kind==='packs'?rewardArt(0):coin(r.kind);}
function roadRewardDescription(r){const value=r.kind==='cache'?['gold','gems','cores','packs'].filter(k=>r.loot[k]).map(k=>'<span>+'+fmt(r.loot[k])+' '+(k==='packs'?rewardArt(0):coin(k))+'</span>').join(''):r.kind==='mystery'?'<span>'+roadRewardArt(r)+' +'+r.amount+' '+(r.card?esc(label(CATALOG[r.card.id])):tr('mystery copies','نسخ مخفية'))+'</span>':'<span>'+roadRewardArt(r)+' +'+fmt(r.amount)+'</span>';return '<b>'+value+'</b><small>'+fmt(r.localThreshold)+' '+tr('level trophies','كأسًا في المستوى')+' · '+(r.claimed?t('claimed'):r.ready?tr('Tap to claim','اضغط للاستلام'):tr('Reach this marker to unlock','بلغ هذه العلامة لفتح الجائزة'))+'</small>';}
function collection(){
 const owned=WEAPONS.filter(w=>save.cards[w.id].owned).length,upgradeCount=WEAPONS.filter(w=>upgradeState(save,w.id).ready).length;
 const weapons=WEAPONS.filter(w=>filter==='all'||filter==='ready'&&upgradeState(save,w.id).ready||filter==='owned'&&save.cards[w.id].owned||w.rarity===filter).sort((a,b)=>Number(save.cards[b.id].owned)-Number(save.cards[a.id].owned)||Number(save.deck.includes(b.id))-Number(save.deck.includes(a.id))||(save.deck.includes(a.id)&&save.deck.includes(b.id)?save.deck.indexOf(a.id)-save.deck.indexOf(b.id):0)||a.unlock-b.unlock||a.cost-b.cost||a.sprite-b.sprite),pages=Math.max(1,Math.ceil(weapons.length/collectionPageSize));collectionPage=Math.max(0,Math.min(collectionPage,pages-1));
 return '<section class="scroll-page arsenal-page"><div class="section-intro"><small>'+t('cards')+'</small><h1>'+t('arsenal')+'</h1><p id="deck-edit-hint" class="deck-edit-hint" role="status">'+tr('Drag a weapon onto your deck','اسحب السلاح إلى مكانه في التشكيلة')+'</p></div><div class="deck-strip">'+save.deck.map(id=>miniCard(id)).join('')+'</div><div class="collection-heading"><h2>'+t('collection')+'</h2><b>'+owned+'/20</b></div><div class="filters">'+['all','ready','owned','common','rare','epic'].map(key=>'<button data-action="filter" data-id="'+key+'" class="'+(filter===key?'active':'')+'">'+(key==='ready'?tr('Upgrades','الترقيات')+(upgradeCount?' <span class="filter-count">'+fmt(upgradeCount)+'</span>':''):t(key))+'</button>').join('')+'</div><div class="collection-grid">'+weapons.slice(collectionPage*collectionPageSize,(collectionPage+1)*collectionPageSize).map(w=>{const c=save.cards[w.id],u=upgradeState(save,w.id),cost=u.cost,ready=u.ready,description=label(w)+' · '+(c.owned?t('level')+' '+fmt(c.level):tr('Unlocks at level ','يفتح في المستوى ')+fmt(w.unlock))+(ready?' · '+t('upgrade'):'');return '<button class="collection-card '+w.rarity+' '+(!c.owned?'is-locked':'')+' '+(ready?'upgrade-ready':u.copiesReady?'upgrade-needs-gold':'')+'" data-action="card" data-id="'+w.id+'" aria-label="'+esc(description)+'" title="'+esc(description)+'"><span class="card-rarity">'+t(w.rarity)+'</span>'+energyBadge(w.id)+art(w.id)+'<b>'+esc(label(w))+'</b><small>'+t('level')+' '+fmt(c.owned?c.level:w.unlock)+(!c.owned?' · '+tr('Locked','مقفل'):'')+'</small>'+(c.owned?'<div class="copy-track"><i style="width:'+Math.min(100,c.copies/cost.copies*100)+'%"></i><span>'+fmt(c.copies)+' / '+fmt(cost.copies)+'</span></div>':'<span class="lock-icon">◆</span>')+upgradeCallout(w.id)+(save.deck.includes(w.id)?'<span class="equipped-mark">✓</span>':'')+'</button>';}).join('')+(!weapons.length?'<p class="collection-empty">'+tr('No weapons in this view','لا توجد أسلحة في هذا التصنيف')+'</p>':'')+'</div><nav class="collection-pager" aria-label="'+tr('Weapon pages','صفحات الأسلحة')+'"><button class="collection-page-prev" data-action="collectionPage" data-id="-1" aria-label="'+tr('Previous weapons','الأسلحة السابقة')+'" '+(collectionPage===0?'disabled':'')+'>‹</button><span class="collection-page-count">'+fmt(collectionPage+1)+' / '+fmt(pages)+'</span><button class="collection-page-next" data-action="collectionPage" data-id="1" aria-label="'+tr('Next weapons','الأسلحة التالية')+'" '+(collectionPage>=pages-1?'disabled':'')+'>›</button></nav></section>';
}

function timeLabel(ms){if(ms<=0)return t('claim');const sec=Math.ceil(ms/1000),h=Math.floor(sec/3600),m=Math.floor(sec%3600/60);return h?h+'h '+m+'m':m+'m '+sec%60+'s';}
function dailyCards(){return '<div class="daily-grid">'+['gold','gems','cores'].map(key=>'<article class="daily-card '+key+'">'+coin(key)+'<h3>'+t('daily'+key[0].toUpperCase()+key.slice(1))+'</h3><strong>'+(key==='gold'?100:key==='gems'?20:10)+'</strong>'+btn('claim',timeLabel(remaining(save,key)),'small '+(remaining(save,key)?'disabled-look':'green'),'data-id="'+key+'" data-timer="'+key+'" '+(remaining(save,key)?'disabled':''))+'<small>'+(key==='gems'?tr('Every 7 hours','كل 7 ساعات'):tr('Every 24 hours','كل 24 ساعة'))+'</small></article>').join('')+'</div>';}
function dailyDeals(){const rng=rngFrom(Math.floor(Date.now()/86400000)),pool=WEAPONS.filter(w=>save.cards[w.id].owned);const picks=[];while(picks.length<Math.min(3,pool.length)){const w=pool[Math.floor(rng()*pool.length)];if(!picks.includes(w))picks.push(w);}return picks;}
function shop(){return '<section class="scroll-page shop-page"><div class="section-intro"><small>'+t('shop')+'</small><h1>'+tr('Supply market','سوق الإمدادات')+'</h1><p>'+tr('Build your next advantage','جهّز أفضلية النزال القادم')+'</p></div><div class="market-links">'+['charge','deployment','time','crates','videos','daily','trade'].map((id,i)=>btn('marketJump',[tr('Quick Charge','الشحن السريع'),tr('Deployment','تخفيض النشر'),tr('Time coin','عملة الوقت'),tr('Crates','باكيجات'),tr('Videos','إعلانات'),tr('Daily','يومي'),tr('Exchange','تبادل')][i],'quiet small','data-id="'+id+'"')).join('')+'</div>'+quickChargeShop(save,supplyContext())+battleBoostPanel(save,supplyContext())+deploymentPanel(save,{saveBlocked:platform.saveBlocked})+timeShopPanel(save,supplyContext())+'<div id="market-crates">'+ribbon(t('packs'),'pink')+'<div class="shop-packs">'+[0,1,2].map(i=>'<article class="pack-card tier-'+i+'"><div class="pack-seal">'+['I','II','III'][i]+'</div>'+rewardArt(i,'shop-pack-art')+'<h3>'+t(['scout','strike','vault'][i])+'</h3><p>'+[8,20,55][i]+' '+tr('copies','نسخ')+' · '+[60,160,450][i]+' '+coin('gold')+'</p>'+btn('buyPack',fmt([100,200,500][i])+' '+coin('gems'),'green small','data-id="'+i+'"')+'</article>').join('')+'</div><p class="muted center odds">'+t('packOdds')+'</p></div>'+featuredOffer()+'<div id="market-videos">'+ribbon(tr('Watch & collect','شاهد واجمع'),'aqua')+marketSupply('ad')+'</div><div id="market-daily">'+ribbon(t('daily'),'aqua')+dailyCards()+ribbon(t('deals'),'pink')+'<div class="daily-grid">'+dailyDeals().map(w=>{const key='deal-'+Math.floor(Date.now()/86400000)+'-'+w.id,claimed=!!save.claims[key];return '<article class="deal-card">'+art(w.id)+'<b>'+esc(label(w))+'</b><span>+5 '+tr('copies','نسخ')+'</span>'+btn('deal',claimed?t('claimed'):'200 '+coin('gold'),'small green','data-id="'+w.id+'" '+(claimed?'disabled':''))+'</article>';}).join('')+'</div><p class="muted center">'+t('dailyReset')+'</p></div><div id="market-trade">'+ribbon(t('exchange'))+marketSupply('exchange')+'</div></section>';}
function scrollShopTo(id){
 const page=document.querySelector('.shop-page'),target=page?.querySelector('#market-'+id);
 if(!page||!target)return;
 scrollToSection(page,target);
}
function marketOfferButtonLabel(offer,allowed){
 const text=!allowed?tr('Unavailable','غير متاح'):offer.remaining?timeLabel(offer.remaining):offer.stockLeft===0?tr('Tomorrow','غدًا'):offer.type==='ad'?tr('Watch ad','شاهد إعلانًا'):Object.entries(offer.cost).map(([kind,value])=>fmt(value)+' '+coin(kind)).join(' + ');
 return (offer.type==='ad'?rewardedAdIcon():'')+text;
}
function marketSupply(type,onlyId=null){return '<div class="market-grid">'+marketOffers(save).filter(o=>o.type===type&&(!onlyId||o.id===onlyId)).map(o=>{const key=Object.keys(o.reward)[0],value=o.reward[key],allowed=type!=='ad'||platform.adsEnabled;return '<article class="market-offer '+key+'">'+(key==='packs'?rewardArt(0):coin(key))+'<h3>'+esc(tr(o.title,o.titleAr))+'</h3>'+(o.description?'<p class="market-description">'+esc(tr(o.description,o.descriptionAr))+'</p>':'')+'<strong>+'+fmt(value)+'</strong><small data-market-stock="'+o.id+'">'+(o.stockLeft!=null?tr(o.stockLeft+' left today','باقي اليوم: '+o.stockLeft):o.cooldown?(o.cooldown===2*3600000?tr('Every 2 hours','كل ساعتين'):tr('Every '+Math.round(o.cooldown/60000)+' min','كل '+Math.round(o.cooldown/60000)+' دقيقة')):tr('Available anytime','متاح دائمًا'))+'</small>'+btn('market',marketOfferButtonLabel(o,allowed),'small '+(type==='ad'?'blue':'green'),'data-id="'+o.id+'" data-market-timer="'+o.id+'" '+(!allowed||!o.available||!o.ready?'disabled':''))+'</article>';}).join('')+'</div>'+(type==='ad'?adStatusNote(platform,supplyContext()):'');}
function rewardPage(){return '<section class="scroll-page"><div class="section-intro"><small>'+t('rewards')+'</small><h1>'+t('daily')+'</h1><p>'+t('dailyHelp')+'</p></div>'+renderMissions(save,save.settings.lang,Date.now(),{saveBlocked:platform.saveBlocked,adsEnabled:platform.adsEnabled})+weeklyDailyPanel()+dailyCards()+adGemSupply()+'<article class="supply-banner">'+rewardArt(1,'shop-pack-art')+'<div><h2>'+t('packs')+'</h2><p>'+t('packHelp')+'</p>'+btn('battlePack',save.packs?t('open')+' · '+save.packs:t('soon'),'golden small')+'</div></article>'+ribbon(t('trophyRoad'))+roadRows()+'</section>';}
function roadRows(){return '<div class="road-list trophy-road-list">'+STAGES.map((stage,i)=>{const road=stageRoad(save,i);return '<details class="road-chapter" data-stage="'+i+'" '+(roadChaptersOpen?roadChaptersOpen.has(i):i===currentLevel(save)-1?'open':'')+'><summary><span>'+tr('Level ','المستوى ')+(i+1)+' · '+esc(stage[save.settings.lang==='ar'?1:0])+'</span><b>'+fmt(road.current)+' / '+fmt(road.target)+' '+coin('trophy')+'</b></summary>'+road.rewards.map(r=>'<div class="road-step '+(r.claimed?'reached':'')+'"><span class="road-item-art">'+roadRewardArt(r)+'</span><div>'+roadRewardDescription(r)+'</div><strong>'+(r.claimed?'✓':r.ready?'<button data-action="roadClaim" data-id="'+r.id+'" class="btn green small">'+t('claim')+'</button>':'◇')+'</strong></div>').join('')+'</details>';}).join('')+'</div>';}
function unlockPanel(id,withArt=false){const o=weaponOffer(save,id);if(!o)return '';const credited=o.ads>=o.requiredAds;return '<section class="weapon-unlock">'+(withArt?art(id):'')+'<h3>'+tr('Unlock ','افتح ')+esc(label(CATALOG[id]))+'</h3><p>'+tr('Guaranteed weapon + 3 copies','سلاح مضمون + 3 نسخ')+'</p>'+btn('unlockDirect',tr('Unlock','فتح')+' '+o.gems+' '+coin('gems'),'green','data-id="'+id+'" '+(save.gems<o.gems?'disabled':''))+((platform.adsEnabled||credited)?'<small>'+tr(credited?'Ad credit ready · '+o.adGems+' gems':'or '+o.adGems+' gems + 1 completed video',credited?'رصيد الإعلان جاهز · '+o.adGems+' ماسة':'أو '+o.adGems+' ماسة + إعلان واحد مكتمل')+'</small>'+btn('unlockAd',credited?tr('Unlock','فتح')+' '+o.adGems+' '+coin('gems'):rewardedAdIcon()+tr('Watch ad & unlock','شاهد إعلانًا وافتح'),'blue','data-id="'+id+'" '+(save.gems<o.adGems?'disabled':''))+'<small>'+tr('Gems are spent only when the weapon unlocks.','يُخصم الماس عند فتح السلاح فقط.')+'</small>':'')+'</section>';}
function featuredOffer(){const available=WEAPONS.filter(w=>weaponOffer(save,w.id)).sort((a,b)=>b.unlock-a.unlock);return available.length?'<div class="shop-unlock">'+unlockPanel(available[0].id,true)+'</div>':'';}
function adGemSupply(){return '<section class="reward-market">'+ribbon(tr('Extra supplies','إمدادات إضافية'),'aqua')+marketSupply('ad')+'</section>';}
function league(){updateWeek(save);const rng=rngFrom(save.weekly.key+67),names=new Set();while(names.size<24)names.add(rivalName(rng));const rows=[...names].map(name=>{const score=Math.floor(rng()*760+20),avatars=unlockedAvatars({best:score,cards:{hive:{owned:true}}});return{name,score,bot:true,avatar:avatars[Math.floor(rng()*avatars.length)]};});rows.push({name:save.name,score:save.weekly.score,bot:false,avatar:activeAvatar(save)});rows.sort((a,b)=>b.score-a.score);return '<section class="scroll-page"><div class="section-intro"><small>'+t('rank')+'</small><h1>'+t('league')+'</h1><p>'+tr('25 commanders. One weekly trophy race.','25 قائدًا في سباق الكؤوس الأسبوعي.')+'</p></div><div class="league-emblem">'+uiArt(3)+'<span>'+tr('RIVAL LEAGUE','دوري المنافسين')+'</span></div><div class="stats-row"><div><b>'+save.wins+'</b><span>'+t('wins')+'</span></div><div><b>'+fmt(save.best)+'</b><span>'+t('best')+'</span></div><div><b>'+save.losses+'</b><span>'+t('losses')+'</span></div></div><div class="rank-list">'+rows.map((r,i)=>'<div class="rank-row '+(!r.bot?'is-you':'')+'"><b class="rank-num">'+(i+1)+'</b><span class="rank-avatar">'+(r.bot?avatarArt(r.avatar):playerAvatarArt())+'</span><div><b>'+esc(r.name)+'</b>'+(!r.bot?'<small>'+t('you')+'</small>':'')+'</div><strong>'+fmt(r.score)+' '+coin('trophy')+'</strong></div>').join('')+'</div><p class="muted center">'+t('leagueHelp')+'</p><p class="muted center">'+t('weekly')+' · '+tr('Resets Monday UTC','يتجدد الاثنين UTC')+'</p></section>';}
function resultScreen(){
 const r=save.pending;if(!r)return lobby();
 return '<section class="result-page upgrade-results"><h1>'+tr('Choose your boost','اختر تعزيزك')+'</h1><p class="boost-explainer">'+tr('One core per weapon after this match. Boost fills the bar; upgrade later in Arsenal with gold.','نواة واحدة لكل سلاح بعد هذا النزال. يملأ التعزيز الشريط؛ ثم ادفع الذهب للترقية في الترسانة.')+'</p><div class="result-currencies core-balance">'+coin('cores')+' '+fmt(save.cores)+'</div><div class="postmatch-grid">'+r.deck.map(id=>{
  const c=save.cards[id],done=r.boosted.includes(id),max=c.level>=30,ready=boostFraction(c)>=1,pct=Math.round(boostFraction(c)*100);
  return '<article class="postmatch-card '+(ready?'boost-ready':'')+'"><div class="result-weapon">'+art(id)+'<b>'+esc(label(CATALOG[id]))+'</b><small>'+t('level')+' '+c.level+'</small></div><div class="boost-line"><i style="width:'+pct+'%"></i></div><small class="boost-value">'+(ready?tr('Ready for Arsenal','جاهز للترسانة'):pct+'%')+'</small>'+btn('boost',max?t('max'):ready?tr('Upgrade ready','الترقية جاهزة'):done?t('boostDone'):t('boost')+' 1 '+coin('cores'),'small blue boost-action','data-id="'+id+'" '+(done||max||ready?'disabled':''))+'</article>';
 }).join('')+'</div>'+nextGoal()+resultActions()+'</section>';
}
function offerScreen(){
 const r=save.pending;if(!r)return lobby();if(r.offerStatus!=='pending')return resultScreen();
 const offer=r.offer,cards=offer.cards||[{id:offer.card,amount:offer.copies}],enabled=platform.adsEnabled&&!platform.saveBlocked;
 return '<section class="result-page offer-page"><div class="offer-inner"><small class="offer-eyebrow">'+tr('OPTIONAL BATTLE BONUS','مكافأة نزال اختيارية')+'</small><h1>'+tr('Double your gold. Power up your deck.','ضاعف ذهبك. قوّ تشكيلتك.')+'</h1><p class="offer-intro">'+tr('Watch one video to collect these extras, or continue without it.','شاهد إعلانًا واحدًا لتحصل على هذه الإضافات، أو تابع دون الإعلان.')+'</p><div class="offer-rewards"><article class="offer-reward gold">'+coin('gold')+'<div><small>'+tr('Double match gold','مضاعفة ذهب النزال')+'</small><strong>+'+fmt(offer.gold)+' '+tr('gold','ذهب')+'</strong></div></article><article class="offer-reward cores">'+coin('cores')+'<div><small>'+tr('Postmatch boosts','تعزيزات بعد النزال')+'</small><strong>+'+fmt(offer.cores)+' '+tr('cores','نوى')+'</strong></div></article></div><h2>'+tr('Weapon cards for upgrades','كروت أسلحة للترقية')+'</h2><div class="offer-card-grid">'+cards.map(c=>'<div class="offer-weapon-card">'+art(c.id)+'<b>'+esc(label(CATALOG[c.id]))+'</b><strong>+'+fmt(c.amount)+' '+tr('copies','نسخ')+'</strong></div>').join('')+'</div><p class="offer-note">'+tr('Cards and boosts unlock upgrades; weapon levels change only when you pay gold in Arsenal.','الكروت والتعزيز يفتحان الترقية؛ لا يرتفع مستوى السلاح إلا بعد دفع الذهب في الترسانة.')+'</p><div class="offer-choices">'+(enabled?btn('matchAd',rewardedAdIcon()+tr('Watch ad & collect','شاهد الإعلان واستلم'),'blue offer-action'):'')+btn('matchSkip',tr('Continue without ad','تابع دون إعلان'),'blue offer-action')+'</div>'+(!enabled?adStatusNote(platform,supplyContext()):'')+'</div></section>';
}

function outcomeScreen(){const r=save.pending;if(!r)return lobby();return '<section class="outcome-page '+(r.won?'won':'lost')+'"><div class="result-emblem">'+rewardArt(r.won?6:8)+'</div><h1>'+t(r.won?'victory':'defeat')+'</h1><div class="trophy-delta">'+coin('trophy')+' <b>'+(r.delta>=0?'+':'')+fmt(r.delta)+'</b></div><p>'+fmt(save.trophies)+' '+tr('total trophies','مجموع الكؤوس')+'</p><div class="result-score"><span>'+t('you')+' '+(r.counts[1]/10).toFixed(1)+'%</span><b>—</b><span>'+tr('Rival','المنافس')+' '+(r.counts[2]/10).toFixed(1)+'%</span></div><div class="result-loot"><span>'+coin('gold')+' +'+r.gold+'</span>'+((r.gems||0)?'<span>'+coin('gems')+' +'+r.gems+'</span>':'')+((r.cores||0)?'<span>'+coin('cores')+' +'+r.cores+'</span>':'')+(r.stagePackAward?.earned?'<span>'+rewardArt(0)+' +1</span>':'')+(r.copies?'<span>'+art(r.card)+' +'+r.copies+'</span>':'')+'</div>'+(r.milestone?.cards?.length?'<div class="mystery-earned">'+r.milestone.cards.map(c=>'<div>'+art(c.id)+'<b>'+esc(label(CATALOG[c.id]))+' +'+c.amount+'</b></div>').join('')+'</div>':'')+(r.milestone?.rewards?.length?'<small class="road-receipt-note">'+tr('Trophy-road rewards collected','تم جمع جوائز مسار الكؤوس')+'</small>':'')+(r.milestone?.levels?.length?'<p class="milestone-toast">🌟 '+tr('Level '+r.milestone.levels.at(-1)+' rewards included','تشمل جوائز المستوى '+r.milestone.levels.at(-1))+'</p>':'')+(resultEmote?'<div class="result-reaction">'+esc(enemy?.name||tr('Rival','المنافس'))+' <span>'+EMOTES.find(e=>e.id===resultEmote).icon+'</span></div>':'')+nextGoal()+'<div class="outcome-timer" role="status">'+(platform.saveBlocked?tr('Returning to lobby… Practice result.','نعود إلى اللوبي… نتيجة تدريبية.'):platform.saveError?tr('Saving your rewards before returning…','نحفظ جوائزك قبل العودة…'):tr('Returning to lobby… Rewards saved.','نعود إلى اللوبي… تم حفظ الجوائز.'))+'</div></section>';}

function advanceOutcome(){
 clearTimeout(outcomeTimer);if(!save.pending||screen!=='outcome')return;
 const candidate=structuredClone(save);candidate.pending.summarySeen=true;
 if(!platform.saveBlocked&&!platform.save(candidate)){
  syncSaveNotice();toast(t('saveError'));
  const notice=document.querySelector('.outcome-timer');if(notice){notice.style.display='block';notice.innerHTML=btn('outcomeContinue',tr('Retry saving & continue','أعد الحفظ ثم تابع'),'blue');}
  return;
 }
 save=candidate;screen=save.pending.offerStatus==='pending'?'offer':'result';closeModal();render();
}

async function declineOffer(){
 if(screen!=='offer'||!save.pending)return false;
 if(platform.saveBlocked){save.pending.offerStatus='declined';screen='result';render();return true;}
 return withSaveLock(()=>{
  if(!refreshProgress()){toast(t('saveError'));return false;}
  const candidate=structuredClone(save);
  if(candidate.pending?.offerStatus==='pending'){
   if(!declineMatchAd(candidate,candidate.pending))return false;
   if(!platform.save(candidate)){syncSaveNotice();toast(t('saveError'));return false;}
   save=candidate;
  }
  screen='result';render();return true;
 });
}

function battleScreen(){return '<section class="battle-screen"><header class="battle-hud"><div class="combatant blue"><button class="combat-avatar" data-action="combatDeck" data-id="1" aria-label="'+tr('Your battle deck','تشكيلتك في النزال')+'" aria-expanded="false">'+playerAvatarArt()+'</button><b>'+t('you')+'</b><strong id="blue-score">20.0%</strong></div><div class="battle-clock"><button data-action="pause" aria-label="'+t('pause')+'">Ⅱ</button><b id="clock">3:00</b><small id="phase-label">'+t('battle')+'</small>'+timeCombatControl()+'</div><div class="combatant red"><button class="combat-avatar" data-action="combatDeck" data-id="2" aria-label="'+tr('Inspect rival deck','تفقد تشكيلة الخصم')+'" aria-expanded="false">'+avatarArt(enemy.avatar||0)+'</button><b>'+esc(enemy.name)+'</b><strong id="red-score">20.0%</strong></div></header><div class="territory-meter"><i id="blue-bar"></i><i id="neutral-bar"></i><i id="red-bar"></i></div><div class="board-wrap"><canvas id="board" tabindex="0" aria-label="'+t('howControls')+'"></canvas><div id="deployment-target" class="deployment-target" aria-hidden="true" hidden><span>'+tr('Your blue base','منطقتك الزرقاء')+'</span></div><aside id="combat-deck" class="combat-deck-panel" hidden></aside><div class="emote-bubble rival" id="rival-emote" role="status"></div><div class="emote-bubble player" id="player-emote" role="status"></div><button class="emote-toggle" data-action="emoteTray" aria-label="'+tr('Emotes','التعبيرات')+'" aria-expanded="false">☻</button><div class="emote-tray" id="emote-tray" hidden>'+EMOTES.map(e=>'<button data-action="emote" data-id="'+e.id+'" aria-label="'+tr(e.en,e.ar)+'">'+e.icon+'</button>').join('')+'<button data-action="muteEmotes" aria-label="'+tr('Mute rival emotes','كتم تعبيرات الخصم')+'">◉</button></div></div><div class="battle-hand-area"><div class="board-cue" id="board-cue" role="status" hidden></div>'+deploymentCombatStatus()+'<p id="place-hint">'+t('select')+'</p><div id="hand" class="hand"></div><div class="energy-row">'+coin('energy')+'<div id="energy-pips"></div><b id="energy-number">5/10</b></div>'+quickChargeControl(save,{tr,fmt})+'</div></section>';}
function updateCombatDeck(){const panel=document.querySelector('#combat-deck');if(!panel||!combatDeckOwner)return;const side=battle.sides[combatDeckOwner],deck=side.deck||enemy.deck,stamp=combatDeckOwner+'-'+side.revealed?.join(',');if(panel.dataset.stamp===stamp)return;panel.dataset.stamp=stamp;panel.hidden=false;panel.innerHTML='<div class="deck-panel-title"><b>'+esc(combatDeckOwner===1?save.name:enemy.name)+'</b><button data-action="hideCombatDeck" aria-label="'+t('close')+'">⌃</button></div><div class="scouted-deck">'+deck.map(id=>{const seen=combatDeckOwner===1||side.revealed?.includes(id);return '<div class="scouted-card '+(seen?'known':'unknown')+'">'+(seen?art(id)+'<b>'+esc(label(CATALOG[id]))+'</b><small>'+t('level')+' '+side.levels[id]+'</small>':'<span class="mystery-card"><i>?</i></span><small>'+tr('Unseen','مخفي')+'</small>')+'</div>';}).join('')+'</div><p>'+tr('Weapons reveal when deployed. Battle continues.','تُكشف الأسلحة عند نشرها. النزال مستمر.')+'</p>';}
function hideCombatDeck(){combatDeckOwner=0;const panel=document.querySelector('#combat-deck');if(panel){panel.hidden=true;panel.dataset.stamp='';}document.querySelectorAll('[data-action=combatDeck]').forEach(el=>el.setAttribute('aria-expanded','false'));}
function render(navigation=false){queueMicrotask(updateSupplyTimers);deckDragController?.destroy();deckDragController=null;victoryEffect?.cleanup();victoryEffect=null;renderer?.destroy();renderer=null;syncSaveNotice();const prior=document.querySelector('.scroll-page,.result-page');if(renderedScreen&&prior)viewScroll[renderedScreen]=prior.scrollTop;if(renderedScreen==='rewards'){const chapters=prior?.querySelector('.trophy-road-list');if(chapters)roadChaptersOpen=new Set([...chapters.querySelectorAll('.road-chapter[open]')].map(node=>Number(node.dataset.stage)));}t=translator(save.settings.lang);document.documentElement.lang=save.settings.lang;document.documentElement.dir=save.settings.lang==='ar'?'rtl':'ltr';document.body.classList.toggle('reduce-motion',save.settings.reduced);sound.sound=save.settings.sound;sound.music=save.settings.music;sound.musicVolume=save.settings.musicVolume;sound.sync();app.dataset.screen=screen;app.className='game-shell '+(screen==='combat'?'in-combat':screen==='pack'?'reward-view':'');renderedScreen=screen;if(screen==='combat'){app.innerHTML=battleScreen();renderer=new Renderer(document.querySelector('#board'),atlas,{arenaZoom:save.settings.arenaZoom});bindBoard();updateHUD(true);return;}if(screen==='match'){renderMatch();return;}if(screen==='pack'){app.innerHTML=packScreen();return;}const page={battle:lobby,shop,cards:collection,rank:league,rewards:rewardPage,result:resultScreen,offer:offerScreen,outcome:outcomeScreen,detail:detailScreen}[screen]||lobby;const pageHTML=(screen==='battle'&&save.welcomeMessage?'<aside class="welcome-strip"><span>🎁 '+tr('Welcome gift added!','أُضيفت هدية البداية!')+' <b>300 '+coin('gold')+' · 30 '+coin('gems')+' · 5 '+coin('cores')+' + '+rewardArt(0)+'</b></span><button data-action="dismissWelcome" aria-label="'+t('close')+'">×</button></aside>':'')+page();const hasNav=!['result','offer','outcome','detail'].includes(screen),bottom=app.querySelector('.bottom-nav'),wallet=app.querySelector('.wallet');
// Keep stable tap targets and the already-painted header while changing menu pages.
if(navigation&&hasNav&&bottom&&wallet){while(wallet.nextElementSibling&&wallet.nextElementSibling!==bottom)wallet.nextElementSibling.remove();bottom.insertAdjacentHTML('beforebegin',pageHTML);syncNav(bottom);}else app.innerHTML=header()+pageHTML+(hasNav?nav():'');
pinScreenActions(app,screen);
const next=document.querySelector('.scroll-page,.result-page');if(next&&viewScroll[screen])next.scrollTop=viewScroll[screen];clearTimeout(outcomeTimer);if(screen==='outcome')queueOutcomeReturn();if(screen==='cards'){bindArsenalDrag();scheduleCollectionLayout();}}
let collectionLayoutFrame=0;
function scheduleCollectionLayout(){cancelAnimationFrame(collectionLayoutFrame);collectionLayoutFrame=requestAnimationFrame(()=>{if(screen!=='cards')return;const size=measureCollectionCapacity(app.querySelector('.arsenal-page'));if(size&&size!==collectionPageSize){const first=collectionPage*collectionPageSize,focused=document.activeElement;const id=focused?.dataset.id,action=focused?.dataset.action;collectionPageSize=size;collectionPage=Math.floor(first/size);render();if(action){[...app.querySelectorAll('[data-action]')].find(el=>el.dataset.action===action&&el.dataset.id===id)?.focus({preventScroll:true});}}});}
window.addEventListener('resize',scheduleCollectionLayout);document.addEventListener('fullscreenchange',scheduleCollectionLayout);new ResizeObserver(scheduleCollectionLayout).observe(app);


async function commitDeckChange(incomingId,targetId){
 if(platform.saveBlocked)return false;
 return withSaveLock(()=>{
  if(!['cards','detail'].includes(screen))return false;
  if(!refreshProgress()){syncSaveNotice();toast(t('saveError'));return false;}
  const candidate=structuredClone(save);if(!replaceDeckWeapon(candidate,incomingId,targetId))return false;
  if(!platform.save(candidate)){syncSaveNotice();toast(t('saveError'));return false;}
  save=candidate;sound.play('click');return true;
 });
}
function bindArsenalDrag(){
 const root=document.querySelector('.arsenal-page');if(!root)return;
 for(const card of root.querySelectorAll('.deck-strip .mini-card')){card.dataset.deckSource=card.dataset.id;card.dataset.deckTarget=card.dataset.id;card.setAttribute('aria-describedby','deck-edit-hint');}
 for(const card of root.querySelectorAll('.collection-card:not(.is-locked)')){card.dataset.deckSource=card.dataset.id;card.setAttribute('aria-describedby','deck-edit-hint');}
 const hint=root.querySelector('.deck-edit-hint'),idle=hint?.textContent||'';
 deckDragController=bindDeckDrag(root,{
  onDrop:async(incoming,target)=>{if(screen!=='cards')return;if(await commitDeckChange(incoming,target)){render();toast(t('swapDone'));}},
  onDragEnd:()=>{deckDragSuppressUntil=performance.now()+450;},
  onStatus:message=>{if(hint)hint.textContent=message??idle;},
  describeTarget:(incoming,target)=>incoming===target?idle:tr('Release to replace ','أفلت لاستبدال ')+label(CATALOG[target]),
  onError:handleRuntimeError
 });
}

function navigate(to){if((battle&&!battle.winner)||to===screen)return;clearTimeout(outcomeTimer);viewScroll[to]=0;screen=to;closeModal();render(true);}
function openModal(content,cls=''){
 if(modalRoot.querySelector('.settings-modal')&&cls!=='settings-modal')restoreMusicSettings();
 modalReturn=document.activeElement;
 modalRoot.innerHTML='<div class="modal-backdrop"><section class="modal '+cls+'" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-header"><button class="modal-close" data-action="close" aria-label="'+t('close')+'">×</button></div><div class="modal-scroll">'+content+'</div><div class="modal-footer" hidden></div></section></div>';
 const body=modalRoot.querySelector('.modal-scroll'),footer=modalRoot.querySelector('.modal-footer');
 const direct=[...body.children].filter(el=>el.matches('button.btn'));
 const primary=['saveSettings','tutorialStart','resume','recoverBattle','claim','close'].map(action=>direct.find(el=>el.dataset.action===action)).find(Boolean);
 if(primary)footer.append(primary);
 if(cls==='daily-gift-modal'){const giftAction=body.querySelector('.login-action');if(giftAction)footer.append(giftAction);}
 footer.hidden=!footer.children.length;
 const title=modalRoot.querySelector('h2');if(title)title.id='modal-title';
 modalRoot.querySelector('.modal-close')?.focus({preventScroll:true});
}
function restoreMusicSettings(){sound.music=save.settings.music;sound.musicVolume=save.settings.musicVolume;sound.sync();}
function closeModal(){if(modal==='settings')restoreMusicSettings();modalRoot.innerHTML='';modal='';if(modalReturn?.isConnected)modalReturn.focus({preventScroll:true});}
function avatarModal(){
 const unlocked=unlockedAvatars(save),portal=save.identity.kind==='crazygames'&&portalPictureUrl(portalUser);
 const portalChoice=portal?'<button data-action="choosePortalAvatar" class="portrait-choice portal-choice '+(save.identity.avatarSource==='crazygames'?'chosen':'')+'" aria-label="'+tr('CrazyGames profile picture','صورة حساب CrazyGames')+'">'+portalAvatarArt()+'<b>'+tr('CrazyGames profile','حساب CrazyGames')+'</b><small>'+(save.identity.avatarSource==='crazygames'?'✓ '+tr('Equipped','مُختارة'):tr('Use portrait','استخدم الصورة'))+'</small></button>':'';
 modal='avatars';
 openModal('<h2>'+tr('Your commander','قائدك')+'</h2><p>'+tr('Choose your CrazyGames picture or an in-game portrait.','اختر صورة حساب CrazyGames أو صورة من اللعبة.')+'</p><div class="avatar-grid">'+portalChoice+AVATARS.map((a,i)=>{const ready=unlocked.includes(i),chosen=save.identity.avatarSource!=='crazygames'&&activeAvatar(save)===i;return '<button data-action="chooseAvatar" data-id="'+i+'" class="portrait-choice '+(ready?'':'locked')+' '+(chosen?'chosen':'')+'" '+(ready?'':'disabled')+' aria-label="'+tr(a.name,a.ar)+'">'+avatarArt(i)+'<b>'+tr(a.name,a.ar)+'</b><small>'+(chosen?'✓ '+tr('Equipped','مُختارة'):ready?tr('Use portrait','استخدم الصورة'):a.weapon?tr('Own ','امتلك ')+label(CATALOG[a.weapon]):t('level')+' '+a.level)+'</small></button>';}).join('')+'</div>','avatar-modal');
}
function cardModal(id){if(!CATALOG[id])return;if(screen!=='detail')detailOrigin=screen;detailId=id;detailTab='stats';detailSwap=false;viewScroll.detail=0;screen='detail';closeModal();render();app.querySelector('.scroll-page')?.scrollTo(0,0);}
function detailScreen(){const id=detailId,w=CATALOG[id],c=save.cards[id],a=TACTICS[id],s=stats(id,c.level),cost=upgradeCost(c.level),u=upgradeState(save,id),owned=c.owned,scale=['laser','sweeper','horn','mortar','grenadier','flame','tank'].includes(id)?1+(c.level-1)*.025:1,damage=typeof a.damage==='number'?Math.round(a.damage*scale):a.damage;
const cycleLabel=id==='hive'?tr('Bee replacement','تعويض النحل'):id==='storm'?tr('Activation','التفعيل'):tr('Attack cycle','دورة الهجوم');
const cycleValue=['tnt','ball'].includes(id)?tr('On contact','عند الاصطدام'):((id==='storm'?.9*s.interval/w.interval:s.interval).toFixed(2)+tr('s','ث'));
const tile=(icon,name,value)=>'<div class="stat-tile"><span class="stat-icon" aria-hidden="true">'+icon+'</span><small>'+name+'</small><b>'+value+'</b></div>';
const partners=(key,icon,title)=>!a[key].length?'':'<div class="tactic-row '+key+'"><span><i aria-hidden="true">'+icon+'</i><b>'+title+'</b></span><div>'+a[key].map(other=>'<button data-action="inspectPartner" data-id="'+other+'" aria-label="'+esc(label(CATALOG[other]))+'">'+art(other)+'<small>'+esc(label(CATALOG[other]))+'</small></button>').join('')+'</div></div>';
return '<section class="detail-page scroll-page"><div class="detail-top">'+btn('detailBack','‹ '+tr('Back','رجوع'),'quiet small')+'<span class="rarity-pill">'+t(w.rarity)+'</span><button class="detail-close" data-action="detailBack" aria-label="'+t('close')+'">×</button></div><div class="weapon-hero"><div><h1>'+esc(label(w))+'</h1><span class="role-chip">'+a.icon+' '+tr(...a.role)+'</span><b class="hero-level">'+t('level')+' '+c.level+'</b><span class="hero-energy">'+coin('energy')+' '+(plannedCost(id)<w.cost?'<del>'+w.cost+'</del> ':'')+plannedCost(id)+'</span></div>'+art(id)+'</div><div class="inspector-panel"><div class="inspector-tabs">'+(owned&&detailOrigin!=='result'?['stats','deck']:['stats']).map(tab=>'<button data-action="detailTab" data-id="'+tab+'" aria-pressed="'+(detailTab===tab)+'" class="'+(detailTab===tab?'active':'')+'">'+(tab==='stats'?'⚔️ '+tr('Stats','الإحصاءات'):tr('Move in deck','تغيير المكان في التشكيلة'))+'</button>').join('')+'</div>'+(detailTab==='stats'?'<div class="stats-grid">'+tile('❤️',tr('Health','الصحة'),Math.round(s.hp))+tile('⚔️',tr('Damage','الضرر'),damage)+tile('🎯',id==='flak'?tr('Defense radius','نطاق الحماية'):tr('Reach','المدى'),id==='flak'?Math.round(s.range):'<span class="range-dots" aria-label="'+a.range+'/5">'+Array.from({length:5},(_,i)=>'<i class="'+(i<a.range?'lit':'')+'"></i>').join('')+'</span>')+tile('⏱️',cycleLabel,cycleValue)+tile('⬡',tr('Footprint','المساحة'),w.size)+tile(a.icon,tr('Ability','القدرة'),tr(...a.ability))+'</div><div class="tactics">'+partners('strong','⬆️',tr('Strong against','قوي ضد'))+partners('weak','⬇️',tr('Watch out for','احذر من'))+partners('pair','🤝',tr('Pairs with','ينسجم مع'))+'</div>':'<div class="inline-swap"><b>'+t('replace')+'</b><div class="deck-strip">'+save.deck.map(x=>miniCard(x,'swap')).join('')+'</div></div>')+
(owned?'<div class="inspector-upgrade '+(u.ready?'upgrade-ready':'')+'"><div class="upgrade-paths"><div class="copy-progress"><i style="width:'+Math.min(100,c.copies/cost.copies*100)+'%"></i><b>'+tr('Copies','النسخ')+' · <bdi>'+fmt(c.copies)+' / '+fmt(cost.copies)+'</bdi></b></div><div class="boost-progress" role="button" tabindex="0" data-action="masteryInfo" aria-label="'+tr('Boost progress and mastery help','تقدم التعزيز ومعلومات الإتقان')+'"><div class="boost-line"><i style="width:'+Math.round(boostFraction(c)*100)+'%"></i></div><b>'+tr('Boost','التعزيز')+' · '+Math.round(boostFraction(c)*100)+'%'+(u.boostReady?' ✓':'')+'</b></div></div><p class="upgrade-rule">'+tr('Fill either bar, then pay gold to upgrade. Boost never levels a weapon by itself.','أكمل أحد الشريطين ثم ادفع الذهب للترقية. التعزيز وحده لا يرفع مستوى السلاح.')+'</p><div class="upgrade-buttons">'+btn('upgrade',c.level>=30?t('max'):tr('Upgrade with copies','ترقية بالنسخ')+' · '+fmt(cost.gold)+' '+coin('gold'),'green wide','data-id="'+id+'" data-method="copies" '+(c.level>=30?'disabled':''))+(u.boostReady?btn('upgrade',tr('Upgrade with Boost','ترقية بالتعزيز')+' · '+fmt(cost.gold)+' '+coin('gold'),'blue wide','data-id="'+id+'" data-method="boost"'):'')+'</div></div>':(weaponOffer(save,id)?unlockPanel(id):'<p class="locked-detail">🔒 '+t('unlock')+' '+w.unlock+'</p>'))+'</div>'+
''+'</section>';}

function musicVolumeControl(){const value=save.settings.musicVolume;return '<label class="music-volume-control" for="setting-music-volume"><span>'+tr('Music volume','مستوى الموسيقى')+'<output id="music-volume-value" for="setting-music-volume">'+value+'%</output></span><input id="setting-music-volume" type="range" min="0" max="100" step="1" value="'+value+'" '+(save.settings.music?'':'disabled')+' aria-valuetext="'+value+'%"><small>'+tr('Music stays at a similar level in menus and battles.','تبقى الموسيقى بمستوى متقارب في القوائم والمعارك.')+'</small></label>';}
function gameSelect(id,label,choices,current,help=''){
 const chosen=choices.find(([value])=>String(value)===String(current))||choices[0];
 return '<div class="form-field game-select-field"><span id="'+id+'-label">'+esc(label)+'</span><div class="game-select" data-select="'+id+'" data-value="'+esc(chosen[0])+'"><button type="button" id="'+id+'" class="game-select-trigger" data-action="gameSelectToggle" aria-haspopup="listbox" aria-expanded="false" aria-controls="'+id+'-options" aria-labelledby="'+id+'-label '+id+'-value"><span class="game-select-value" id="'+id+'-value">'+esc(chosen[1])+'</span><span class="game-select-chevron" aria-hidden="true">⌄</span></button><div id="'+id+'-options" class="game-select-options" role="listbox" aria-labelledby="'+id+'-label" hidden>'+choices.map(([value,text])=>'<button type="button" class="game-select-option" role="option" data-action="gameSelectOption" data-value="'+esc(value)+'" aria-selected="'+(String(value)===String(chosen[0]))+'" tabindex="-1">'+esc(text)+'</button>').join('')+'</div></div>'+(help?'<small>'+esc(help)+'</small>':'')+'</div>';
}
function closeGameSelects(except=null){
 for(const select of modalRoot.querySelectorAll('.game-select'))if(select!==except){
  select.querySelector('.game-select-options').hidden=true;
  select.querySelector('.game-select-trigger').setAttribute('aria-expanded','false');
 }
}
function openGameSelect(select,focusOption=false){
 closeGameSelects(select);
 const options=select.querySelector('.game-select-options'),trigger=select.querySelector('.game-select-trigger');
 options.hidden=false;trigger.setAttribute('aria-expanded','true');
 if(focusOption)(select.querySelector('.game-select-option[aria-selected="true"]')||select.querySelector('.game-select-option'))?.focus();
}
function handleGameSelectKey(event){
 if(modal!=='settings')return false;
 const option=event.target.closest('.game-select-option'),trigger=event.target.closest('.game-select-trigger');
 const select=event.target.closest('.game-select');
 const expanded=modalRoot.querySelector('.game-select-options:not([hidden])');
 if(trigger&&['ArrowDown','ArrowUp','Enter',' '].includes(event.key)){
  event.preventDefault();openGameSelect(select,true);
  if(event.key==='ArrowUp')select.querySelector('.game-select-option:last-child')?.focus();
  return true;
 }
 if(option){
  const options=[...select.querySelectorAll('.game-select-option')],index=options.indexOf(option);
  if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){
   event.preventDefault();
   const next=event.key==='Home'?0:event.key==='End'?options.length-1:(index+(event.key==='ArrowDown'?1:-1)+options.length)%options.length;
   options[next]?.focus();return true;
  }
  if(event.key==='Enter'||event.key===' '){event.preventDefault();option.click();return true;}
  if(event.key==='Tab')closeGameSelects();
 }
 return false;
}
function arenaZoomControl(){return gameSelect('setting-arena-zoom',tr('Arena zoom (optional)','تكبير الساحة (اختياري)'),[1,1.25,1.45,1.75,2].map(value=>[value,value===1?tr('Full map — 100%','الخريطة كاملة — 100%'):Math.round(value*100)+'%']),save.settings.arenaZoom,tr('Full map by default. When zoomed, drag the map to look around.','تظهر الخريطة كاملة افتراضيًا. عند التكبير، اسحب الساحة لرؤية بقية الخريطة.'));}
function settingsModal(){modal='settings';openModal('<h2>'+t('settings')+' <small class="build-version">v1.10.17-preview</small></h2><div class="form-field player-name-field"><span>'+t('name')+'</span><output class="player-name-readonly">'+esc(save.name)+'</output><small class="player-name-note">'+(save.identity.kind==='crazygames'?tr('Your CrazyGames account name','اسم حسابك في CrazyGames'):tr('Guest name assigned automatically','اسم ضيف يُحدّد تلقائيًا'))+'</small></div>'+gameSelect('language',t('language'),[['en','English'],['ar','العربية']],save.settings.lang)+['sound','music','motion'].map(key=>'<label class="setting-row">'+t(key)+'<input type="checkbox" id="setting-'+key+'" '+(save.settings[key==='motion'?'reduced':key]?'checked':'')+'></label>'+(key==='music'?musicVolumeControl():'')).join('')+arenaZoomControl()+btn('saveSettings',t('save'),'green wide')+btn('how',t('how'),'quiet wide')+btn('credits',tr('Credits','صنّاع اللعبة'),'quiet wide'),'settings-modal');}
function howModal(start=false){modal='how';openModal('<h2>'+t('how')+'</h2><div class="how-steps">'+[1,2,3,4].map(i=>'<article><span>'+i+'</span><div><h3>'+t('learn'+i)+'</h3><p>'+t('learn'+i+'Body')+'</p></div></article>').join('')+'</div><p class="muted">'+t('keyboard')+'</p>'+btn(start?'tutorialStart':'close',t(start?'start':'continue'),'green wide'),'how-modal');}
function matchRivalMarkup(rival,rolling=false){return '<div class="match-rival'+(rolling?' rolling':'')+'"><span class="avatar red">'+avatarArt(rival.avatar||0)+'</span><h2>'+esc(rival.name)+'</h2><span class="rival-trophies">'+coin('trophy')+' '+fmt(rival.trophies)+'</span></div>';}
function previewRival(){return {name:rivalName(),avatar:Math.floor(Math.random()*AVATARS.length),trophies:Math.max(0,save.trophies+Math.round((Math.random()-.5)*80))};}
function rivalPicker(){return renderRivalPicker(matchCandidates,{renderCandidate:r=>matchRivalMarkup(r),selected:enemy,settled:matchReady,rolling:!matchReady,label:tr('Rival selection','اختيار المنافس')});}
function renderMatch(){app.innerHTML='<section class="match-page'+(matchReady?' rival-found':'')+'"><div class="rival-roulette">'+rivalPicker()+'</div><div class="versus">VS</div><div class="match-player"><span class="avatar">'+playerAvatarArt()+'</span><h2>'+esc(save.name)+'</h2><span>'+coin('trophy')+' '+fmt(save.trophies)+'</span></div><div class="match-status" role="status" aria-live="polite"><span class="spinner" aria-hidden="true"></span><b>'+(matchReady?tr('Opponent found','تم العثور على خصم'):t('search'))+'</b></div>'+btn('cancelMatch',t('cancel'),'quiet')+'</section>';}
function updateMatchPreview(found=false){
 matchReady=found;matchPreview=found?enemy:previewRival();if(!found)matchCandidates=[matchCandidates[1],matchCandidates[2],matchPreview];
 const roulette=document.querySelector('.rival-roulette');if(roulette)roulette.innerHTML=rivalPicker();
 document.querySelector('.match-page')?.classList.toggle('rival-found',found);
 if(found){const status=document.querySelector('.match-status b');if(status)status.textContent=tr('Opponent found','تم العثور على خصم');sound.finishSearch();}
}
function startMatch(){
 if(screen==='match'||screen==='combat')return;
 const pendingReward=readyRoadRewards(save)[0];if(pendingReward&&!platform.saveBlocked){stageIndex=pendingReward.stageIndex;screen='battle';render();toast(tr('Claim your earned rewards first','استلم جوائزك المستحقة أولًا'));return;}
 matchSearch.cancel();guidedBattle=save.wins+save.losses===0&&currentLevel(save)===1&&save.best===0;
 enemy=guidedBattle?tutorialOpponent(save):opponent(save);matchCandidates=Array.from({length:3},previewRival);matchPreview=matchCandidates[1];matchReady=false;screen='match';runtimeFault=false;const token=++matchToken;
 if(guidedBattle){void beginBattle().catch(handleRuntimeError);return;}
 render();sound.startSearch(MATCH_SEARCH_MS);
 matchSearch.start({isCurrent:()=>token===matchToken&&screen==='match',onCandidate:()=>updateMatchPreview(),onFound:()=>updateMatchPreview(true),onComplete:()=>{void beginBattle().catch(handleRuntimeError);}});
}
async function beginBattle(){
 if(startingBattle===matchToken||screen!=='match')return;matchSearch.cancel();const token=matchToken;startingBattle=token;
 try{await withSaveLock(()=>{
  if(token!==matchToken||screen!=='match')return;
  let candidate=save,boost={discount:0,consumed:false},supplies={deck:save.deck,levels:Object.fromEntries(save.deck.map(id=>[id,save.cards[id].level])),discount:0};
  if(!platform.saveBlocked){
   if(!refreshProgress()){screen='battle';sound.endSearch();render();toast(t('saveError'));return;}
   if(save.pending&&!save.pending.summarySeen){screen='outcome';sound.endSearch();render();return;}const pendingReward=readyRoadRewards(save)[0];if(pendingReward){stageIndex=pendingReward.stageIndex;screen='battle';sound.endSearch();render();return;}if(save.pendingPack){screen='battle';sound.endSearch();showPack(save.pendingPack,save.pendingPack.tier);return;}candidate=JSON.parse(JSON.stringify(save));candidate.pending=null;supplies=consumeBattleSupply(candidate);boost=supplies.discount?{discount:supplies.discount,consumed:true}:consumeDeployment(candidate);
  }
  // Construct first; only charge a one-match pass when a valid battle is ready.
  const nextBattle=new Battle(supplies.deck,supplies.levels,enemy,Date.now(),{level:currentLevel(candidate),deploymentDiscounts:{1:boost.discount}});
  const needsCommit=!platform.saveBlocked;
  if(needsCommit&&!platform.save(candidate)){screen='battle';sound.endSearch();render();toast(t('saveError'));return;}
  if(needsCommit)save=candidate;
  closeModal();battle=nextBattle;playerDeployments=0;activeBattleId=globalThis.crypto?.randomUUID?.()||Date.now()+'-'+Math.random().toString(36).slice(2);selected=-1;combatDeckOwner=0;endingBattle=false;social=new RivalEmotes();resultEmote=null;screen='combat';sound.inBattle=true;sound.endSearch(false);lastFrame=performance.now();accumulator=0;hudStamp='';render();platform.event('gameplayStart');
 });}finally{if(startingBattle===token)startingBattle=null;}
}


function syncCameraControls(){
 const c=renderer?.camera,wrap=document.querySelector('.board-wrap');if(!c||!wrap)return;
 wrap.classList.toggle('camera-enabled',c.enabled);wrap.classList.toggle('has-selection',selected>=0);
 const target=document.querySelector('#deployment-target');if(target){target.hidden=!(guidedBattle&&battle&&!battle.firstPlayer&&!battle.paused);if(!target.hidden){const h=battle.grid.cells[912],p=renderer.worldToClient(h.x,h.y),r=wrap.getBoundingClientRect();target.style.left=(p.x-r.left)+'px';target.style.top=(p.y-r.top)+'px';target.style.setProperty('--target-size',Math.min(100,Math.max(38,36*c.scale))+'px');target.hidden=p.y<r.top+28||p.y>r.bottom-28||p.x<r.left+28||p.x>r.right-28;}}
}

function findPlacement(x,y){const h=battle.grid.at(x,y);if(!h)return null;const id=selected>=0?battle.sides[1].queue[selected]:null,w=CATALOG[id];if(!w)return h;if(battle.grid.canPlace(h.id,w.size,1,battle.entities))return h;const near=battle.grid.cells.filter(c=>Math.hypot(c.x-x,c.y-y)<19&&battle.grid.canPlace(c.id,w.size,1,battle.entities));near.sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y));return near[0]||h;}
function boardInputBlocked(event){return !!document.elementFromPoint(event.clientX,event.clientY)?.closest('#combat-deck,.emote-tray,.emote-toggle,.arena-result,.modal-backdrop,.arena-camera-controls,.time-token-control');}
function pointerPosition(event){return renderer?.screenToWorld(event.clientX,event.clientY)||null;}
function updateHover(h){if(!h||selected<0||!canAffordHandCard(battle,selected)){if(renderer)renderer.hover=null;return;}hoverId=h.id;const id=battle.sides[1].queue[selected],w=stats(id,battle.sides[1].levels[id]);renderer.hover={id:h.id,size:w.size,kind:w.kind,range:w.range,valid:battle.grid.canPlace(h.id,w.size,1,battle.entities)&&battle.sides[1].energy>=battle.cost(1,id)};}
function deployAt(h){if(selected<0||!h||battle.paused||battle.winner)return;const id=battle.sides[1].queue[selected],w=CATALOG[id];if(battle.deploy(1,selected,h.id)){playerDeployments++;if(guidedBattle&&!save.tutorial){save.tutorial=true;persist();}selected=-1;renderer.hover=null;updateHUD(true);const hand=document.querySelector('#hand');if(!save.settings.reduced){hand.classList.remove('redrawing');void hand.offsetWidth;hand.classList.add('redrawing');clearTimeout(hand._redrawTimer);hand._redrawTimer=setTimeout(()=>hand.classList.remove('redrawing'),400);}}else{toast(battle.sides[1].energy<battle.cost(1,id)?t('energyLow'):t('invalid'));sound.play('deny');}}
function selectCard(index,{touch=false}={}){if(!battle||battle.paused||battle.winner)return;if(!Number.isInteger(index)||index<0||index>2)return;if(!canAffordHandCard(battle,index)){selected=-1;renderer.hover=null;toast(t('energyLow'));sound.play('deny');updateHUD(true);syncCameraControls();return;}if(selected===index){selected=-1;renderer.hover=null;updateHUD(true);syncCameraControls();return;}selected=index;if(guidedBattle&&!battle.firstPlayer){const id=battle.sides[1].queue[index],w=CATALOG[id],legal=battle.grid.cells.filter(h=>battle.grid.canPlace(h.id,w.size,1,battle.entities));legal.sort((a,b)=>a.y-b.y||Math.abs(a.x-WIDTH/2)-Math.abs(b.x-WIDTH/2));if(legal.length)hoverId=legal[Math.min(3,legal.length-1)].id;}const h=battle.grid.cells[hoverId];if(!touch)renderer.ensureVisible(h.x,h.y);updateHUD(true);if(touch)renderer.hover=null;else updateHover(h);syncCameraControls();}
function bindBoard(){
 endBoardGesture();const board=document.querySelector('#board');
 board.addEventListener('hex:camera-change',syncCameraControls);
 board.addEventListener('contextmenu',e=>{if(renderer?.camera.enabled)e.preventDefault();});
 board.addEventListener('pointerdown',e=>{
  if(battle.paused||battle.winner||boardInputBlocked(e))return;
  if(renderer?.camera.enabled&&(e.button===1||e.button===2||e.button===0&&selected<0)){
   e.preventDefault();board.focus({preventScroll:true});boardGesture={id:e.pointerId,x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,dragging:false,board};board.setPointerCapture(e.pointerId);return;
  }
  if(e.button!==0)return;e.preventDefault();board.focus({preventScroll:true});const p=pointerPosition(e);if(p)updateHover(findPlacement(p.x,p.y));
 });
 board.addEventListener('lostpointercapture',e=>{if(boardGesture?.id===e.pointerId)endBoardGesture();});
 syncCameraControls();
}
function endBoardGesture(){const gesture=boardGesture;boardGesture=null;gesture?.board.parentElement?.classList.remove('is-panning');if(gesture?.board.hasPointerCapture(gesture.id))gesture.board.releasePointerCapture(gesture.id);}
function refreshCameraHover(){if(selected>=0)updateHover(battle.grid.cells[hoverId]);syncCameraControls();}
document.addEventListener('pointerdown',e=>{if(adSession.busy||platform.adBusy)return;const el=e.target.closest('[data-action="handCard"]');if(el){endBoardGesture();e.preventDefault();sound.unlock();selectCard(Number(el.dataset.id),{touch:e.pointerType==='touch'});}});
document.addEventListener('pointermove',e=>{
 if(boardGesture?.id===e.pointerId){if(screen!=='combat'||battle.paused||battle.winner){endBoardGesture();return;}if(!boardGesture.dragging&&Math.hypot(e.clientX-boardGesture.startX,e.clientY-boardGesture.startY)<4)return;boardGesture.dragging=true;boardGesture.board.parentElement.classList.add('is-panning');renderer.panBy(e.clientX-boardGesture.x,e.clientY-boardGesture.y);boardGesture.x=e.clientX;boardGesture.y=e.clientY;return;}
 if(screen!=='combat'||selected<0||battle.paused)return;if(boardInputBlocked(e)){if(renderer)renderer.hover=null;return;}const p=pointerPosition(e);if(p)updateHover(findPlacement(p.x,p.y));else if(renderer)renderer.hover=null;
});
document.addEventListener('pointerup',e=>{
 try{
  if(boardGesture?.id===e.pointerId){endBoardGesture();return;}
  if(e.button!==0||screen!=='combat'||selected<0||battle.paused||document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-action="handCard"]')||boardInputBlocked(e))return;
  const p=pointerPosition(e);if(p)deployAt(findPlacement(p.x,p.y));
 }finally{if(e.pointerType==='touch'&&renderer)renderer.hover=null;}
});
document.addEventListener('pointercancel',e=>{endBoardGesture();if(e.pointerType==='touch'&&renderer)renderer.hover=null;});
function updateHUD(force=false){if(!battle||screen!=='combat')return;const s=battle.sides[1],stamp=s.queue.slice(0,3).join(',');if(stamp!==hudStamp||!document.querySelector('#hand').children.length){hudStamp=stamp;document.querySelector('#hand').innerHTML=s.queue.slice(0,3).map((id,i)=>'<button class="hand-card '+CATALOG[id].rarity+' '+(i===selected?'selected ':'')+(s.energy<battle.cost(1,id)?'unaffordable':'')+'" data-action="handCard" data-id="'+i+'" aria-label="'+esc(label(CATALOG[id]))+'" aria-pressed="'+(i===selected)+'">'+energyBadge(id,battle.cost(1,id))+art(id)+'<b>'+esc(label(CATALOG[id]))+'</b><small>'+t('level')+' '+s.levels[id]+'</small><kbd>'+(i+1)+'</kbd></button>').join('');document.querySelector('#place-hint').textContent=selected>=0&&s.queue[selected]==='flak'?tr('The ring shows your air-defense zone','الحلقة توضّح مجال حماية مضاد الطيران'):t(selected>=0?'place':'select');}
document.querySelectorAll('.hand-card').forEach((el,i)=>{el.classList.toggle('selected',i===selected);el.classList.toggle('unaffordable',s.energy<battle.cost(1,s.queue[i]));el.setAttribute('aria-pressed',String(i===selected));});document.querySelector('#place-hint').textContent=selected>=0&&s.queue[selected]==='flak'?tr('The ring shows your air-defense zone','الحلقة توضّح مجال حماية مضاد الطيران'):t(selected>=0?'place':'select');
document.querySelector('#blue-score').textContent=(battle.grid.counts[1]/10).toFixed(1)+'%';document.querySelector('#red-score').textContent=(battle.grid.counts[2]/10).toFixed(1)+'%';for(const [key,i] of [['blue',1],['neutral',0],['red',2]])document.querySelector('#'+key+'-bar').style.width=battle.grid.counts[i]/10+'%';const time=Math.max(0,Math.ceil(battle.limit-battle.elapsed));document.querySelector('#clock').textContent=battle.phase==='sudden'?'∞':Math.floor(time/60)+':'+String(time%60).padStart(2,'0');document.querySelector('#clock').classList.toggle('urgent',time<=30);document.querySelector('#phase-label').textContent=guidedBattle&&battle.phase==='normal'?tr('First battle','النزال الأول'):t(battle.phase==='normal'?'battle':battle.phase);const timeControl=document.querySelector('.time-token-control');if(timeControl){timeControl.hidden=save.battleSupplies.tokens<1||battle.timeExtensions>0||battle.phase==='sudden';timeControl.disabled=platform.saveBlocked||!battle.canExtendTime();}const energyPips=document.querySelector('#energy-pips');if(!energyPips.children.length)energyPips.innerHTML='<i></i>'.repeat(10);for(let i=0;i<10;i++){const fill=Math.round(Math.max(0,Math.min(1,s.energy-i))*100)+'%';if(energyPips.children[i].style.getPropertyValue('--fill')!==fill)energyPips.children[i].style.setProperty('--fill',fill);}document.querySelector('#energy-number').textContent=Math.floor(s.energy)+'/10';updateQuickChargeHUD();
const cue=document.querySelector('#board-cue'),a=battle.arena;cue.textContent=guidedBattle?(battle.firstPlayer?(battle.elapsed<14?tr('Capture more hexes than your rival. Energy refills automatically.','احتل سداسيات أكثر من منافسك. تتجدد الطاقة تلقائيًا.'):''):selected>=0&&s.energy<battle.cost(1,s.queue[selected])?tr('Energy is refilling. Wait for this card to light up, or choose a cheaper one.','تتجدد الطاقة. انتظر إضاءة هذا الكرت أو اختر سلاحًا أقل تكلفة.'):selected<0?tr('1 · Drag a weapon card onto your BLUE starting area.','١ · اسحب كرت سلاح وضعه في منطقتك الزرقاء الأساسية.'):tr('2 · Release on empty BLUE ground to deploy. Tapping also works.','٢ · أفلت السلاح فوق أرض زرقاء فارغة لنشره. يمكنك أيضًا النقر.')):(!battle.firstPlayer&&battle.elapsed<7?t('howControls'):'');cue.hidden=!cue.textContent;cue.classList.toggle('coach-cue',guidedBattle);document.querySelector('.battle-screen').classList.toggle('learning-placement',guidedBattle&&!battle.firstPlayer);updateCombatDeck();syncCameraControls();}
function finishBattle(){
 if(endingBattle||battle.rewardSettled)return;
 battle.rewardSettled=true;endingBattle=true;selected=-1;
 if(renderer)renderer.hover=null;
 hideCombatDeck();closeModal();
 const won=battle.winner===1,wasTutorial=guidedBattle,levelBefore=currentLevel(save),settledBattle=battle,settledRenderer=renderer;
 resultEmote=social?.result(won);
 platform.event('gameplayStop');
 sound.play(won?'win':'defeat');
 makeResult(save,won,battle.reason,battle.grid.counts,enemy.trophies,Math.random,{stageIndex:battle.arena.level-1});
 if(won&&currentLevel(save)>levelBefore)platform.event('happytime');
 const completedAt=Date.now();
 recordMissionBattle(save,{id:activeBattleId,elapsed:battle.elapsed,reason:battle.reason,deployments:playerDeployments,completedAt},completedAt);
 stageIndex=preferredLobbyStage();persist();
 const r=save.pending;
 const isCurrent=()=>screen==='combat'&&endingBattle&&battle===settledBattle&&renderer===settledRenderer;
 let resultScene=null;
 const transition=createMatchResultTransition({platform,sound,tutorial:wasTutorial,isCurrent,continueToResult:()=>{
  resultScene?.classList.add('departing');
  setTimeout(()=>{
   if(!isCurrent())return;
   renderer?.destroy();renderer=null;screen='outcome';endingBattle=false;sound.inBattle=false;render();
  },save.settings.reduced?0:180);
 }});
 const showResultAnimation=()=>{
  if(!isCurrent()||resultScene)return;
  const scene=document.createElement('div');resultScene=scene;
  scene.className='arena-result '+(won?'won':'lost');
  scene.setAttribute('role','status');
  scene.innerHTML='<div class="arena-result-rays"></div><div class="arena-result-copy">'+rewardArt(won?6:8)+'<h1>'+t(won?'victory':'defeat')+'</h1><p>'+tr(won?'The battlefield is yours!':'A new strategy. A new chance.',won?'الميدان لك!':'استراتيجية جديدة، وفرصة جديدة.')+'</p><b>'+coin('trophy')+' '+(r.delta>=0?'+':'')+fmt(r.delta)+(r.gold?' <span>·</span> '+coin('gold')+' +'+fmt(r.gold):'')+'</b></div><div class="arena-transition"><i></i><small>'+tr('Gathering your supplies…','نجمع إمداداتك…')+'</small></div>';
  document.querySelector('.battle-screen').append(scene);
  victoryEffect?.cleanup({restoreWeapons:false});victoryEffect=null;
  if(won)rewardSparkles(scene,'gold',12);
  void transition();
 };
 if(won&&renderer){
  try{
   victoryEffect=playVictoryHarvest({battle,renderer,container:document.querySelector('.battle-screen'),coinHTML:coin('gold'),reducedMotion:save.settings.reduced,rewardLabel:'+'+fmt(r.gold)+' '+t('gold')});
   victoryEffect.finished.then(showResultAnimation,showResultAnimation);
  }catch(error){
   console.warn('Victory animation unavailable',error);
   victoryEffect?.cleanup();victoryEffect=null;showResultAnimation();
  }
 }else showResultAnimation();
}
function rewardSparkles(parent,kind='star',count=14){if(save.settings.reduced)return;const layer=document.createElement('div');layer.className='reward-sparks';layer.setAttribute('aria-hidden','true');layer.innerHTML=Array.from({length:count},(_,i)=>'<i style="--sx:'+((i*137.5)%100)+'%;--drift:'+((i%2?1:-1)*(30+i*6))+'px;--delay:'+(i%5*90)+'ms;--spin:'+(i*53)+'deg">'+(kind==='gold'?coin('gold'):'✦')+'</i>').join('');parent.append(layer);setTimeout(()=>layer.remove(),2700);}
function celebrate(id,kind='upgrade'){document.querySelector('.reward-feedback')?.remove();const el=document.createElement('aside');el.className='reward-feedback '+kind;el.setAttribute('role','status');el.innerHTML='<span class="feedback-art">'+art(id)+'</span><span><b>'+tr(kind==='new'?'NEW WEAPON!':kind==='boost'?'POWER BOOST!':'LEVEL UP!',kind==='new'?'سلاح جديد!':kind==='boost'?'تعزيز القوة!':'ترقية ناجحة!')+'</b><small>'+esc(label(CATALOG[id]))+' · '+t('level')+' '+save.cards[id].level+'</small></span>';app.append(el);rewardSparkles(el);sound.play(kind==='new'?'newWeapon':kind==='boost'?'boost':'upgrade');setTimeout(()=>el.remove(),2300);}
function pauseBattle(){
 if(!battle||battle.paused||battle.winner||endingBattle||screen!=='combat')return false;
 battle.paused=true;platform.event('gameplayStop');
 sound.inBattle=true;sound.sync();modal='pause';
 openModal('<h2>'+t('paused')+'</h2>'+btn('resume',t('resume'),'green wide')+btn('settings',t('settings'),'quiet wide')+btn('surrender',t('surrender'),'quiet wide')+'<p class="muted">'+t('quitHelp')+'</p>','pause-modal');
 return true;
}
function resumeBattle(){
 if(!battle||!battle.paused||battle.winner||endingBattle||screen!=='combat'||document.hidden||runtimeFault||adSession.busy||platform.adBusy)return false;
 closeModal();battle.paused=false;sound.inBattle=true;sound.sync();
 lastFrame=performance.now();accumulator=0;platform.event('gameplayStart');
 return true;
}
async function openSupplyPack(kind,{stageIndex:idx=0,slot=0,tier=0}={}){
 return withSaveLock(()=>{
  if(!refreshProgress()){syncSaveNotice();toast(t('saveError'));return false;}
  if(save.pendingPack){showPack(save.pendingPack,save.pendingPack.tier);return false;}
  const candidate=structuredClone(save);let result;
  if(kind==='stage')result=claimStagePack(candidate,idx,slot);
  else if(kind==='purchase'){
   if(!Number.isInteger(tier)||tier<0||tier>2)return false;
   const cost=[100,200,500][tier];if(candidate.gems<cost){toast(t('notEnough'));return false;}candidate.gems-=cost;result={...openPack(candidate,tier),tier};candidate.pendingPack=result;
  }else{
   if(candidate.packs<1){toast(t('packHelp'));return false;}candidate.packs--;tier=candidate.packCycle%5===4?2:0;candidate.packCycle++;result={...openPack(candidate,tier),tier};candidate.pendingPack=result;
  }
  if(!result)return false;
  candidate.pendingPack.revealId=globalThis.crypto?.randomUUID?.()||Date.now()+'-'+Math.random().toString(36).slice(2);
  if(!platform.save(candidate)){syncSaveNotice();toast(t('saveError'));return false;}
  save=candidate;showPack(save.pendingPack,save.pendingPack.tier);return true;
 });
}
function packRevealKey(pack){return pack?pack.revealId||JSON.stringify([pack.stageIndex,pack.slot,pack.tier,pack.gold,pack.cards]):null;}
async function finishPack(){const revealKey=packRevealKey(save.pendingPack);return withSaveLock(()=>{
 if(!refreshProgress()){syncSaveNotice();toast(t('saveError'));return false;}
 if(packRevealKey(save.pendingPack)!==revealKey){if(save.pendingPack)showPack(save.pendingPack,save.pendingPack.tier);else{screen=packReturn==='pack'?'battle':packReturn;render();}return false;}
 const candidate=structuredClone(save);candidate.pendingPack=null;
 if(!platform.save(candidate)){syncSaveNotice();toast(t('saveError'));return false;}
 save=candidate;screen=packReturn==='pack'?'battle':packReturn;if(screen==='battle')stageIndex=preferredLobbyStage();closeModal();render();return true;
});}
function showPack(result,tier=0){if(!save.pendingPack)return;if(screen!=='pack')packReturn=screen;packPhase='sealed';screen='pack';closeModal();render();setTimeout(tearPack,120);}

function packScreen(){const p=save.pendingPack;if(!p)return lobby();const cards=[];for(const c of p.cards){const old=cards.find(v=>v.id===c.id);if(old){old.amount+=c.amount;old.isNew||=c.isNew;}else cards.push({...c});}return '<section class="pack-page"><div class="pack-opening '+(packPhase==='revealed'?'revealed':'sealed')+'">'+(packPhase==='revealed'?'<div class="burst-reward">'+rewardArt(7)+'</div><h2>'+t('packOpened')+'</h2><b class="gold-total">'+coin('gold')+' +'+p.gold+'</b><div class="pack-result-cards">'+cards.map((c,i)=>'<div class="pack-reward" style="--delay:'+i*100+'ms">'+art(c.id)+'<b>'+esc(label(CATALOG[c.id]))+'</b><strong>+'+c.amount+'</strong>'+(c.isNew?'<small>'+t('newWeapon')+'</small>':'')+'</div>').join('')+'</div>'+btn('packDone',t('continue'),'green wide'):'<h2>'+tr('YOUR SUPPLY PACK','باكيج الإمدادات')+'</h2><p>'+tr('Breaking the seal…','جارٍ فتح الغلاف…')+'</p><div class="physical-pack"><span class="pack-aura"></span><span class="foil-body">'+rewardArt(p.tier)+'</span><span class="foil-tear">'+rewardArt(p.tier)+'</span><span class="tear-line"></span></div>')+'</div></section>';}

function changeStage(delta){if(stageMoving)return;const next=Math.max(0,Math.min(14,stageIndex+delta));if(next===stageIndex)return;stageMoving=true;stageRewardKey=null;const old=document.querySelector('.stage-art');old?.classList.add(delta>0?'slide-out-left':'slide-out-right');setTimeout(()=>{stageIndex=next;if(screen==='battle'){render();const image=document.querySelector('.stage-art'),cls=delta>0?'slide-in-left':'slide-in-right';image?.classList.add(cls);setTimeout(()=>image?.classList.remove(cls),400);}stageMoving=false;},save.settings.reduced?0:260);}
function showEmote(owner,id){const el=document.querySelector(owner===1?'#player-emote':'#rival-emote'),e=EMOTES.find(v=>v.id===id);if(!el||!e)return;el.textContent=e.icon;el.setAttribute('aria-label',tr(e.en,e.ar));el.classList.remove('show');void el.offsetWidth;el.classList.add('show');clearTimeout(el._hide);el._hide=setTimeout(()=>el.classList.remove('show'),3200);}
function tearPack(){const p=save.pendingPack,box=document.querySelector('.pack-opening');if(screen!=='pack'||!p||!box||box.classList.contains('opening')||packPhase==='revealed')return;box.classList.add('opening');sound.play('pack');setTimeout(()=>{if(screen!=='pack'||packRevealKey(save.pendingPack)!==packRevealKey(p))return;sound.play(p.cards.some(c=>c.isNew)?'newWeapon':'win');packPhase='revealed';render();rewardSparkles(document.querySelector('.pack-opening'));},save.settings.reduced?100:1150);}

function supplyContext(){return {tr,btn,art,esc,label,coin,fmt,platform};}
function prepareMatch(){
 if(screen==='match'||screen==='combat'||adSession.busy||platform.adBusy)return;
 startMatch();
}
function showUpgradeHelp(id){modal='upgradeHelp';detailId=id;openModal(upgradeHelpPanel(save,id,supplyContext()),'upgrade-help-modal');updateSupplyTimers();}
function showCoreHelp(){modal='coreHelp';openModal('<h2>'+tr('Get 5 boost cores','احصل على 5 نوى تعزيز')+'</h2><p>'+tr('Optional video reward. Use cores to boost weapons after a battle.','مكافأة فيديو اختيارية. استخدم النوى لتعزيز الأسلحة بعد المعركة.')+'</p>'+marketSupply('ad','adBoost5'),'core-help-modal');}
function refreshRewardModal(){if(modal==='missions')showMissions();else if(modal==='upgradeHelp')showUpgradeHelp(detailId);else if(modal==='coreHelp')showCoreHelp();}
function timeCombatControl(){return save.battleSupplies.tokens>0&&battle?.timeExtensions===0?'<button class="time-token-control" data-action="useTime" title="'+tr('Use 1 Time Coin · once per battle','استخدم عملة وقت واحدة · مرة لكل معركة')+'" '+(platform.saveBlocked?'disabled':'')+'>'+timeIcon()+' <b>+15s</b><small>×'+save.battleSupplies.tokens+'</small></button>':'';}
function updateQuickChargeHUD(){
 const button=document.querySelector('.quick-charge-control button');if(!button)return;
 const points=save.quickCharge.points,room=battle?.canAddEnergy(1,1);
 document.querySelector('#quick-charge-count').textContent=fmt(points);
 document.querySelector('#quick-charge-action').textContent=points?(room?tr('+1 energy','+1 طاقة'):tr('Deploy first','انشر أولًا')):tr('Get in Shop','من المتجر');
 button.disabled=quickChargeBusy||!!battle?.paused||!!battle?.winner||(points>0&&(platform.saveBlocked||!room));
 button.setAttribute('aria-label',tr('Quick Charge: '+points+' stored points. '+(points?'Use 1 point for +1 energy.':'Get points in Shop between battles.'),'الشحن السريع: '+points+' نقطة محفوظة. '+(points?'استخدم نقطة لتحصل على +1 طاقة.':'اجمع النقاط من المتجر بين النزالات.')));
}
function quickChargeHelp(){
 pauseBattle();modal='quickChargeHelp';
 openModal('<h2>'+tr('Quick Charge','الشحن السريع')+'</h2><p>'+tr('Save points in Shop → Quick Charge between battles. Each completed optional ad adds 5 stored points.','اجمع النقاط بين النزالات من المتجر ← الشحن السريع. كل إعلان اختياري مكتمل يضيف 5 نقاط محفوظة.')+'</p><p>'+tr('Use this button to spend 1 point for +1 energy and deploy a weapon sooner. Energy keeps refilling for free; the battle limit stays 10.','استخدم هذا الزر لإنفاق نقطة مقابل +1 طاقة ونشر سلاح أسرع. تتجدد الطاقة مجانًا ويبقى حد طاقة النزال 10.')+'</p>'+btn('resume',tr('Continue battle','متابعة النزال'),'blue wide'),'quick-charge-help');
}
async function useQuickCharge(){
 if(quickChargeBusy||screen!=='combat'||battle?.paused||battle?.winner)return;
 if(!save.quickCharge.points){quickChargeHelp();return;}
 const active=battle;quickChargeBusy=true;updateQuickChargeHUD();
 try{await withSaveLock(()=>{
  if(screen!=='combat'||battle!==active||!active.canAddEnergy(1,1)||!refreshProgress())return;
  const candidate=structuredClone(save);if(!spendQuickCharge(candidate))return;
  // No asynchronous gap between the durable debit and the simulation credit.
  if(!platform.save(candidate)){syncSaveNotice();toast(t('saveError'));return;}
  save=candidate;active.addEnergy(1,1);sound.play('boost');
 });}finally{quickChargeBusy=false;updateHUD(true);}
}
function updateSupplyTimers(){
 if(document.hidden||adSession.busy)return;
 const charge=quickChargeOffer(save),chargeButton=document.querySelector('[data-quick-charge-ad]'),chargeWait=document.querySelector('#quick-charge-wait');
 if(chargeButton)chargeButton.disabled=platform.saveBlocked||!platform.adsEnabled||!charge.available||rewardFlowBusy;
 if(chargeWait)chargeWait.textContent=charge.remaining?tr('Ready in '+Math.ceil(charge.remaining/1000)+'s','متاح بعد '+Math.ceil(charge.remaining/1000)+'ث'):tr('No daily limit. One minute between videos; ads depend on availability.','دون حد يومي. دقيقة بين الإعلانات؛ عرضها حسب التوفر.');
 const offer=timeSupplyOffer(save),restock=document.querySelector('#time-restock');
 if(restock)restock.textContent=offer.full?tr('Pouch full','مخزونك ممتلئ'):tr('Gold: ','الذهب: ')+(offer.gold.remaining?timeLabel(offer.gold.remaining):tr('ready','جاهز'))+' · '+tr('Ad: ','الإعلان: ')+(offer.ad.remaining?timeLabel(offer.ad.remaining):tr('ready','جاهز'));
 document.querySelectorAll('[data-time-offer]').forEach(el=>{el.disabled=platform.saveBlocked||!offer[el.dataset.timeOffer]?.available||(el.dataset.timeOffer==='gold'?!offer.affordable:!platform.adsEnabled);});
 for(const el of document.querySelectorAll('[data-upgrade-help]')){const help=upgradeSupport(save,el.dataset.upgradeHelp);el.disabled=platform.saveBlocked||!platform.adsEnabled||!help.available;el.innerHTML=rewardedAdIcon()+(help.remaining?timeLabel(help.remaining):tr('Watch ad · +'+fmt(help.amount)+' gold','شاهد إعلانًا · +'+fmt(help.amount)+' ذهب'));}
}
async function commitSupply(mutate,onComplete){
 let receipt=null;
 await withSaveLock(()=>{if(!refreshProgress())return;const candidate=structuredClone(save);receipt=mutate(candidate);if(!receipt)return;if(!platform.save(candidate)){receipt=null;toast(t('saveError'));return;}save=candidate;});
 if(receipt){render();updateSupplyTimers();onComplete?.(receipt);}return receipt;
}
async function useTimeCoin(){
 const active=battle;
 await withSaveLock(()=>{
  if(screen!=='combat'||battle!==active||!active?.canExtendTime()||!refreshProgress())return;
  const candidate=structuredClone(save);if(!spendTimeToken(candidate))return;
  if(!platform.save(candidate)){toast(t('saveError'));return;}
  save=candidate;active.extendTime();updateHUD(true);sound.play('boost');toast(tr('+15 seconds added','أُضيفت 15 ثانية'));
 });
}
async function runAd(onSuccess,onComplete,canRequest=()=>true){
 if(rewardFlowBusy||adSession.busy||screen==='combat'||screen==='match'||platform.saveBlocked)return false;
 rewardFlowBusy=true;try{
 if(!await withSaveLock(()=>refreshProgress())){toast(t('saveError'));return false;}if(!canRequest(save)){render();refreshRewardModal();return false;}
 const ok=await adSession.request(tr('Preparing your ad…','جارٍ تجهيز الإعلان…'));
 let receipt=null;
 if(ok)await withSaveLock(()=>{
  if(!refreshProgress())return;
  const candidate=structuredClone(save);receipt=onSuccess(candidate);
  if(!receipt)return;
  // Retain an earned reward in memory if storage fails, so Retry Save can preserve it.
  save=candidate;if(!platform.save(candidate)){receipt=null;toast(t('saveError'));}
 });
 render();refreshRewardModal();updateSupplyTimers();
 if(receipt)onComplete?.(receipt);
 else if(!ok)toast(platform.lastAdError==='adsDisabledBasicLaunch'?tr('Ads are disabled by CrazyGames for this build','الإعلانات معطّلة من CrazyGames لهذه النسخة'):t('noAd'));
 return !!receipt;
 }finally{rewardFlowBusy=false;}
}

const actions={
 retryQuickChargeSave:async()=>{await withSaveLock(()=>{if(persist()){render();toast(tr("Points saved","تم حفظ النقاط"));}});},
 useQuickCharge,
 adQuickCharge:async()=>{if(screen!=='shop')return;await runAd(candidate=>grantQuickCharge(candidate,{adCompleted:true}),()=>{sound.play('boost');toast(tr('+5 Quick Charge points saved','حُفظت +5 نقاط شحن سريع'));},current=>screen==='shop'&&quickChargeOffer(current).available);},
 retryAds:async()=>{if(await platform.retryAds()){render();refreshRewardModal();toast(tr('Ready to request a video','يمكنك طلب الفيديو الآن'));}else{render();refreshRewardModal();toast(tr('Ad service is still unavailable. Check the notice.','خدمة الإعلانات ما زالت غير متاحة. راجع التنبيه.'));}},
 
 battleAd:async el=>{if(screen!=='shop'||battleSupplyOffer(save).pending)return;const kind=el.dataset.id;await runAd(candidate=>armBattleSupply(candidate,kind,{adCompleted:true}),()=>{sound.play('boost');toast(tr('Bonus saved for your next battle','حُفظت المكافأة لمعركتك التالية'));});},
 buyTime:()=>commitSupply(candidate=>acquireTimeToken(candidate,'gold'),()=>{sound.play('boost');toast(tr('Time Coin added · +15s ready','أُضيفت عملة وقت · +15 ثانية جاهزة'));}),
 adTime:async()=>{if(!timeSupplyOffer(save).ad.available)return;await runAd(candidate=>acquireTimeToken(candidate,'ad',{adCompleted:true}),()=>{sound.play('boost');toast(tr('Time Coin added','أُضيفت عملة وقت'));});},
 useTime:useTimeCoin,
 masteryInfo:()=>{const c=save.cards[detailId];openModal('<h2>'+tr('Mastery','الإتقان')+'</h2><div class="mastery-panel">'+art(detailId)+'<h2>'+Math.round(boostFraction(c)*100)+'%</h2><p>'+tr('Use one core per weapon after each match. Progress carries over.','استخدم نواة لكل سلاح بعد كل نزال. التقدم محفوظ.')+'</p>'+coin('cores')+' <b>'+save.cores+'</b>'+(save.cores<1?btn('coreHelp',tr('Get 5 boost cores','احصل على 5 نوى تعزيز'),'blue small'):'')+'</div>');},
 coreHelp:showCoreHelp,
 upgradeShop:()=>{closeModal();navigate('shop');},
 upgradeGold:async el=>{const id=el.dataset.id;if(!upgradeSupport(save,id).available)return;await runAd(candidate=>claimUpgradeGold(candidate,id,{adCompleted:true}),receipt=>{sound.play('boost');toast(tr('+'+receipt.gold+' gold added','أُضيف '+receipt.gold+' ذهب'));if(upgradeState(save,id).ready){closeModal();render();}});},
 missions:showMissions,
 claimMission:async el=>{await withSaveLock(()=>{if(!refreshProgress())return;const candidate=structuredClone(save),receipt=claimMission(candidate,el.dataset.id);if(!receipt){render();if(modal==='missions')showMissions();return;}if(!platform.save(candidate)){syncSaveNotice();toast(t('saveError'));return;}save=candidate;render();if(modal==='missions')showMissions();sound.play('boost');});},
 claimMissionDouble:async el=>{
  const id=el.dataset.id,dayKey=missionStatus(save).dayKey;
  const eligible=current=>{const status=missionStatus(current);return status.dayKey===dayKey&&status.goals.some(goal=>goal.id===id&&goal.ready);};
  if(!platform.adsEnabled||!eligible(save))return;
  await runAd(candidate=>eligible(candidate)&&claimMissionDouble(candidate,id,{adCompleted:true}),()=>{
   sound.play('boost');toast(tr('Double mission reward claimed!','تم استلام مكافأة المهمة المضاعفة!'));
  },eligible);
 },
 nextBattle:()=>completeResult(true),
 recoverBattle:()=>{if(recovering)return;recovering=true;try{runtimeFault=false;closeModal();if(battle&&!battle.winner){screen='combat';battle.paused=false;lastFrame=performance.now();accumulator=0;render();platform.event('gameplayStart');}else{sound.inBattle=false;sound.endSearch();screen=save.pending&&!save.pending.summarySeen?'outcome':save.pending?.offerStatus==='pending'?'offer':'battle';render();}}catch(e){handleRuntimeError(e);}finally{recovering=false;}},
 reloadGame:()=>location.reload(),
 deploymentShop:()=>{navigate('shop');scrollShopTo('deployment');},
 buyDeployment:async el=>{const type=el.dataset.id;await withSaveLock(()=>{if(!refreshProgress()){render();toast(t('saveError'));return;}const candidate=JSON.parse(JSON.stringify(save));const receipt=purchaseDeployment(candidate,type);if(!receipt){render();return;}if(!platform.save(candidate)){render();toast(t('saveError'));return;}save=candidate;render();sound.play('boost');toast(tr(type==='permanent'?'Permanent deployment upgrade purchased':'Next-battle deployment pass is ready',type==='permanent'?'تم شراء تخفيض النشر الدائم':'تخفيض النشر جاهز للمعركة التالية'));});},
 retrySave:()=>location.reload(),
 claimDaily:async()=>{if(platform.saveBlocked)return;const collect=()=>{if(platform.saveError&&!persist())return;const latest=platform.load();if(platform.saveBlocked){syncSaveNotice();return;}save=playerSave(latest||save);const candidate=JSON.parse(JSON.stringify(save));const receipt=claimDaily(candidate);if(!receipt){save=candidate;render();return;}if(!platform.save(candidate)){render();toast(t('saveError'));return;}save=candidate;sound.play('boost');render();toast(tr('Day '+receipt.rewardDay+' reward collected!','تم استلام جائزة اليوم '+receipt.rewardDay+'!'));rewardSparkles(document.querySelector('.login-rewards')||app,'gold');};await withSaveLock(collect);if(modal==='dailyGift')dailyGiftModal();},
 marketJump:el=>scrollShopTo(el.dataset.id),
 market:async el=>{const id=el.dataset.id,o=marketOffers(save).find(v=>v.id===id);if(!o?.available)return;const feedback=()=>{sound.play('boost');toast(t('bought'));rewardSparkles(app);};if(o.type==='ad'){if(!platform.adsEnabled)return;await runAd(candidate=>claimMarket(candidate,id,{adCompleted:true}),feedback);}else if(claimMarket(save,id)){persist();render();feedback();}},
 roadClaim:el=>claimRoadReward(el.dataset.id),
 claimNextRoad:()=>claimRoadReward(),
 stagePack:el=>openSupplyPack('stage',{stageIndex:Number(el.dataset.stage),slot:Number(el.dataset.slot)}),

 combatDeck:el=>{if(endingBattle)return;const owner=Number(el.dataset.id);if(combatDeckOwner===owner)return hideCombatDeck();hideCombatDeck();combatDeckOwner=owner;el.setAttribute('aria-expanded','true');updateCombatDeck();},
 hideCombatDeck,
 stageReward:async el=>{const reward=stageRoad(save,stageIndex).rewards.find(r=>r.id===el.dataset.id);if(!reward||reward.claimed)return;if(!await claimRoadReward(el.dataset.id))toast(tr('Reach '+fmt(reward.localThreshold)+' trophies in this level','اجمع '+fmt(reward.localThreshold)+' كأسًا في هذا المستوى'));},
 unlockDirect:el=>{const id=el.dataset.id;if(unlockWeapon(save,id)){persist();render();celebrate(id,'new');}},
 unlockAd:async el=>{const id=el.dataset.id,o=weaponOffer(save,id);if(!o||save.gems<o.adGems)return;if(o.ads>=o.requiredAds){if(unlockWeapon(save,id,'ads')){persist();render();celebrate(id,'new');}return;}await runAd(candidate=>{if(!creditWeaponAd(candidate,id))return false;unlockWeapon(candidate,id,'ads');return true;},()=>{if(save.cards[id].owned)celebrate(id,'new');});},
 dismissWelcome:()=>{save.welcomeMessage=false;persist();render();},
 detailBack:()=>{screen=detailOrigin;detailSwap=false;render();},
 detailTab:el=>{detailTab=el.dataset.id;swapId=detailTab==='deck'?detailId:null;render();app.querySelector('.scroll-page')?.scrollTo(0,0);app.querySelector('[data-action=detailTab][data-id='+detailTab+']')?.focus({preventScroll:true});},
 inspectPartner:el=>{detailId=el.dataset.id;detailTab='stats';detailSwap=false;render();},
 outcomeContinue:advanceOutcome,
 profile:playerRecordModal,
 openBoost:()=>{if(!save.pending)return;clearTimeout(outcomeTimer);screen=!save.pending.summarySeen?'outcome':save.pending.offerStatus==='pending'?'offer':'result';closeModal();render();},
 avatars:avatarModal,
 chooseAvatar:el=>{if(chooseAvatar(save,Number(el.dataset.id))){save.identity.avatarSource='custom';persist();sound.play('boost');closeModal();render();}},
 choosePortalAvatar:()=>{if(save.identity.kind!=='crazygames'||!portalPictureUrl(portalUser))return;save.identity.avatarSource='crazygames';persist();sound.play('boost');closeModal();render();},

 stage:el=>changeStage(Number(el.dataset.id)),
 tearPack:tearPack,
 packDone:finishPack,
 credits:()=>{openModal('<h2>'+tr('Credits','صنّاع اللعبة')+'</h2><p>HEX Dominion · Original game &amp; artwork</p><p>Baloo Bhaijaan 2 · SIL Open Font License</p><p>“Call to Adventure” Kevin MacLeod (incompetech.com)<br>Licensed under Creative Commons: By Attribution 4.0</p><p><a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a> · <a href="https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1300022" target="_blank" rel="noopener">Music source</a></p><p>'+tr('Soundtrack re-encoded for the web. Local AI opponents.','أُعيد ترميز الموسيقى للويب. الخصوم في هذه اللعبة آليون.')+'</p>');},
 emoteTray:el=>{const tray=document.querySelector('#emote-tray');tray.hidden=!tray.hidden;el.setAttribute('aria-expanded',String(!tray.hidden));},
 emote:el=>{if(social?.player(el.dataset.id,battle.elapsed))showEmote(1,el.dataset.id);document.querySelector('#emote-tray').hidden=true;document.querySelector('.emote-toggle').setAttribute('aria-expanded','false');},
 muteEmotes:el=>{social.muted=!social.muted;if(social.muted)social.pending=null;el.classList.toggle('muted-emotes',social.muted);el.setAttribute('aria-pressed',String(social.muted));toast(tr(social.muted?'Rival emotes muted':'Rival emotes on',social.muted?'تم كتم تعبيرات الخصم':'تعبيرات الخصم مفعّلة'));},
 nav:el=>navigate(el.dataset.id),
 wallet:()=>{navigate('shop');if(screen==='shop'){closeModal();scrollShopTo('videos');}},
 settings:settingsModal,
 gameSelectToggle:el=>{const select=el.closest('.game-select'),options=select.querySelector('.game-select-options');if(options.hidden)openGameSelect(select,true);else closeGameSelects();},
 gameSelectOption:el=>{const select=el.closest('.game-select');if(!select)return;select.dataset.value=el.dataset.value;select.querySelector('.game-select-value').textContent=el.textContent;for(const option of select.querySelectorAll('.game-select-option'))option.setAttribute('aria-selected',String(option===el));closeGameSelects();select.querySelector('.game-select-trigger').focus();},
 close:()=>{if(runtimeFault)return actions.recoverBattle();if(battle?.paused&&screen==='combat')resumeBattle();else closeModal();},
 saveSettings:()=>{const zoom=Number(modalRoot.querySelector('.game-select[data-select="setting-arena-zoom"]').dataset.value);save.settings.arenaZoom=[1,1.25,1.45,1.75,2].includes(zoom)?zoom:1;save.settings.musicVolume=Math.max(0,Math.min(100,Number(document.querySelector('#setting-music-volume').value)));save.settings.lang=modalRoot.querySelector('.game-select[data-select="language"]').dataset.value==='ar'?'ar':'en';for(const key of ['sound','music','motion'])save.settings[key==='motion'?'reduced':key]=document.querySelector('#setting-'+key).checked;persist();closeModal();render();if(screen==='combat'&&battle?.paused)resumeBattle();},
 how:()=>howModal(false),
 play:prepareMatch,
 tutorialStart:()=>{save.tutorial=true;persist();closeModal();startMatch();},
 cancelMatch:()=>{matchToken++;matchSearch.cancel();matchPreview=null;matchReady=false;sound.endSearch();screen='battle';render();},
 card:el=>cardModal(el.dataset.id),
 filter:el=>{filter=el.dataset.id;collectionPage=0;render();},
 collectionPage:el=>{collectionPage=Math.max(0,collectionPage+Number(el.dataset.id));render();},
 dailyGift:dailyGiftModal,
 equip:el=>{swapId=el.dataset.id;detailSwap=true;render();},
 swap:async el=>{if(swapId&&await commitDeckChange(swapId,el.dataset.id))toast(t('swapDone'));swapId=null;detailSwap=false;detailTab='stats';closeModal();render();},
 upgrade:async el=>{const id=el.dataset.id,method=el.dataset.method==='boost'?'boost':'copies',state=upgradeState(save,id);if(!state[method==='boost'?'boostReady':'copiesReady']||state.goldMissing>0){showUpgradeHelp(id);return;}await commitSupply(candidate=>upgradeCard(candidate,id,method),()=>celebrate(id));},
 claim:el=>{if(claim(save,el.dataset.id)){persist();sound.play('boost');closeModal();render();toast(t('bought'));}},
 deal:el=>{const id=el.dataset.id,key='deal-'+Math.floor(Date.now()/86400000)+'-'+id;if(save.claims[key])return;if(save.gold<200)return toast(t('notEnough'));if(!dailyDeals().some(w=>w.id===id))return;save.gold-=200;save.cards[id].copies+=5;save.claims[key]=Date.now();persist();render();toast(t('bought'));},
 exchange:()=>{if(save.gems<100)return toast(t('notEnough'));save.gems-=100;save.gold+=1000;persist();render();sound.play('boost');},
 buyPack:el=>openSupplyPack('purchase',{tier:Number(el.dataset.id)}),
 battlePack:()=>openSupplyPack('inventory'),
 boost:async el=>{const id=el.dataset.id;if(screen!=='result'||save.cores<1){if(save.cores<1)showCoreHelp();return;}await commitSupply(candidate=>boostCard(candidate,id,candidate.pending),()=>celebrate(id,'boost'));},
 resultContinue:()=>completeResult(false),
 pause:pauseBattle,resume:resumeBattle,
 surrender:()=>{battle.surrender();finishBattle();},
 road:()=>{openModal('<h2>'+t('trophyRoad')+'</h2><p>'+t('roadHelp')+'</p>'+roadRows(),'road-modal');},
 levelReward:el=>{if(!claimLevel(save,Number(el.dataset.id)))return;persist();render();if(modalRoot.innerHTML)actions.road();sound.play('boost');},
 matchAd:async()=>{if(screen!=='offer'||save.pending?.offerStatus!=='pending')return;const claimed=await runAd(candidate=>candidate.pending&&claimMatchAd(candidate,candidate.pending,{adCompleted:true}),()=>{sound.play('boost');toast(tr('Battle bonus collected','تم استلام مكافأة النزال'));rewardSparkles(app,'gold');},candidate=>candidate.pending?.offerStatus==='pending');if(claimed){screen='result';render();}},
 matchSkip:declineOffer,
 adGems:()=>{if(remaining(save,'adGems'))return;runAd(candidate=>claimMarket(candidate,'adGems',{adCompleted:true}));}
};
window.addEventListener('wheel',event=>containGameScroll(event,[app,modalRoot]),{passive:false});
document.addEventListener('input',e=>{if(adSession.busy||modal!=='settings')return;const slider=modalRoot.querySelector('#setting-music-volume');if(!slider)return;if(e.target===slider){const value=Math.max(0,Math.min(100,Number(slider.value)));modalRoot.querySelector('#music-volume-value').textContent=value+'%';slider.setAttribute('aria-valuetext',value+'%');sound.musicVolume=value;sound.sync();}else if(e.target.id==='setting-music'){sound.music=e.target.checked;slider.disabled=!sound.music;sound.sync();}});
document.addEventListener('click',e=>{if(adSession.busy||platform.adBusy||rewardFlowBusy)return;const el=e.target.closest('[data-action]');if(!el||el.disabled)return;const action=el.dataset.action;if(action==='card'&&performance.now()<deckDragSuppressUntil){e.preventDefault();return;}if(action==='handCard')return;sound.unlock();sound.play('click');try{const result=actions[action]?.(el);if(result?.catch)result.catch(handleRuntimeError);}catch(error){handleRuntimeError(error);}});
document.addEventListener('click',e=>{if(modal==='settings'&&!e.target.closest('.game-select'))closeGameSelects();});
document.addEventListener('error',e=>{if(e.target instanceof HTMLImageElement&&e.target.classList.contains('portal-picture'))e.target.remove();},true);
document.addEventListener('keydown',e=>{
 if(adSession.busy||platform.adBusy||e.defaultPrevented)return;
 if((e.key==='Enter'||e.key===' ')&&e.target?.matches?.('[data-action=masteryInfo]')){e.preventDefault();actions.masteryInfo();return;}
 const editing=e.target?.closest?.('input,textarea,select,[contenteditable]:not([contenteditable=false])');
 if(e.key==='Escape'||editing||e.altKey||e.ctrlKey||e.metaKey)return;
 const pauseKey=e.key.toLowerCase()==='p',boardTab=e.key==='Tab'&&!e.shiftKey&&(!e.target?.closest?.('button,a,input,select,textarea,[contenteditable]')&&(e.target===document.body||e.target?.id==='board'));
 if(e.repeat&&(pauseKey||boardTab)){e.preventDefault();return;}
 if(modal==='settings'&&handleGameSelectKey(e))return;
 if(modalRoot.innerHTML){if(pauseKey){e.preventDefault();actions.close();return;}if(e.key==='Tab'){const items=[...modalRoot.querySelectorAll('button:not([disabled]),input,select,[tabindex="0"]')].filter(el=>!el.closest('[hidden]')&&el.getClientRects().length),first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}return;}
 // Native button activation must never be interpreted as a board deployment.
 if(screen==='combat'&&(e.key==='Enter'||e.key===' ')&&e.target?.closest?.('button,a,[role=button]')){
  const card=e.target.closest('[data-action="handCard"]');
  if(card){e.preventDefault();if(!e.repeat)selectCard(Number(card.dataset.id));}
  return;
 }
 if(screen==='detail'&&pauseKey){e.preventDefault();actions.detailBack();return;}if(screen==='combat'){if(endingBattle)return;if(pauseKey||boardTab){e.preventDefault();pauseBattle();return;}if(['1','2','3'].includes(e.key)){e.preventDefault();selectCard(Number(e.key)-1);return;}const offsets={ArrowUp:-25,ArrowDown:25,ArrowLeft:-1,ArrowRight:1};if(e.key in offsets){e.preventDefault();hoverId=Math.max(0,Math.min(999,hoverId+offsets[e.key]));const h=battle.grid.cells[hoverId];renderer.ensureVisible(h.x,h.y);updateHover(h);syncCameraControls();}if((e.key==='Enter'||e.key===' ')&&selected>=0){e.preventDefault();deployAt(battle.grid.cells[hoverId]);}}
});
// Every real pause has the same SDK transition. Focus/visibility restoration
// leaves the pause menu open; only an explicit resume restarts gameplay.
document.addEventListener('visibilitychange',()=>{sound.muteHidden(document.hidden);if(document.hidden)pauseBattle();else{lastFrame=performance.now();accumulator=0;}});
window.addEventListener('blur',()=>{endBoardGesture();pauseBattle();});
setInterval(()=>{if(document.hidden||adSession.busy||platform.adBusy)return;updateSupplyTimers();const mission=document.querySelector('[data-mission-day]');if(mission&&Number(mission.dataset.missionDay)!==Math.floor(Date.now()/86400000)){if(modal==='missions')showMissions();if(['battle','rewards','result','outcome'].includes(screen))render();}const daily=document.querySelector('[data-daily-day]');if(daily&&Number(daily.dataset.dailyDay)!==Math.floor(Date.now()/86400000)){if(modal==='dailyGift'){dailyGiftModal();return;}if(screen==='rewards'){render();return;}}if(!document.querySelector('[data-market-timer],[data-timer]'))return;for(const o of marketOffers(save)){for(const el of document.querySelectorAll('[data-market-timer="'+o.id+'"]')){const allowed=o.type!=='ad'||platform.adsEnabled;const disabled=!allowed||!o.available;if(el.disabled!==disabled)el.disabled=disabled;const html=marketOfferButtonLabel(o,allowed);if(el.innerHTML!==html)el.innerHTML=html;const stock=document.querySelector('[data-market-stock="'+o.id+'"]');if(stock&&o.stockLeft!=null){const text=tr(o.stockLeft+' left today','باقي اليوم: '+o.stockLeft);if(stock.textContent!==text)stock.textContent=text;}}}document.querySelectorAll('[data-timer]').forEach(el=>{const key=el.dataset.timer,ms=remaining(save,key);if(el.disabled!==(ms>0))el.disabled=ms>0;if(key!=='adGems'){const text=timeLabel(ms);if(el.textContent!==text)el.textContent=text;}el.classList.toggle('disabled-look',ms>0);});},1000);
let hudTime=0,renderTime=0;
function frame(time){requestAnimationFrame(frame);if(runtimeFault)return;try{if(document.hidden||adSession.busy||platform.adBusy){lastFrame=time;accumulator=0;return;}const delta=lastFrame?Math.min(.1,(time-lastFrame)/1000):0;lastFrame=time;if(screen==='combat'&&battle){if(guidedBattle&&!battle.firstPlayer)battle.chargeEnergy(delta);if(!battle.paused&&!battle.winner&&!(guidedBattle&&!battle.firstPlayer)){accumulator+=delta;while(accumulator>=1/60){battle.step(1/60);accumulator-=1/60;}if(battle.winner){finishBattle();return;}}if(!battle.paused||time-renderTime>=250){renderer?.draw(battle,save.settings.reduced?0:time);renderTime=time;}if(time-hudTime>90){updateHUD();hudTime=time;}const events=battle.events.splice(0);if(!battle.paused){const reaction=social?.tick(battle,events);if(reaction)showEmote(2,reaction);}for(const event of events){if(event.type==='deploy')sound.playDeploy(event.id||event.weaponId);else if(['blast','laser','destroy'].includes(event.type))sound.play(event.type);}}
 }catch(error){handleRuntimeError(error);}
}
const welcomeAdded=!platform.saveError&&claimWelcome(save);
if(!platform.saveError&&(welcomeAdded||!loadedProgress?.battleSupplies||identityNeedsSave))persist();
updateWeek(save);
render();if(!platform.saveBlocked&&!save.pending&&!save.pendingPack&&save.wins+save.losses===0&&currentLevel(save)===1&&save.best===0)startMatch();
if(save.pendingPack)showPack(save.pendingPack,save.pendingPack.tier);requestAnimationFrame(frame);
if(platform.saveError)toast(t('saveError'));
platform.watchUser(user=>{const previousPicture=portalPictureUrl(portalUser);portalUser=user;const changed=applyPlayerIdentity(save,user);if(changed||previousPicture!==portalPictureUrl(user)){if(screen==='combat'&&endingBattle)return;render();if(modal==='settings')settingsModal();}});
// Deliberately no global debug cheats or synthetic leaderboard claims in the release.
