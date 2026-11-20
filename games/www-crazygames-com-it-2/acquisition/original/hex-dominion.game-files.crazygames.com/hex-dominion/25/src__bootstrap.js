// Keep a working retry control even when a module request fails before main runs.
(()=>{
 let ready=false,timer;
 const showRecovery=()=>{
  if(document.querySelector('#boot-recovery'))return;
  const panel=document.createElement('section');panel.id='boot-recovery';panel.setAttribute('role','alert');
  Object.assign(panel.style,{position:'fixed',inset:'0',zIndex:'2147483647',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'18px',padding:'24px',boxSizing:'border-box',background:'#211d38',color:'#fff',fontFamily:'Arial, sans-serif',textAlign:'center'});
  const title=document.createElement('h1');title.textContent='HEX Dominion';
  const message=document.createElement('p');message.textContent='The game could not finish loading. Please retry. Your saved progress has not been reset. / تعذر إكمال التحميل. حاول مجددًا. لم يتم مسح تقدمك.';message.style.maxWidth='560px';
  const retry=document.createElement('button');retry.type='button';retry.textContent='Retry / إعادة المحاولة';Object.assign(retry.style,{padding:'14px 28px',fontSize:'18px',fontWeight:'bold',borderRadius:'12px',border:'0',background:'#88e099',color:'#112616',cursor:'pointer'});retry.addEventListener('click',()=>location.reload());
  panel.append(title,message,retry);document.body.append(panel);retry.focus();
 };
 const loadingReady=()=>{ready=true;clearTimeout(timer);window.removeEventListener('hex:boot-ready',loadingReady);document.querySelector('#boot-recovery')?.remove();};
 window.addEventListener('hex:boot-ready',loadingReady);
 timer=setTimeout(()=>{if(!ready)showRecovery();},25000);
 import('./src__main.js').then(loadingReady).catch(error=>{clearTimeout(timer);console.error('HEX Dominion startup failed:',error);showRecovery();});
})();
