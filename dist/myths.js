import {ENEMIES,MAPS,BY_ID} from './data.js';
import {CHAPTERS} from './journey-content.js';

// Mythic foundations inspire these rules; this campaign is not a scriptural chronology.
const foe=(name,cell,hp,speed,hint,extra={})=>({name,family:2,atlas:'myth-enemies',cell,hp,speed,reward:18,armour:0,shield:1,quote:'This road is disputed. Hear our cause.',hint,...extra});
Object.assign(ENEMIES,{
 naga:foe('Naga pool guardian',0,150,36,'Territorial guardians emerge farther along the river route. Cover the pools, not only the entrance.',{armour:.2}),
 venom:foe('Naga mist bearer',1,110,40,'Mist conceals nearby allies. Saraswati reveals them; defeat the bearer to disperse the mist.'),
 vanara:foe('Vanara offering raider',2,65,76,'These hungry raiders are not asura allies. Turn them back before they steal 20 offerings.',{raid:true}),
 stone:foe('Vanara stone thrower',3,105,48,'A sturdy member of the raiding band. Vayu’s heavy strikes answer its endurance.',{raid:true,armour:.15}),
 standard:foe('Yaksha standard bearer',4,240,30,'Its banner reinforces nearby allies’ armour. Prithvi cracks armour; elemental attacks bypass it.',{armour:.35}),
 breaker:foe('Ritual-breaking rakshasa',5,180,42,'Reaching the sanctuary disrupts the rite and removes three shield. Guard the final approach.',{family:1,shield:3}),
 seed:{name:'Raktabija echo',family:3,atlas:'myth-bosses',cell:3,hp:65,speed:52,reward:0,armour:0,shield:1,quote:'One becomes many.',hint:'A magical echo, not another full boss. Kali prevents new echoes; existing echoes still need to be defeated.'}
});
Object.assign(BY_ID.varuna,{role:'Returning current',description:'Light water damage washes ground foes backwards once, then marks them Wet for five seconds. Each foe resists further regular washback for four seconds, shared across all Varuna shrines. Flying foes resist the current; bosses move less.',changes:['Stronger water damage, greater reach and a longer washback.','Every third attack washes a wider group backwards.']});
const bosses=[
 [2,'mahisha','Mahishasura',0,'Mahishasura changes between buffalo and warrior forms. He signals a charge, rushes for two seconds, then recovers. Durga stops a charge; her strike deals 60% more damage during recovery. His boon blocks shrine damage until Durga lands an empowered strike. Establish Durga before the final wave; that wave supplies a full intervention meter.','Who among you will challenge me?'],
 [3,'raktabija','Raktabija',3,'Damaging Raktabija creates a magical echo at most once every three seconds (maximum six at once). Call Kali using the story action to prevent new echoes for ten seconds.','Every blow brings another of me.'],
 [4,'vritra','Vritra',2,'Vritra binds the waters: a new coil forms every six seconds, reducing damage received. Actual Indra hits break coils, at most once per second. Place lightning within reach.','The waters will not pass.']
];
for(const [i,boon,name,cell,hint,quote] of bosses)Object.assign(MAPS[i],{boss:boon,bossName:name,bossProtection:null,boon:hint,quote,bossAtlas:'myth-bosses',bossCell:cell});

