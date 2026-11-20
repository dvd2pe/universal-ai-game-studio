import {dailyStatus} from './src__economy__daily.js';
const names={gold:['Gold','ذهب'],gems:['Gems','ماس'],cores:['Cores','طاقة'],packs:['Supply crate','صندوق إمداد']};
function icon(kind){
  if(kind==='packs')return '<i aria-hidden="true" class="login-icon login-crate"></i>';
  return '<i aria-hidden="true" class="login-icon login-'+kind+'"></i>';
}
export function dailyPanel(save,now=Date.now()){
  const status=dailyStatus(save,now),ar=save.settings?.lang==='ar',tr=(en,arabic)=>ar?arabic:en;
  const lootMarkup=loot=>Object.entries(loot).map(([kind,amount])=>'<span class="login-loot" aria-label="'+amount+' '+names[kind][ar?1:0]+'">'+icon(kind)+'<b>+'+amount+'</b></span>').join('');
  const headline=status.ready?tr('Your daily gift is ready','هديتك اليومية جاهزة'):status.clockBehind||!status.validClock?tr('Check your device date','تحقق من تاريخ جهازك'):tr('Today’s gift collected','تم استلام هدية اليوم');
  const note=tr('One gift each day at 00:00 UTC. Miss a day? Keep your progress.','هدية يوميًا عند 00:00 UTC. إذا فاتك يوم يبقى تقدمك محفوظًا.');
  return '<section class="login-rewards" data-daily-day="'+status.dayKey+'" aria-labelledby="login-heading" dir="'+(ar?'rtl':'ltr')+'">'+
    '<header class="login-header"><div><small>'+tr('FREE DAILY REWARDS','هدايا يومية مجانية')+'</small><h2 id="login-heading">'+tr('7 days of supplies','٧ أيام من الإمدادات')+'</h2></div><span class="login-streak">'+status.claimed+' / 7</span></header>'+
    '<div class="login-days">'+status.rewards.map(reward=>'<article class="login-day '+(reward.claimed?'is-claimed ':reward.ready?'is-ready ':'')+(reward.day===7?'is-finale':'')+'" aria-label="'+tr('Day ','اليوم ')+reward.day+(reward.claimed?tr(', collected','، تم الاستلام'):reward.ready?tr(', ready','، جاهز'):'')+'"><span class="login-day-label">'+tr('Day ','اليوم ')+reward.day+'</span><div class="login-day-loot">'+lootMarkup(reward.loot)+'</div><span class="login-mark" aria-hidden="true">'+(reward.claimed?'✓':reward.ready?'◆':reward.day===7?'★':'·')+'</span></article>').join('')+'</div>'+
    '<div class="login-action"><div><b role="status">'+headline+'</b><small>'+tr('Complete day 7, then start a new week.','أكمل اليوم السابع ثم ابدأ أسبوعًا جديدًا.')+'</small></div><button class="btn green small" data-action="claimDaily" '+(status.ready?'':'disabled')+'>'+ (status.ready?tr('Claim day ','استلام اليوم ')+status.rewardDay:tr('Collected','تم الاستلام'))+'</button></div>'+
    '<p class="login-note">'+note+'</p></section>';
}
