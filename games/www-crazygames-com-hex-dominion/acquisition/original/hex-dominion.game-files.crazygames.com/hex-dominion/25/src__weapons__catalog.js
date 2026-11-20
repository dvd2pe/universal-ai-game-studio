// Every game system consumes these definitions.
export const WEAPONS = [
 ['hive','Bee Hive','خلية النحل',6,7,60,1,'rare','hive',3,0,'Three slow bees each sting once, then perish. Replacements start at 3 seconds and become faster with upgrades.','ثلاث نحلات بطيئة، تلدغ كل منها مرة واحدة ثم تموت. يبدأ تعويض كل نحلة من 3 ثوانٍ ويصبح أسرع مع الترقيات.'],
 ['laser','Sunray Laser','شعاع الشمس',9,7,45,2,'epic','laser',8,0,'A charged beam captures a thin line and deals 30 damage to ground enemies.','شعاع يحتل خطاً رفيعاً ويضر الأعداء الأرضيين بقوة 30.'],
 ['sweeper','Trench Sweeper','الرشاش الكاسح',6,19,75,1,'common','spray',0.4,0,'Sweeps 120° toward the enemy. Each round takes one hex or deals 9 damage to a ground enemy.','يمسح 120 درجة نحو الخصم. كل طلقة تحتل سداسياً أو تضر عدواً أرضياً بقوة 9.'],
 ['horn','Pulse Horn','بوق النبض',5,7,55,1,'common','horn',3,0,'Five rounds in a wide fan capture land or hit ground enemies.','خمس طلقات على شكل مروحة تحتل الأرض أو تصيب العدو الأرضي.'],
 ['storm','Storm Beacon','منارة العاصفة',4,1,30,6,'rare','storm',1,0,'Single use: strikes seven hexes near the front.','استخدام واحد: يضرب سبعة سداسيات قرب الجبهة.'],
 ['flak','Flak Nest','مضاد الطيران',4,7,60,1,'rare','flak',1.15,90,'A local air-defense zone. Protect nearby weapons from bees and flyers; upgrades expand its radius.','مجال دفاع جوي محلي يحمي الأسلحة القريبة من النحل والطيران، وتتسع دائرته بالترقية.'],
 ['sapper','Mine Sapper','زارع الألغام',6,3,50,3,'common','sapper',5,13,'Lays up to five mines. Enemy rounds trigger seven-hex bursts.','يضع خمسة ألغام تنفجر بسبعة سداسيات عند إصابتها.'],
 ['mortar','Siege Mortar','مدفع الحصار',7,19,70,1,'rare','mortar',3.4,0,'Arcing shells capture seven hexes and deal 16 ground blast damage.','قذائف قوسية تحتل سبعة سداسيات وتضر الوحدات الأرضية بقوة 16.'],
 ['ninjas','Shadow Ninjas','نينجا الظلال',8,3,28,6,'epic','ninjas',0.9,23,'Two ground hunters ambush the enemy backline.','صيادان أرضيان يهاجمان أسلحة الخط الخلفي.'],
 ['iron','Iron Wanderer','الفارس الحديدي',7,3,110,7,'rare','hunter',1.1,18,'A tough swordsman. Cannot strike flying enemies.','مقاتل قوي بسيف لا يستطيع ضرب الوحدات الجوية.'],
 ['alien','Alien Raider','الغزاة الفضائيون',8,7,75,11,'epic','alien',1.2,22,'Flying hunter; vulnerable to bees and flak.','صياد طائر تضعفه خلايا النحل ومضادات الطيران.'],
 ['huntress','Longbow Huntress','رامية القوس',5,3,45,5,'common','huntress',1.3,150,'Long-range defense against weapon hunters.','دفاع بعيد المدى ضد صيادي الأسلحة.'],
 ['ballista','Quad Ballista','المنجنيق الرباعي',7,7,60,9,'epic','ballista',5,0,'Four arrows pierce four hexes each; stop at weapons.','أربعة سهام يخترق كل منها أربعة سداسيات وتتوقف عند السلاح.'],
 ['grenadier','Grenadier','قاذف القنابل',8,3,60,8,'epic','grenadier',3,0,'Seven-hex explosions also damage nearby enemies.','انفجارات بسبعة سداسيات تضر وحدات الخصم القريبة.'],
 ['tnt','TNT Roller','برميل المتفجرات',6,3,65,10,'rare','tnt',1,24,'Zigzags to hostile land, then captures 19 hexes.','يتعرج نحو الأرض غير المملوكة ثم ينفجر ضمن 19 سداسياً.'],
 ['ball','Siege Ball','كرة الحصار',6,3,40,4,'common','ball',1,28,'Rolls and captures up to 40 hexes; durability becomes impact damage.','تتدحرج وتحتل حتى 40 سداسياً ومتانتها تتحول لضرر اصطدام.'],
 ['deflector','Deflector Tower','برج العاكس',5,7,55,13,'rare','deflector',1.8,50,'Converts a nearby enemy capture round to your side.','يحوّل طلقة سيطرة قريبة للخصم إلى جانبك.'],
 ['flame','Flame Projector','قاذف اللهب',6,7,70,14,'common','flame',2.5,0,'Six capture embers. Best deployed near the front.','ست طلقات سيطرة قصيرة الدفع، الأفضل قرب الجبهة.'],
 ['tank','Trench Tank','دبابة الخنادق',10,19,140,15,'epic','tank',0.65,10,'Advances and fires. Tracks do not capture land.','تتقدم وتطلق النار ولا تحتل الأرض بمجرد مرورها.'],
 ['tesla','Tesla Cage','قفص تسلا',7,7,75,12,'epic','tesla',1.7,90,'Chains lightning through three ground hunters.','صاعقة متسلسلة تصيب ثلاثة صيادين أرضيين.']
].map((w,index)=>({id:w[0],name:w[1],ar:w[2],cost:w[3],size:w[4],hp:w[5],unlock:w[6],rarity:w[7],kind:w[8],interval:w[9],range:w[10],description:w[11],descriptionAr:w[12],sprite:index,tags:['hive','flak','ninjas','hunter','alien','huntress','tesla'].includes(w[8])?['hunter',...(['hive','flak','alien','huntress'].includes(w[8])?['anti-air']:['anti-ground'])]:['territory'],protect:['laser','spray','horn','mortar','ballista','flame'].includes(w[8])}));
export const CATALOG=Object.fromEntries(WEAPONS.map(w=>[w.id,w]));
export const STARTER=['sweeper','horn','hive','flak','mortar'];
// Add 1% of base attack rate per card level, replacing the old 0.6% scaling.
// Level 30 caps the rate at 1.29x; movement and damage are separate rules.
export const stats=(id,level=1)=>{const d=CATALOG[id],l=Math.max(1,Math.min(30,level));return {...d,hp:d.hp*(1+(l-1)*.025),interval:d.interval/(1+(l-1)*.01),range:d.kind==='flak'?Math.min(120,d.range+(l-1)*1.5):d.range,level:l};};