const story=[
 {names:['The hungry raiding band','The interrupted rite','The armoured advance'],scenes:[
 'The village well is almost dry. Thunder rolls above the mountains, but no rain comes. A displaced vanara band raids the offerings while Mira arranges food beyond the grove. They have no part in the asura occupation.',
 'These temples shelter the river communities and maintain its old sacred protections. A rishi tends the grove’s protective flame while rakshasas try to interrupt the rite. Guard the bearers and keep the sanctuary open.',
 'An Armoured General bars the road upstream. His marching armour opens when he pauses; Agni’s protection makes fire ineffective. Defeat him so the villagers can shelter here and the party can investigate the failing river.'],
 outro:'The grove’s lamps relight. Families return to the sanctuary, but the well is still low. Protecting the temple has saved their refuge; the river itself must be freed upstream.',
 next:'Kapi finds orders closing the Lotus Crossing. Someone wants the settlements cut off from one another.'},
 {names:['The disputed pools','Return the river stone','Dharan’s oath'],scenes:[
 'Naga guardians blame the river works for their shrinking pools. Beneath an old image of Vishnu, pilgrims wait for shelter at the crossing. Defend them while Mira seeks a settlement. The guardians are not allies of the asuras.',
 'The keepers agree to return a displaced river stone. Escort it to safety and the naga guardians withdraw. Their leader reports that even untouched pools upstream are drying: the obstruction is farther towards the source.',
 'Dharan once guarded safe passage here. An oath now binds him to the bearer of the river seal, and asura soldiers use it to close the crossing. Break their hold so he can return to his original duty.'],
 outro:'Dharan lays down the disputed seal and joins the party. Pilgrims return to the crossing. His orders bear Mahishasura’s mark; the town upstream is under occupation.',
 next:'“The water is being rationed to those who submit,” Dharan says. “We will find the orders in the town.”'},
 {names:['The occupied market','The false streets','Mahishasura’s challenge'],scenes:[
 'Mahishasura offers water and protection in exchange for obedience. Soldiers hold both streets leading to the temple, where families have taken refuge. Secure the approaches and recover the town’s festival lamps.',
 'An Illusionist enters during wave five, using false doorways and veiled copies to conceal the occupation. Among the recovered orders is a pact: Vritra binds the river, Mahishasura rules the weakened settlements, and Raktabija guards the ascent to the source.',
 'Mahishasura’s boast rests on Brahma’s boon. Durga must break his protection. Establish her shrine before the final wave, which supplies a full intervention meter. Her empowered strike stops his charge; striking during recovery deals more damage.'],
 outro:'Mahishasura is overcome. The market reopens and the temple shelters the town freely again. The captured orders reveal the route taken by Raktabija’s multiplying host.',
 next:'Defeating the occupation has not released the water. The party must get past the mountain army and reach Vritra.'},
 {names:['The stranded keepers','The rescue through the mist','Raktabija’s multiplying host'],scenes:[
 'Leela and the mountain keepers are trapped below their sanctuary. A little water still gathers beside a Shiva shrine, enough for the wounded. Raktabija’s army has cut off the ascent. Secure a way for the keepers to escape.',
 'Escort the mountain keepers through the fighting. A Mist Stalker enters during wave five; Saraswati reveals him. The keepers know a sheltered passage to the source that the occupying army has overlooked.',
 'Raktabija guards the ascent under his pact with Vritra and Mahishasura. His multiplying host punishes repeated attacks. Kali offers temporary aid in this battle: Call Kali replaces the regional action while he is present and prevents new echoes for ten seconds. She is not another buildable shrine.'],
 outro:'Raktabija’s host is overcome. The rescued keepers reopen their sanctuary and lead the party through the sheltered passage to the source. Leela sends two keepers ahead to secure the remaining water channel.',
 next:'“That path gets us there,” Leela says. “The rest will depend on the defence.”'},
 {names:['The last open channel','The seven lamps','Vritra and the bound waters'],scenes:[
 'The mountain keepers guide you to the First Spring and secure one narrow water channel. It is the same water needed by the grove, the crossing and the town. Protect the sanctuary against the remnants of the alliance.',
 'Bring seven lamps to the sanctuary, one for each buildable shrine. A Seal Bearer enters during wave five and cycles protection between fire, water and lightning. Keep several damage sources ready as Vritra gathers at the spring.',
 'With his allies defeated, Vritra tightens his coils around the waters. Indra’s actual lightning hits must reach him to break their growing strength. Hold the sanctuary until the river is free to flow through the protected settlements.'],
 outro:'Vritra falls. Water returns to the mountain pools, passes through the reopened town and the Lotus Crossing, and reaches the village well beneath the banyan. The temples shelter returning families as their lamps answer one another along the river.',
 next:'The alliance is broken. Scattered hosts still approach the source, and the keepers maintain the Unending Vigil.'}
];
story.forEach((chapter,i)=>{CHAPTERS[i].encounters=chapter.names;CHAPTERS[i].scenes=chapter.scenes;Object.assign(MAPS[i],{intro:chapter.scenes[0],outro:chapter.outro,next:chapter.next});});
CHAPTERS[1].objective='Escort the river stone';CHAPTERS[1].escort='The stone bearers';
CHAPTERS[3].objective='Rescue the mountain keepers';
MAPS[0].bossName='Armoured General';

