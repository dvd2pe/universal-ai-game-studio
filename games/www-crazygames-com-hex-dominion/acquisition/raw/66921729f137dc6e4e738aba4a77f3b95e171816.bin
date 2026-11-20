// One bounded cosmetic search per match; no network or progression changes.
export const MATCH_SEARCH_MS=3000;
const candidateTimes=[220,460,720,1020,1370,1760,2160];
export function createMatchSearch({schedule=setTimeout,unschedule=clearTimeout}={}){
 let generation=0;const timers=new Set();
 function cancel(){generation++;for(const timer of timers)unschedule(timer);timers.clear();}
 function start({isCurrent=()=>true,onCandidate,onFound,onComplete}){
  cancel();const run=generation;
  const later=(delay,callback)=>{const timer=schedule(()=>{timers.delete(timer);if(run===generation&&isCurrent())callback();},delay);timers.add(timer);};
  for(const time of candidateTimes)later(time,()=>onCandidate());
  later(2350,()=>onFound());
  later(MATCH_SEARCH_MS,()=>{cancel();onComplete();});
 }
 return {start,cancel};
}
