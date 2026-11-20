export const COLS=25,ROWS=40,COUNT=1000,R=8,DX=Math.sqrt(3)*R,DY=1.5*R,WIDTH=DX*25.5,HEIGHT=DY*39+R*2;
export const hexXY=(col,row)=>({x:DX*(col+.5+(row%2)*.5),y:R+row*DY});
export function neighbors(id){const row=Math.floor(id/COLS),col=id%COLS,odd=row%2;return [[col-1,row],[col+1,row],[col-1+odd,row-1],[col+odd,row-1],[col-1+odd,row+1],[col+odd,row+1]].filter(([c,r])=>c>=0&&c<COLS&&r>=0&&r<ROWS).map(([c,r])=>r*COLS+c);}
export function area(id,radius=1){let all=new Set([id]),front=[id];for(let n=0;n<radius;n++){let next=[];for(const x of front)for(const v of neighbors(x))if(!all.has(v)){all.add(v);next.push(v);}front=next;}return [...all];}
export class Grid{
 constructor({blue=200,red=200}={}){blue=Math.max(200,Math.min(300,Math.round(Number(blue)||200)));red=Math.max(200,Math.min(300,Math.round(Number(red)||200)));this.cells=Array.from({length:COUNT},(_,id)=>({id,row:Math.floor(id/COLS),col:id%COLS,owner:id<red?2:id>=COUNT-blue?1:0,...hexXY(id%COLS,Math.floor(id/COLS)),protect:0}));this.counts=[COUNT-blue-red,blue,red];this.version=0;}
 at(x,y){const row=Math.round((y-R)/DY);let best=null,d=Infinity;for(let rr=row-1;rr<=row+1;rr++){const col=Math.round(x/DX-.5-(rr%2)*.5);for(let cc=col-1;cc<=col+1;cc++){if(rr<0||rr>=ROWS||cc<0||cc>=COLS)continue;const h=this.cells[rr*COLS+cc],dd=(h.x-x)**2+(h.y-y)**2;if(dd<d){d=dd;best=h;}}}return d<=R*R*1.3?best:null;}
 capture(id,owner){const h=this.cells[id];if(!h||![0,1,2].includes(owner)||h.owner===owner||h.protect)return false;this.counts[h.owner]--;h.owner=owner;this.counts[owner]++;this.version++;return true;}
 footprint(id,size){if(size===1)return[id];if(size===7)return area(id);if(size===19)return area(id,2);const h=this.cells[id];return [id,...[id-1,id+1].filter(n=>this.cells[n]?.row===h.row)];}
 canPlace(id,size,owner,entities=[]){const cells=this.footprint(id,size);return cells.length===size&&cells.every(n=>this.cells[n].owner===owner&&!this.cells[n].protect)&&!entities.some(e=>e.hp>0&&cells.some(n=>e.footprint?.includes(n)));}
}
