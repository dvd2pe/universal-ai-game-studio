export const TACTICS={
hive:{role:['Swarm hunter','صياد سرب'],icon:'🐝',damage:10,range:5,strong:['mortar','laser'],weak:['flak','huntress'],pair:['flak','horn'],ability:['One sting · replaces lost bees','لدغة واحدة · تعويض النحل المفقود']},
laser:{role:['Line breaker','كاسر الخطوط'],icon:'☀️',damage:30,range:5,strong:['iron','tank'],weak:['hive','ninjas'],pair:['tesla','hive'],ability:['Beam · ignores bullet armor','شعاع · يتجاوز درع الطلقات']},
sweeper:{role:['Frontline fire','نيران أمامية'],icon:'🔫',damage:9,range:4,strong:['sapper','horn'],weak:['iron','deflector'],pair:['hive','mortar'],ability:['120° forward sweep','مسح أمامي 120°']},
horn:{role:['Wide coverage','تغطية واسعة'],icon:'📣',damage:9,range:4,strong:['sapper','grenadier'],weak:['iron','hive'],pair:['flak','mortar'],ability:['5-shot fan','مروحة من 5 طلقات']},
storm:{role:['Instant capture','سيطرة فورية'],icon:'🌩️',damage:0,range:5,strong:[],weak:['sweeper','horn'],pair:['sweeper','horn'],ability:['7 hexes · single use','7 سداسيات · استخدام واحد']},
flak:{role:['Air defense','دفاع جوي'],icon:'🎯',damage:16,range:3,strong:['hive','alien'],weak:['iron','mortar'],pair:['mortar','laser'],ability:['Air only · one-hit bees','الجوي فقط · يسقط النحل بضربة']},
sapper:{role:['Mine control','دفاع بالألغام'],icon:'💣',damage:0,range:1,strong:['sweeper','horn'],weak:['hive','iron'],pair:['mortar','huntress'],ability:['5 mines · intercept rounds','5 ألغام · اعتراض الطلقات']},
mortar:{role:['Area siege','حصار منطقة'],icon:'💥',damage:16,range:5,strong:['iron','tank'],weak:['hive','ninjas'],pair:['flak','huntress'],ability:['7-hex blast · armor breaker','انفجار 7 سداسيات · كسر الدروع']},
ninjas:{role:['Backline ambush','كمين خلفي'],icon:'🥷',damage:9,range:1,strong:['laser','mortar'],weak:['tesla','huntress'],pair:['horn','hive'],ability:['Two units · +30% vs structures','وحدتان · +30٪ ضد المنشآت']},
iron:{role:['Armored hunter','صياد مدرع'],icon:'🛡️',damage:15,range:1,strong:['sweeper','horn'],weak:['tesla','mortar'],pair:['flak','laser'],ability:['35% bullet resistance','مقاومة 35٪ للطلقات']},
alien:{role:['Flying raider','مهاجم طائر'],icon:'🛸',damage:10,range:2,strong:['sweeper','tank'],weak:['flak','hive'],pair:['mortar','horn'],ability:['Flying · ignores ground fire','طائر · يتجاوز النيران الأرضية']},
huntress:{role:['Backline guard','حارسة الخلف'],icon:'🏹',damage:12,range:4,strong:['ninjas','sapper'],weak:['mortar','laser'],pair:['mortar','sweeper'],ability:['+35% vs ground hunters','+35٪ ضد الصيادين الأرضيين']},
ballista:{role:['Piercing artillery','مدفعية خارقة'],icon:'🏹',damage:'25%',range:4,strong:['iron','tank'],weak:['hive','alien'],pair:['flak','iron'],ability:['4 arrows · 4 hexes per arrow','4 سهام · 4 سداسيات للسهم']},
grenadier:{role:['Splash support','دعم انفجاري'],icon:'💣',damage:22,range:4,strong:['iron','tank'],weak:['hive','ninjas'],pair:['flak','sweeper'],ability:['7-hex ground blast','انفجار أرضي من 7 سداسيات']},
tnt:{role:['Territory burst','دفعة سيطرة'],icon:'🧨',damage:0,range:1,strong:[],weak:['sweeper','iron'],pair:['horn','hive'],ability:['19-hex capture on arrival','احتلال 19 سداسيًا عند الوصول']},
ball:{role:['Rolling pressure','ضغط متدحرج'],icon:'⚙️',damage:40,range:1,strong:['sapper','horn'],weak:['laser','iron'],pair:['mortar','flak'],ability:['40 durability · impact damage','متانة 40 · ضرر اصطدام']},
deflector:{role:['Projectile defense','دفاع ضد الطلقات'],icon:'🪞',damage:0,range:2,strong:['sweeper','horn'],weak:['mortar','hive'],pair:['laser','mortar'],ability:['Reflects one nearby enemy round','يعكس طلقة عدو قريبة']},
flame:{role:['Close pressure','ضغط قريب'],icon:'🔥',damage:9,range:2,strong:['sapper','horn'],weak:['iron','hive'],pair:['flak','iron'],ability:['6 embers · short thrust','6 جمرات · دفع قصير']},
tank:{role:['Armored advance','تقدم مدرع'],icon:'🛡️',damage:9,range:4,strong:['sweeper','horn'],weak:['mortar','ballista'],pair:['flak','huntress'],ability:['30% bullet resistance','مقاومة 30٪ للطلقات']},
tesla:{role:['Crowd defense','دفاع ضد المجموعات'],icon:'⚡',damage:17,range:3,strong:['ninjas','iron'],weak:['hive','alien'],pair:['laser','mortar'],ability:['Chains 3 · brief stun','سلسلة إلى 3 · صعق قصير']}
};
export function damageModifier(kind,target){if(kind==='normal'&&target.id==='iron')return .65;if(kind==='normal'&&target.id==='tank')return .7;if(kind==='blast'&&['iron','tank'].includes(target.id))return 1.25;if(kind==='huntress'&&target.mobile&&!target.flying)return 1.35;if(kind==='ninjas'&&!target.mobile)return 1.3;return 1;}
export const FEATURED=['hive','laser','sapper','ball','huntress','ninjas','iron','grenadier','ballista','tnt','alien','tesla','deflector','flame','tank'];
