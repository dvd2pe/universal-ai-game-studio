export function collectionCapacity(columns,rowHeight,gap,availableHeight){
 if(!Number.isFinite(columns)||columns<1||!Number.isFinite(rowHeight)||rowHeight<=0)return 6;
 return Math.max(6,Math.floor(columns)*Math.max(1,Math.floor((availableHeight+gap)/(rowHeight+gap))));
}
export function measureCollectionCapacity(root){
 const grid=root?.querySelector('.collection-grid'),card=grid?.querySelector('.collection-card');if(!card)return null;
 const style=getComputedStyle(grid),rect=grid.getBoundingClientRect(),page=root.getBoundingClientRect();
 const columns=style.gridTemplateColumns.split(' ').length,gap=parseFloat(style.rowGap)||0;
 const top=rect.top-page.top+root.scrollTop,padding=parseFloat(getComputedStyle(root).paddingBottom)||0;
 return collectionCapacity(columns,card.getBoundingClientRect().height,gap,root.clientHeight-top-padding);
}
