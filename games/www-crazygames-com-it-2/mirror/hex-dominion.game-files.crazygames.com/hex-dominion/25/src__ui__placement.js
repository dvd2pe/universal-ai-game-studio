// Selection and rendering share the same affordability check as deployment.
export function canAffordHandCard(battle,index){
 if(!battle||!Number.isInteger(index)||index<0||index>2)return false;
 const side=battle.sides[1],id=side.queue[index];
 return !!id&&side.energy>=battle.cost(1,id);
}
