import {WIDTH,HEIGHT,R} from './src__territory__grid.js';
import {healthBarPosition} from './src__ui__health-bars.js';
import {BoardCamera} from './src__ui__camera.js';
const TAU=Math.PI*2,TERRAIN_TILE=64;
const teamAtlases=new WeakMap(),projectileSprites=new Map();
function projectileSprite(owner,arrow){
 const key=owner+':'+arrow;if(projectileSprites.has(key))return projectileSprites.get(key);
 const canvas=document.createElement('canvas');canvas.width=56;canvas.height=32;const c=canvas.getContext('2d');c.scale(2,2);c.translate(21,8);
 const trail=c.createLinearGradient(-15,0,0,0);trail.addColorStop(0,'transparent');trail.addColorStop(1,owner===0?'#eef2ffbf':owner===1?'#24efffbf':'#ffdf75bf');c.strokeStyle=trail;c.lineWidth=arrow?2:4;c.lineCap='round';c.beginPath();c.moveTo(-15,0);c.lineTo(0,0);c.stroke();
 const glow=c.createRadialGradient(0,0,0,0,0,7);glow.addColorStop(0,owner===0?'#f1f4ff88':owner===1?'#6affff88':'#ffe68888');glow.addColorStop(1,'transparent');c.fillStyle=glow;c.beginPath();c.arc(0,0,7,0,TAU);c.fill();
 c.fillStyle=owner===0?'#f4f7ff':owner===1?'#70ffff':'#ffe79a';c.beginPath();c.arc(0,0,arrow?1.8:2.8,0,TAU);c.fill();c.fillStyle='#ffffffdd';c.beginPath();c.arc(-.6,-.7,1.3,0,TAU);c.fill();projectileSprites.set(key,canvas);return canvas;
}
export class Renderer{
 constructor(canvas,atlas,{arenaZoom=1}={}){this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.atlas=atlas;this.layer=document.createElement('canvas');this.layer.width=Math.ceil(WIDTH*2);this.layer.height=Math.ceil(HEIGHT*2);this.lctx=this.layer.getContext('2d');this.version=-1;this.hover=null;this.hiddenEntities=new Set();this.lastDrawTime=0;this.redAtlas=null;this.neutralAtlas=null;this.camera=new BoardCamera(WIDTH,HEIGHT,{defaultZoom:arenaZoom});this.resize();this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(canvas.parentElement);}
 setHiddenEntities(ids=[]){this.hiddenEntities=new Set(ids);}
 destroy(){this.hiddenEntities.clear();this.observer.disconnect();this.hover=null;this.terrainGrid=null;this.terrainTiles=null;this.terrainOwners=null;this.redAtlas=null;this.neutralAtlas=null;this.layer.width=this.layer.height=1;this.canvas.width=this.canvas.height=1;}
 resize(){
  const p=this.canvas.parentElement;if(!p)return;
  const parentStyle=globalThis.getComputedStyle?.(p),canvasStyle=globalThis.getComputedStyle?.(this.canvas),n=(style,key)=>Number.parseFloat(style?.[key])||0;
  // clientWidth/clientHeight round fractional layout pixels; leave one pixel so CSS never clamps a single axis.
  const contentWidth=Math.floor(p.clientWidth-n(parentStyle,'paddingLeft')-n(parentStyle,'paddingRight'))-1,contentHeight=Math.floor(p.clientHeight-n(parentStyle,'paddingTop')-n(parentStyle,'paddingBottom'))-1;
  const outerWidth=['borderLeftWidth','borderRightWidth','paddingLeft','paddingRight','marginLeft','marginRight'].reduce((sum,key)=>sum+n(canvasStyle,key),0),outerHeight=['borderTopWidth','borderBottomWidth','paddingTop','paddingBottom','marginTop','marginBottom'].reduce((sum,key)=>sum+n(canvasStyle,key),0);
  // Match the canvas CSS caps against the parent's content box. Otherwise CSS
  // can clamp only one axis after fitting, stretching the map and its hexes.
  const availableWidth=Math.max(1,contentWidth-Math.max(22,outerWidth)),availableHeight=Math.max(1,contentHeight-Math.max(18,outerHeight)),enabled=this.camera.defaultZoom>1;
  const w=enabled?availableWidth:Math.min(availableWidth,availableHeight*WIDTH/HEIGHT),h=enabled?availableHeight:w*HEIGHT/WIDTH;
  this.dpr=Math.min(globalThis.devicePixelRatio||1,2);this.canvas.style.width=w+'px';this.canvas.style.height=h+'px';this.canvas.width=Math.max(1,Math.round(w*this.dpr));this.canvas.height=Math.max(1,Math.round(h*this.dpr));this.camera.resize(w,h,enabled);this.cameraChanged();
 }
 cameraChanged(){this.sx=this.sy=this.camera.scale*this.dpr;if(typeof this.canvas.dispatchEvent==='function'&&typeof globalThis.CustomEvent==='function')this.canvas.dispatchEvent(new CustomEvent('hex:camera-change',{detail:{enabled:this.camera.enabled,zoom:this.camera.zoom}}));}
 contentRect(){const r=this.canvas.getBoundingClientRect(),s=globalThis.getComputedStyle?.(this.canvas);if(!s)return r;const n=key=>Number.parseFloat(s[key])||0,left=n('borderLeftWidth')+n('paddingLeft'),right=n('borderRightWidth')+n('paddingRight'),top=n('borderTopWidth')+n('paddingTop'),bottom=n('borderBottomWidth')+n('paddingBottom'),bw=n('width')+(s.boxSizing==='border-box'?0:left+right),bh=n('height')+(s.boxSizing==='border-box'?0:top+bottom),sx=bw?r.width/bw:1,sy=bh?r.height/bh:1;return {left:r.left+left*sx,top:r.top+top*sy,width:Math.max(0,r.width-(left+right)*sx),height:Math.max(0,r.height-(top+bottom)*sy)};}
 screenToWorld(clientX,clientY){const r=this.contentRect();if(!r.width||!r.height)return null;return this.camera.screenToWorld((clientX-r.left)*this.camera.width/r.width,(clientY-r.top)*this.camera.height/r.height);}
 worldToClient(x,y){const r=this.contentRect(),p=this.camera.worldToScreen(x,y);return p&&r.width&&r.height?{x:r.left+p.x*r.width/this.camera.width,y:r.top+p.y*r.height/this.camera.height}:null;}
 zoomBy(delta,clientX,clientY){const r=this.contentRect(),x=Number.isFinite(clientX)&&r.width?(clientX-r.left)*this.camera.width/r.width:undefined,y=Number.isFinite(clientY)&&r.height?(clientY-r.top)*this.camera.height/r.height:undefined;const changed=this.camera.zoomBy(delta,x,y);if(changed)this.cameraChanged();return changed;}
 fitBoard(){const changed=this.camera.fitBoard();if(changed)this.cameraChanged();return changed;}
 focusPlayer(){const changed=this.camera.focusPlayer();if(changed)this.cameraChanged();return changed;}
 panBy(dx,dy){const r=this.contentRect(),changed=this.camera.panBy(r.width?dx*this.camera.width/r.width:0,r.height?dy*this.camera.height/r.height:0);if(changed)this.cameraChanged();return changed;}
 ensureVisible(x,y){const changed=this.camera.ensureVisible(x,y);if(changed)this.cameraChanged();return changed;}
 hex(c,h,fill,stroke){c.beginPath();for(let i=0;i<6;i++){const a=Math.PI/3*i-Math.PI/2,x=h.x+Math.cos(a)*(R-.32),y=h.y+Math.sin(a)*(R-.32);i?c.lineTo(x,y):c.moveTo(x,y);}c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=.65;c.stroke();}}
 terrainHex(c,h){this.hex(c,h,['#b1b8c1','#139de9','#fa4c61'][h.owner],['#8b949e','#117ccb','#d02b47'][h.owner]);c.strokeStyle=['#d6dce2','#55bfff','#ff8190'][h.owner];c.lineWidth=.7;c.beginPath();c.moveTo(h.x-6.25,h.y-3.7);c.lineTo(h.x,h.y-7.3);c.lineTo(h.x+6.25,h.y-3.7);c.stroke();}
 terrain(b){
 if(this.terrainGrid===b.grid&&this.version===b.grid.version)return;
 const c=this.lctx,cells=b.grid.cells,columns=Math.ceil(WIDTH/TERRAIN_TILE),rows=Math.ceil(HEIGHT/TERRAIN_TILE);
 const first=this.terrainGrid!==b.grid;
 if(first){
  this.terrainGrid=b.grid;this.terrainOwners=new Uint8Array(cells.length).fill(255);this.terrainTiles=[];
  for(let y=0;y<rows;y++)for(let x=0;x<columns;x++){
   const left=x*TERRAIN_TILE,top=y*TERRAIN_TILE;
   this.terrainTiles.push({left,top,cells:cells.filter(h=>h.x+R>=left&&h.x-R<=left+TERRAIN_TILE&&h.y+R>=top&&h.y-R<=top+TERRAIN_TILE)});
  }
 }
 const dirty=new Set();
 for(const h of cells)if(this.terrainOwners[h.id]!==h.owner){
  this.terrainOwners[h.id]=h.owner;
  for(let y=Math.max(0,Math.floor((h.y-R)/TERRAIN_TILE));y<=Math.min(rows-1,Math.floor((h.y+R)/TERRAIN_TILE));y++)
   for(let x=Math.max(0,Math.floor((h.x-R)/TERRAIN_TILE));x<=Math.min(columns-1,Math.floor((h.x+R)/TERRAIN_TILE));x++)dirty.add(y*columns+x);
 }
 this.version=b.grid.version;c.setTransform(2,0,0,2,0,0);
 if(first||[...dirty].reduce((total,index)=>total+this.terrainTiles[index].cells.length,0)>=cells.length*.8){
  c.fillStyle='#384556';c.fillRect(0,0,WIDTH+1,HEIGHT+1);for(const h of cells)this.terrainHex(c,h);return;
 }
 // Redraw clipped tiles so antialiased hex borders never accumulate old colours.
 for(const index of dirty){
  const tile=this.terrainTiles[index];c.save();c.beginPath();c.rect(tile.left,tile.top,TERRAIN_TILE,TERRAIN_TILE);c.clip();c.fillStyle='#384556';c.fillRect(tile.left,tile.top,TERRAIN_TILE,TERRAIN_TILE);
  for(const h of tile.cells){
   this.terrainHex(c,h);
  }
  c.restore();
 }
 }
 teamAtlas(){if(this.redAtlas||!this.atlas?.naturalWidth)return;const cached=teamAtlases.get(this.atlas);if(cached){this.redAtlas=cached.red;this.neutralAtlas=cached.neutral;return;}const a=document.createElement('canvas');a.width=this.atlas.naturalWidth;a.height=this.atlas.naturalHeight;const g=a.getContext('2d',{willReadFrequently:true});g.drawImage(this.atlas,0,0);const pixels=g.getImageData(0,0,a.width,a.height),d=pixels.data;for(let i=0;i<d.length;i+=4){const r=d[i],b=d[i+2];if(b>r*1.2&&b>d[i+1]*1.03){d[i]=Math.min(255,b*1.08);d[i+1]*=.55;d[i+2]=Math.max(r,b*.24);}}g.putImageData(pixels,0,0);this.redAtlas=a;const n=document.createElement('canvas');n.width=a.width;n.height=a.height;const nc=n.getContext('2d');nc.filter='grayscale(1) brightness(1.15)';nc.drawImage(this.atlas,0,0);nc.filter='none';this.neutralAtlas=n;teamAtlases.set(this.atlas,{red:a,neutral:n});}
 glow(c,x,y,r,color){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,TAU);c.fill();}
 protectionZone(c,x,y,range,owner,preview=false){
 c.save();c.fillStyle=owner===1?'#42dfff12':'#ff778512';c.strokeStyle=preview?'#d6ff9ccc':owner===1?'#b8f7ff9c':'#ffb4c19c';c.lineWidth=preview?1.7:1;c.setLineDash(preview?[5,3]:[3,4]);c.beginPath();c.arc(x,y,range,0,TAU);c.fill();c.stroke();c.setLineDash([]);
 if(preview){c.fillStyle='#11324dda';c.beginPath();c.roundRect(x-24,y-range+4,48,12,4);c.fill();c.fillStyle='#e0ffff';c.font='800 7px HexRounded, Arial';c.textAlign='center';c.fillText('◈ '+Math.round(range),x,y-range+12);}
 c.restore();
 }
 draw(b,time=0){
 this.lastDrawTime=time;this.terrain(b);this.teamAtlas();const c=this.ctx;c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.fillStyle='#303d52';c.fillRect(0,0,this.canvas.width,this.canvas.height);c.save();const camera=this.camera;c.setTransform(camera.scale*this.dpr,0,0,camera.scale*this.dpr,camera.offsetX*this.dpr,camera.offsetY*this.dpr);c.beginPath();c.rect(0,0,WIDTH,HEIGHT);c.clip();c.drawImage(this.layer,0,0,WIDTH,HEIGHT);
 for(const e of b.entities)if(!this.hiddenEntities.has(e.uid)&&e.kind==='flak')this.protectionZone(c,e.x,e.y,e.range,e.owner);
 for(const e of b.entities)if(!this.hiddenEntities.has(e.uid)&&e.protect)for(const id of e.footprint){const h=b.grid.cells[id];if(h)this.hex(c,h,e.owner===0?'#64717e':e.owner===1?'#0963ab':'#b51d3d','#ffffff55');}
 for(const m of b.mines){c.fillStyle=m.owner===1?'#14497b':'#911832';c.beginPath();c.ellipse(m.x,m.y,4,2.8,0,0,TAU);c.fill();c.fillStyle='#ffde55';c.fillRect(m.x-1,m.y-2,2,2);}
 if(this.hover){const {id,size,valid,kind,range}=this.hover;const center=b.grid.cells[id];if(center&&kind==='flak'&&range)this.protectionZone(c,center.x,center.y,range,1,true);for(const n of b.grid.footprint(id,size)){const h=b.grid.cells[n];if(h)this.hex(c,h,valid?'#beff9099':'#ff173faa',valid?'#f6ffc4':'#ffbec8');}const h=b.grid.cells[id];if(h){c.strokeStyle=valid?'#faffb0':'#fc233c';c.lineWidth=1.8;c.beginPath();c.arc(h.x,h.y,17+Math.sin(time*.004)*1.5,0,TAU);c.stroke();}}
 for(const e of [...b.entities].sort((a,z)=>a.y-z.y)){
 if(this.hiddenEntities.has(e.uid))continue;
 const size=e.kind==='bee'?15:e.size===19?66:e.size===7?53:e.size===3?41:35,y=e.y-(e.flying?5+Math.sin(time*.007+e.uid)*1.6:0);
 c.fillStyle='#172d5570';c.beginPath();c.ellipse(e.x+2,e.y+size*.27,size*.38,size*.14,0,0,TAU);c.fill();
 c.save();c.translate(e.x,y);c.rotate(e.angle+Math.PI/2);
 if(e.kind==='bee'){c.fillStyle='#e6fbffbb';const wing=2+Math.sin(time*.045+e.uid)*1.5;for(const x of [-3,3]){c.beginPath();c.ellipse(x,-2,3,wing,x<0?-.4:.4,0,TAU);c.fill();}c.fillStyle=e.owner===1?'#ffcf34':'#ffa527';c.beginPath();c.ellipse(0,0,3,4.5,0,0,TAU);c.fill();c.fillStyle='#272539';c.fillRect(-2.7,0,5.4,1.7);c.beginPath();c.arc(0,-3.5,2,0,TAU);c.fill();}
 else if(this.atlas?.complete&&this.atlas.naturalWidth){const a=e.owner===0?this.neutralAtlas:e.owner===2?this.redAtlas:this.atlas,sw=a.width/4||a.naturalWidth/4,sh=a.height/5||a.naturalHeight/5;c.drawImage(a,e.sprite%4*sw,Math.floor(e.sprite/4)*sh,sw,sh,-size/2,-size/2,size,size);}
 c.restore();

 }
 c.lineCap='round';
 for(const p of b.projectiles){c.save();c.translate(p.x,p.y);c.rotate(Math.atan2(p.vy,p.vx));c.drawImage(projectileSprite(p.owner,p.kind==='arrow'),-21,-8,28,16);c.restore();}
 for(const f of b.effects){const a=Math.max(0,f.life/f.max);c.globalAlpha=Math.min(1,a*1.5);const col=f.owner===0?'#d4e1f5':f.owner===1?'#27e8ff':'#ffc665';c.strokeStyle=col;c.fillStyle=col;
 if(f.type==='damage'){c.font='800 10px HexRounded, Arial';c.textAlign='center';c.lineWidth=2.3;c.strokeStyle='#263246';c.fillStyle='#fff3b4';const y=f.y-19-(1-a)*16;c.strokeText('−'+f.amount,f.x,y);c.fillText('−'+f.amount,f.x,y);}
 else if(f.type==='beam'||f.type==='hit'){const sx=f.fromX??f.x,sy=f.fromY??f.y,ex=f.toX??f.x,ey=f.toY??f.y;for(const [width,alpha] of f.type==='beam'?[[14,.2],[8,.45],[3.4,1]]:[[3,.5],[1.1,1]]){c.globalAlpha=a*alpha;c.strokeStyle=width<4?'#fffff4':col;c.lineWidth=width;c.beginPath();c.moveTo(sx,sy);if(f.lightning)c.lineTo((sx+ex)/2+5,(sy+ey)/2-5);c.lineTo(ex,ey);c.stroke();}c.globalAlpha=a;this.glow(c,ex,ey,f.type==='beam'?23:9,col+'bb');for(let i=0;i<7;i++){const angle=i*TAU/7+f.x;c.lineWidth=1;c.beginPath();c.moveTo(ex,ey);c.lineTo(ex+Math.cos(angle)*(f.type==='beam'?19:6),ey+Math.sin(angle)*12);c.stroke();}}
 else if(f.type==='shell'){const t=1-a,x=f.x+(f.toX-f.x)*t,y=f.y+(f.toY-f.y)*t-Math.sin(t*Math.PI)*30;this.glow(c,x,y,9,'#fff4b188');c.fillStyle='#ffe095';c.beginPath();c.arc(x,y,4,0,TAU);c.fill();c.fillStyle='#fff4d6';c.beginPath();c.arc(x-1,y-1,1.5,0,TAU);c.fill();}
 else{const r=(f.radius||20)*(1-a)+2;this.glow(c,f.x,f.y,r,'#fff3ac66');c.strokeStyle=col;c.lineWidth=2;c.beginPath();c.arc(f.x,f.y,r,0,TAU);c.stroke();if(f.type==='blast')for(let j=0;j<9;j++){const angle=j*TAU/9+f.x,d=(1-a)*27;c.fillStyle=j%2?'#fff9c2':col;c.fillRect(f.x+Math.cos(angle)*d,f.y+Math.sin(angle)*d,2,3);}}
 c.globalAlpha=1;}
 // Draw status last so later weapon sprites and effects cannot obscure it.
 c.globalAlpha=1;for(const e of b.entities){ if(e.kind!=='bee'&&!this.hiddenEntities.has(e.uid)){const size=e.size===19?66:e.size===7?53:e.size===3?41:35,y=e.y-(e.flying?5+Math.sin(time*.007+e.uid)*1.6:0),position=healthBarPosition(e.x,y,size,camera);if(!position)continue;const bw=22,bx=position.x,by=position.y;c.fillStyle='#fff';c.fillRect(bx-1,by-1,bw+2,4.8);c.fillStyle='#223951';c.fillRect(bx,by,bw,2.8);c.fillStyle='#68ee83';c.fillRect(bx,by,bw*Math.max(0,e.hp/e.maxHP),2.8);c.fillStyle=e.owner===0?'#6b7481':e.owner===1?'#0569b9':'#bd183d';c.fillRect(bx-9,by-3,9,9);c.fillStyle='white';c.font='800 7.5px HexRounded, Arial';c.textAlign='center';c.fillText(e.owner===0?'◆':e.level,bx-4.5,by+4.2);}}
 c.restore();
 }
}


