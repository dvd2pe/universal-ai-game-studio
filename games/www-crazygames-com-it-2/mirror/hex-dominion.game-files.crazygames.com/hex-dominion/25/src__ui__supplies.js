import {battleSupplyOffer,timeSupplyOffer} from './src__economy__battle-supplies.js';
import {upgradeSupport} from './src__economy__upgrade-support.js';
import {CATALOG} from './src__weapons__catalog.js';
export const timeIcon=()=>'<span class="time-coin" aria-hidden="true">⌛</span>';
export const rewardedAdIcon=()=>'<span class="rewarded-ad-icon" aria-hidden="true"></span>';
export function adStatusNote(platform,{tr,btn}){
 const messages={
  adsDisabled:['CrazyGames has disabled ads for this session. You can keep playing without ads.','عطّلت CrazyGames الإعلانات لهذه الجلسة. يمكنك مواصلة اللعب دون إعلانات.'],
  'adsDisabledBasicLaunch':['CrazyGames has disabled ads for this Basic Launch build. Ads require an enabled Full Launch preview or release.','أوقفت CrazyGames الإعلانات لهذه النسخة التجريبية. يلزم تشغيلها في معاينة أو إصدار Full Launch مفعّل.'],
  adblock:['An ad blocker was detected. Disable it for this game, then check again or reload.','اكتُشف مانع إعلانات. عطّله لهذه اللعبة ثم أعد التحقق أو تحميل الصفحة.'],
  'sdk-unavailable':['The ad service did not connect. Check your connection and reload the game.','لم تتصل خدمة الإعلانات. تحقق من اتصالك وأعد تحميل اللعبة.'],
  disabled:['Ads are unavailable in this environment. Open the game on CrazyGames.','الإعلانات غير متاحة في بيئة التشغيل الحالية. افتح اللعبة على CrazyGames.'],
  unfilled:['No video is available right now. You can try again; your reward timer has not started.','لا يتوفر فيديو الآن. يمكنك المحاولة مجددًا؛ لم يبدأ عدّاد المكافأة.'],
  adCooldown:['CrazyGames asked us to wait before the next video. Try again shortly.','تطلب CrazyGames الانتظار قليلًا قبل الفيديو التالي. حاول مجددًا لاحقًا.'],
  'request-timeout':['The ad request timed out. Nothing was spent. You can try again.','انتهت مهلة طلب الإعلان. لم يُخصم شيء ويمكنك المحاولة مجددًا.'],
  other:['The ad could not load. Nothing was spent. Try again shortly.','تعذّر تحميل الإعلان. لم يُخصم شيء. حاول مجددًا بعد قليل.']
 };
 const reason=platform.lastAdError||(!platform.adsEnabled?'sdk-unavailable':'');
 if(!reason)return '<p class="ad-service-note">'+tr('Reward timers start only after a completed video. Video availability is managed by CrazyGames.','تبدأ مهلة المكافأة بعد اكتمال الفيديو فقط. توفر الفيديو تديره CrazyGames.')+'</p>';
 const message=messages[reason]||messages.other;
 return '<div class="ad-service-note" role="status"><p>'+tr(...message)+'</p>'+(!platform.adsEnabled?btn(platform.sdk?'retryAds':'reloadGame',tr(platform.sdk?'Check ads again':'Reload game',platform.sdk?'إعادة التحقق من الإعلانات':'إعادة تحميل اللعبة'),'small blue'):'')+'</div>';
}
export function battleBoostPanel(save,ctx){
 const {tr,btn,art,esc,label,platform}=ctx,offer=battleSupplyOffer(save),armed=offer.pending;
 const intro='<div class="battle-boost-heading"><small class="supply-eyebrow">'+tr('OPTIONAL BATTLE BOOST','تعزيز اختياري للمعركة')+'</small><h2>'+tr('Prepare a bonus for your next battle','حضّر مكافأة لمعركتك التالية')+'</h2><p>'+tr('Choose one optional video bonus here in the shop. Battle starts directly from the lobby.','اختر مكافأة فيديو اختيارية هنا في المتجر. تبدأ المعركة مباشرة من اللوبي.')+'</p></div>';
 if(armed)return '<section id="market-battle-boost" class="battle-boost-panel">'+intro+'<div class="supply-ready"><b>✓ '+tr('Bonus ready for your next battle','المكافأة جاهزة لمعركتك التالية')+'</b><p>'+(armed.kind==='discount'?tr('Every weapon costs 2 less energy this battle (minimum 1).','تكلفة كل سلاح أقل بنقطتي طاقة لهذه المعركة (الحد الأدنى 1).'):tr('A sixth weapon joins your deck for this battle only.','سلاح سادس ينضم إلى تشكيلتك لهذه المعركة فقط.'))+'</p></div></section>';
 const disabled=!platform.adsEnabled||platform.saveBlocked?'disabled':'';
 return '<section id="market-battle-boost" class="battle-boost-panel">'+intro+'<div class="prebattle-options"><article><div class="supply-symbol">ϟ <b>−2</b></div><h3>'+tr('Lower deployment cost','نشر بتكلفة أقل')+'</h3><p>'+tr('Every weapon costs 2 less energy for one battle. Minimum cost: 1.','تنخفض تكلفة كل سلاح بنقطتي طاقة لمعركة واحدة. الحد الأدنى: 1.')+'</p>'+btn('battleAd',rewardedAdIcon()+tr('Watch ad · −2 energy','شاهد إعلانًا · −2 طاقة'),'blue wide','data-id="discount" '+disabled)+'</article>'+(offer.loan?'<article>'+art(offer.loan)+'<h3>'+esc(label(CATALOG[offer.loan]))+'</h3><p>'+tr('Temporary sixth weapon for one battle. Your saved deck stays the same.','سلاح سادس مؤقت لمعركة واحدة. تشكيلتك المحفوظة لا تتغير.')+'</p>'+btn('battleAd',rewardedAdIcon()+tr('Watch ad · borrow weapon','شاهد إعلانًا · استعارة السلاح'),'blue wide','data-id="loan" '+disabled)+'</article>':'')+'</div>'+adStatusNote(platform,ctx)+'</section>';
}
export function timeShopPanel(save,ctx){
 const {tr,btn,coin,fmt,platform}=ctx,offer=timeSupplyOffer(save);
 return '<section id="market-time" class="time-supply"><div class="time-supply-art">'+timeIcon()+'<b>+15s</b></div><div class="time-supply-details"><small class="supply-eyebrow">'+tr('RARE CONSUMABLE','عملة نادرة')+'</small><h2>'+tr('Time Coin','عملة الوقت')+' <span class="time-owned">×'+offer.tokens+'</span></h2><p>'+tr('Add 15 seconds to the battle clock. One use per battle. The first coin is free.','أضف 15 ثانية لوقت المعركة. استخدام واحد لكل معركة. أول عملة مجانية.')+'</p><small>'+tr('Buy once every 2 hours or watch one ad every 2 hours · carry up to 3','شراء مرة كل ساعتين أو مشاهدة إعلان مرة كل ساعتين · تحتفظ حتى 3')+'</small><div class="supply-buttons">'+btn('buyTime',fmt(1500)+' '+coin('gold')+' '+tr('gold','ذهب'),'green','data-time-offer="gold" '+(!offer.gold.available||!offer.affordable||platform.saveBlocked?'disabled':''))+btn('adTime',rewardedAdIcon()+tr('Watch ad · +1 coin','شاهد إعلانًا · +1 عملة'),'blue','data-time-offer="ad" '+(!offer.ad.available||!platform.adsEnabled||platform.saveBlocked?'disabled':''))+'</div><small id="time-restock" aria-live="polite"></small></div></section>';
}
export function upgradeHelpPanel(save,id,ctx){
 const {tr,btn,coin,fmt,platform}=ctx,offer=upgradeSupport(save,id);
 const copyStatus=offer.boostReady
  ?tr('Boost 100% ready as an alternative','البوست 100% جاهز كبديل')
  :tr(offer.copiesMissing?'Missing '+fmt(offer.copiesMissing)+' weapon copies':'Copies are ready',
   offer.copiesMissing?'تنقصك '+fmt(offer.copiesMissing)+' نسخ من السلاح':'النسخ متوفرة');
 const resources='<div class="upgrade-shortfall"><div>'+coin('gold')+' <b>'+fmt(save.gold)+' / '+fmt(offer.cost.gold)+'</b><small>'+tr(offer.goldMissing?'Missing '+fmt(offer.goldMissing)+' gold':'Gold is ready',offer.goldMissing?'ينقصك '+fmt(offer.goldMissing)+' ذهب':'الذهب متوفر')+'</small></div><div><span>▣</span> <b>'+fmt(save.cards[id].copies)+' / '+fmt(offer.cost.copies)+'</b><small>'+copyStatus+'</small></div></div>';
 const requirement=offer.boostReady
  ?'<p>'+tr('Boost is 100% ready. Pay '+fmt(offer.cost.gold)+' gold in Arsenal to upgrade this weapon. Boost never upgrades it automatically.','البوست مكتمل 100%. ادفع '+fmt(offer.cost.gold)+' ذهب في الترسانة لترقية هذا السلاح. البوست لا يرقّيه تلقائيًا.')+'</p>'
  :offer.copiesMissing
   ?'<p>'+tr('Collect the missing weapon copies, or use one core on this weapon after each match until Boost reaches 100%. Then pay '+fmt(offer.cost.gold)+' gold in Arsenal to upgrade. Boost does not upgrade automatically.','اجمع نسخ السلاح الناقصة، أو استخدم نواة واحدة لهذا السلاح بعد كل نزال حتى يصل البوست إلى 100%. بعدها ادفع '+fmt(offer.cost.gold)+' ذهب في الترسانة للترقية. البوست لا يرقّي السلاح تلقائيًا.')+'</p>'+btn('upgradeShop',tr('Open supply market','افتح سوق الإمدادات'),'blue wide')
   :'<p>'+tr('Weapon copies are ready. Pay '+fmt(offer.cost.gold)+' gold in Arsenal to upgrade.','نسخ السلاح جاهزة. ادفع '+fmt(offer.cost.gold)+' ذهب في الترسانة للترقية.')+'</p>';
 const goldHelp=offer.goldMissing&&(offer.boostReady||!offer.copiesMissing)
  ?'<p>'+tr('Optional: one completed ad gives the missing gold, up to 1,000. No gems are spent.','اختياري: إعلان مكتمل يمنحك الذهب الناقص حتى 1,000. لا يُخصم ماس.')+'</p>'
   +(offer.goldMissing>1000?'<p>'+tr('After this reward, you will still need '+fmt(offer.goldMissing-1000)+' gold.','بعد هذه المكافأة ستحتاج إلى '+fmt(offer.goldMissing-1000)+' ذهب إضافي.')+'</p>':'')
   +btn('upgradeGold',rewardedAdIcon()+tr('Watch ad · +'+fmt(offer.amount)+' gold','شاهد إعلانًا · +'+fmt(offer.amount)+' ذهب'),'blue wide','data-id="'+id+'" data-upgrade-help="'+id+'" '+(!offer.available||!platform.adsEnabled||platform.saveBlocked?'disabled':''))
   +adStatusNote(platform,ctx)
  :'';
 return '<h2>'+tr('Upgrade supplies','موارد الترقية')+'</h2><p>'+tr('Check what this weapon still needs for its next level.','تحقق مما يحتاجه هذا السلاح للمستوى التالي.')+'</p>'+resources+requirement+goldHelp+btn('close',tr('Back','رجوع'),'blue wide');
}
