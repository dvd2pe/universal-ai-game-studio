import {WIDTH,HEIGHT} from './src__territory__grid.js';
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
export function healthBarPosition(x,y,size,camera){
 const left=Math.max(0,-camera.offsetX/camera.scale),top=Math.max(0,-camera.offsetY/camera.scale);
 const right=Math.min(WIDTH,(camera.width-camera.offsetX)/camera.scale),bottom=Math.min(HEIGHT,(camera.height-camera.offsetY)/camera.scale);
 if(x+size/2<left||x-size/2>right||y+size/2<top||y-size/2>bottom||right-left<34||bottom-top<11)return null;
 // Inset the entire badge and bar, including their border, from rounded canvas edges.
 return {x:clamp(x-8,left+11,right-25),y:clamp(y-size*.53,top+5,bottom-8)};
}
