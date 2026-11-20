import {currentLevel} from './src__progression__progress.js';
export const AVATARS=[
 {name:'Rookie Commander',ar:'القائد المبتدئ',level:1},
 {name:'Hive Keeper',ar:'حارس الخلية',weapon:'hive'},
 {name:'Azure Knight',ar:'الفارس الأزرق',level:2},
 {name:'Wild Ranger',ar:'حارسة البراري',weapon:'huntress'},
 {name:'Master Engineer',ar:'كبير المهندسين',level:3},
 {name:'Dune Scout',ar:'كشاف الصحراء',weapon:'ball'},
 {name:'Frost Mage',ar:'ساحرة الصقيع',level:6},
 {name:'Star Pilot',ar:'طيار النجوم',weapon:'alien'},
 {name:'Shadow Blade',ar:'نصل الظلال',weapon:'ninjas'},
 {name:'Corsair Captain',ar:'قبطان القراصنة',level:10},
 {name:'Dragon Tamer',ar:'مروّضة التنين',weapon:'flame'},
 {name:'Royal Commander',ar:'القائد الملكي',level:15}
];
export function unlockedAvatars(save){const level=currentLevel(save);return AVATARS.map((a,i)=>({a,i})).filter(({a})=>a.weapon?save.cards?.[a.weapon]?.owned:level>=a.level).map(v=>v.i);}
export function activeAvatar(save){return unlockedAvatars(save).includes(save.avatar)?save.avatar:0;}
export function chooseAvatar(save,index){if(!unlockedAvatars(save).includes(index))return false;save.avatar=index;return true;}
