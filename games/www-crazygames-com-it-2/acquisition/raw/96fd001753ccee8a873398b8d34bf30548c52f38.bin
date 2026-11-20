// Scroll only the game's own scroller. scrollIntoView can also move the host page.
export function scrollToSection(page,target,padding=8){
 if(!page||!target)return false;
 const top=target.getBoundingClientRect().top-page.getBoundingClientRect().top+page.scrollTop-page.clientTop-padding;
 page.scrollTop=Math.max(0,Math.min(page.scrollHeight-page.clientHeight,top));
 return true;
}

// Contain wheel scrolling even on engines without overscroll-behavior support.
export function containGameScroll(event,roots){
 if(event.ctrlKey||event.defaultPrevented)return;
 let node=event.target?.nodeType===1?event.target:event.target?.parentElement;
 if(!roots.some(root=>root===node||root?.contains(node)))return;
 while(node){
  const view=node.ownerDocument?.defaultView,style=view?.getComputedStyle(node);
  const y=node.scrollHeight-node.clientHeight,x=node.scrollWidth-node.clientWidth;
  const scrollY=/auto|scroll/.test(style?.overflowY||'')&&y>1;
  const scrollX=/auto|scroll/.test(style?.overflowX||'')&&x>1;
  if(scrollY||scrollX){
   const oldY=node.scrollTop,oldX=node.scrollLeft;
   event.preventDefault();
   if(scrollY)node.scrollTop=oldY+event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?node.clientHeight:1);
   if(scrollX)node.scrollLeft=oldX+event.deltaX*(event.deltaMode===1?16:event.deltaMode===2?node.clientWidth:1);
   return;
  }
  if(roots.includes(node))break;
  node=node.parentElement;
 }
 event.preventDefault();
}
