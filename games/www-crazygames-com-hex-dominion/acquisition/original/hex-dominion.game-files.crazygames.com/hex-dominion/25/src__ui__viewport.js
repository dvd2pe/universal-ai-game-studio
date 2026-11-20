// Move primary actions outside the scrolling content, preserving their nodes and handlers.
export function pinScreenActions(app,screen){
 const selectors={result:['.upgrade-results','.result-actions'],offer:['.offer-page','.offer-choices'],detail:['.detail-page','.inspector-upgrade']};
 const spec=selectors[screen];if(!spec)return;
 const page=app.querySelector(spec[0]),actions=page?.querySelector(spec[1]);if(!page||(!actions&&screen!=='detail'))return;
 const frame=app.ownerDocument.createElement('section');frame.className='viewport-page '+screen+'-viewport';
 const footer=app.ownerDocument.createElement('div');footer.className='viewport-actions';
 // Keep existing scoped detail/result styling without turning the footer into a second page.
 if(screen==='detail')footer.classList.add('detail-page');
 if(screen==='result')footer.classList.add('upgrade-results');
 if(screen==='offer')footer.classList.add('offer-page');
 page.replaceWith(frame);frame.append(page);if(actions){frame.append(footer);footer.append(actions);}
 if(screen==='detail'){
  const navigation=page.querySelector('.detail-top'),tabs=page.querySelector('.inspector-tabs');
  if(navigation)frame.prepend(navigation);if(tabs)page.before(tabs);
 }
}