MAPS[2].alternatePoints=[[0,440],[220,440],[220,185],[570,185],[570,440],[1010,440],[1010,390],[1200,390]];
export function mythWaves(b,w){
 if(b.mode==='survival')return w;
 if(b.encounter===0)w=[w[0],w[1],w[3],w[5]];if(b.encounter===1)w=[...w.slice(0,5),w[6]];
 if(b.encounter===0&&b.mapIndex===2)w=w.map(g=>g.map((e,i)=>({...e,lane:i%2})));
 if(b.encounter===0&&b.mapIndex===0)return w.map((g,i)=>g.map((_,k)=>({type:i>1&&k%3===0?'stone':'vanara'})));
 if(b.encounter===0&&b.mapIndex===1)return w.map((g,i)=>g.map((_,k)=>({type:i>1&&k%4===0?'venom':'naga',emerge:k%3===0?.32:0})));
 if(b.encounter===1){w=w.map(g=>g.map(x=>({...x})));if(b.mapIndex===0)w=w.map(g=>g.map((x,k)=>k%3===0?{type:'breaker'}:x));if(b.mapIndex===1)w=w.map(g=>g.map((x,k)=>k%4===0?{type:'naga',emerge:.32}:x));
 const elites={2:{name:'Illusionist',boon:'mirror',protection:'agni'},3:{name:'Mist Stalker',boon:'night',protection:'indra'},4:{name:'Seal Bearer',boon:'seals',protection:'agni'}};
 if(elites[b.mapIndex])w[4].splice(4,0,{type:'asura',...elites[b.mapIndex],scale:3,elite:true});
 }
 if(b.encounter===2&&b.mapIndex>0)w[5].push({type:'standard'});
 return w;
}
export function mythSpawn(b,e,spec){
 if(spec.emerge)e.distance=b.route.total*spec.emerge;
 // This early commander should not be harder to pass than the final alliance bosses.
 if(e.boon==='oath'&&b.difficulty==='difficult'){e.hp*=.7;e.maxHp*=.7;}
 if(e.boss&&['mahisha','raktabija','vritra'].includes(e.boon)){e.atlas=b.map.bossAtlas;e.cell=b.map.bossCell;e.speed=18;e.shield=b.map.shield;e.reward=110;e.protection=null;e.coils=e.boon==='vritra'?2:0;e.nextCoil=b.time+6;e.coilHitAt=-1;e.seedAt=0;e.arrivedAt=b.time;e.nextEscort=b.time+15;}
}
export function mythTick(b){
 for(const e of b.enemies){e.mistHidden=false;e.bannerArmour=0;}
 for(const e of b.enemies.filter(e=>e.hp>0)){
 if(e.type==='venom')for(const t of b.enemies)if(t!==e&&Math.abs(t.distance-e.distance)<140)t.mistHidden=true;
 if(e.type==='standard')for(const t of b.enemies)if(t!==e&&Math.abs(t.distance-e.distance)<160)t.bannerArmour=.2;
 if(e.boon==='mahisha'){const age=b.time-e.arrivedAt,cycle=Math.floor(age/12),phase=age%12;e.winding=phase>=4&&phase<6;e.charging=phase>=6&&phase<8&&e.chargeStoppedCycle!==cycle;e.recovering=phase>=8&&phase<11||e.chargeStoppedCycle===cycle;e.cell=e.charging||e.winding?0:1;e.speed=e.winding?0:e.charging?65:e.recovering?8:18;if(age<40&&b.time>=e.nextEscort){e.nextEscort=b.time+15;b.spawn({type:'rakshasa',waveId:e.waveId},Math.max(0,e.distance-100));}}
 if(e.boon==='vritra'&&b.time>=e.nextCoil){e.coils=Math.min(5,e.coils+1);e.nextCoil=b.time+6;}
 }
 if(b.mapIndex===1&&b.encounter===1&&b.escort.state==='safe'){
 const hostile=e=>!['naga','venom'].includes(e.type);b.enemies=b.enemies.filter(hostile);b.queue=b.queue.filter(hostile);b.waves=b.waves.map(g=>g.filter(hostile));
 }
}
export function mythDamage(b,e,amount,id){
 if(e.boon==='mahisha'&&!e.boonBroken)return 0;
 if(e.boon==='vritra'){if(id==='indra'&&b.time>=e.coilHitAt){e.coils=Math.max(0,e.coils-1);e.coilHitAt=b.time+1;}amount*=1-e.coils*.13;}
 if(e.boon==='raktabija'&&amount>0&&e.seedAt<=b.time&&!(b.kaliUntil>b.time)&&b.enemies.filter(t=>t.type==='seed'&&t.hp>0).length<6){e.seedAt=b.time+3;b.spawn({type:'seed',waveId:e.waveId},Math.max(0,e.distance-55));}
 return amount;
}
export function useKali(b){if(b.status!=='fighting'||!b.enemies.some(e=>e.boon==='raktabija')||b.time<(b.kaliReadyAt||0))return false;b.kaliUntil=b.time+10;b.kaliReadyAt=b.time+18;b.effects.push({type:'kali',x:600,y:260,life:2,max:2});b.notify('feature','Kali catches the multiplying seeds. New echoes are prevented for ten seconds.');return true;}
