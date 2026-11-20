// Cosmetic rival display only. The caller chooses the actual battle opponent.
// renderCandidate must return trusted markup with escaped player-facing text.
const escapeAttribute=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export function renderRivalPicker(candidates,{renderCandidate=value=>String(value??''),selected=null,settled=false,rolling=false,label=''}={}){
 const cards=Array.from({length:3},(_,index)=>candidates?.[index]??'');
 if(settled&&selected!==null)cards[1]=selected;
 return '<div class="rival-picker'+(settled?' is-settled':'')+(rolling&&!settled?' is-rolling':'')+'"'+(label?' aria-label="'+escapeAttribute(label)+'"':'')+' role="list"><div class="rival-picker-track">'+cards.map((candidate,index)=>'<div class="rival-picker-slot '+(index===1?'is-center':'is-side')+'" role="listitem"'+(settled&&index!==1?' aria-hidden="true"':'')+'>'+renderCandidate(candidate,index)+'</div>').join('')+'</div><span class="rival-picker-marker" aria-hidden="true">'+(settled?'✓':'▼')+'</span></div>';
}
