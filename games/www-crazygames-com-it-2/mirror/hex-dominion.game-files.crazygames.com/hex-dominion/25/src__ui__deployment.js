import {deploymentStatus,deploymentOffers} from './src__economy__deployment.js';

// This is a shop promotion, not a rewarded video: only the displayed gold is used.
export function deploymentPanel(save,{saveBlocked=false}={}){
 const ar=save.settings?.lang==='ar',tr=(en,arabic)=>ar?arabic:en;
 const state=deploymentStatus(save),format=new Intl.NumberFormat(ar?'ar':'en');
 const note=saveBlocked?tr('Purchases are unavailable until your progress can be saved.','الشراء غير متاح حتى يصبح حفظ تقدمك ممكنًا.'):
  state.permanent?tr('Permanent upgrade active. Every battle starts with your discount.','الترقية الدائمة مفعّلة. يبدأ كل نزال بتخفيض التكلفة.'):
  state.temporary?tr('Your next battle is ready. Use your pass before buying another upgrade.','التعزيز جاهز للنزال القادم. استخدمه قبل شراء ترقية أخرى.'):
  tr('Applies to every weapon in your deck. Minimum cost: 1 energy. Discounts do not stack.','يشمل كل أسلحة تشكيلتك. الحد الأدنى للتكلفة: نقطة طاقة واحدة. التخفيضات لا تتراكم.');
 const cards=deploymentOffers(save).map(offer=>{
  const permanent=offer.id==='permanent';
  const title=permanent?tr('Permanent upgrade','ترقية دائمة'):tr('One battle pass','تعزيز لنزال واحد');
  const description=permanent?tr('Keep the advantage in every battle.','أفضلية مستمرة في كل نزال.'):tr('Activates when your next battle begins.','يتفعّل عند بدء نزالك القادم.');
  const action=state.permanent?tr('Owned','تم الامتلاك'):state.temporary?tr('Pass ready','التعزيز جاهز'):tr('Buy upgrade','شراء الترقية');
  const available=!saveBlocked&&offer.available;
  const help=saveBlocked?tr('Saving unavailable','الحفظ غير متاح'):offer.reason==='funds'?tr('Need '+format.format(Math.max(0,offer.price-(save.gold||0)))+' more gold','تحتاج '+format.format(Math.max(0,offer.price-(save.gold||0)))+' ذهبًا إضافيًا'):state.permanent?tr('Already active','مفعّلة بالفعل'):state.temporary?tr('Play your next battle first','العب النزال القادم أولًا'):tr('Ready to purchase','متاح للشراء');
  return '<article class="deployment-option '+(permanent?'is-permanent':'')+'"><div class="deployment-option-copy"><h3>'+title+'</h3><p>'+description+'</p></div><div class="deployment-price"><i aria-hidden="true" class="deployment-gold"></i><b>'+format.format(offer.price)+'</b><span>'+tr('gold','ذهب')+'</span></div><button type="button" class="btn '+(permanent?'golden':'green')+'" data-action="buyDeployment" data-id="'+offer.id+'" aria-describedby="deployment-help-'+offer.id+'" '+(available?'':'disabled')+'>'+action+'</button><small id="deployment-help-'+offer.id+'">'+help+'</small></article>';
 }).join('');
 return '<section class="deployment-promo" id="market-deployment" aria-labelledby="deployment-title" dir="'+(ar?'rtl':'ltr')+'"><header class="deployment-heading"><div><small>'+tr('BATTLE UPGRADE','ترقية المعركة')+'</small><h2 id="deployment-title">'+tr('Deploy more. Spend less.','انشر أكثر. أنفق أقل.')+'</h2><p>'+tr('Every weapon costs 1 less energy to deploy.','تكلفة نشر كل سلاح أقل بنقطة طاقة واحدة.')+'</p></div><span class="deployment-badge">'+tr('−1 ENERGY','−١ طاقة')+'</span></header><div class="deployment-options">'+cards+'</div><p class="deployment-note" role="status">'+note+'</p></section>';
}
