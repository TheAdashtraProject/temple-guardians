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
 [2,'mahisha','Mahishasura',0,'Mahishasura changes between buffalo and warrior forms. His boon blocks shrine damage until Durga lands an empowered strike. Establish Durga before the final wave; that wave supplies a full intervention meter.','Who among you will challenge me?'],
 [3,'raktabija','Raktabija',3,'Damaging Raktabija creates a magical echo at most once every three seconds (maximum six at once). Call Kali using the story action to prevent new echoes for ten seconds.','Every blow brings another of me.'],
 [4,'vritra','Vritra',2,'Vritra binds the waters: a new coil forms every six seconds, reducing damage received. Actual Indra hits break coils, at most once per second. Place lightning within reach.','The waters will not pass.']
];
for(const [i,boon,name,cell,hint,quote] of bosses)Object.assign(MAPS[i],{boss:boon,bossName:name,bossProtection:null,boon:hint,quote,bossAtlas:'myth-bosses',bossCell:cell});
CHAPTERS[0].encounters[0]='The hungry raiding band';
CHAPTERS[0].scenes[0]='A vanara band, driven from its feeding grounds, raids the village offerings. Turn the raiders back while Mira arranges food beyond the grove. They are not servants of the asuras.';
CHAPTERS[0].encounters[1]='The interrupted rite';
CHAPTERS[0].scenes[1]='A rishi rekindles the sanctuary’s protective rite. Rakshasas try to interrupt it. Guard the final approach and escort the sacred flame. This original episode draws on the Ramayana’s theme of defending a rishi’s sacrifice.';
CHAPTERS[1].encounters[0]='The disputed pools';
CHAPTERS[1].scenes[0]='Naga guardians believe the new river steps have disturbed their pools. They emerge beside the crossing, not just at the road entrance. Defend the pilgrims while Mira seeks a settlement; these guardians are not asura allies.';
CHAPTERS[1].encounters[1]='Return the river stone';
CHAPTERS[1].scenes[1]='The keepers agree to return a displaced river stone. Escort its bearers to safety: naga guardians then withdraw from this encounter, leaving the asura occupation to confront.';
CHAPTERS[2].encounters[2]='Mahishasura’s challenge';
CHAPTERS[2].scenes[2]='Beyond Mayadhara’s false streets, Mahishasura challenges the town. Establish Durga before the last wave. Call her intervention, then aim her empowered strike at him to break his boon. The other shrines can then help finish the defence.';
CHAPTERS[3].encounters[2]='Raktabija’s multiplying host';
CHAPTERS[3].scenes[2]='Raktabija blocks the mountain ascent. His magic turns wounds into new foes. Kali joins this encounter as a temporary story action: time her aid before your strongest attacks to catch the seeds of his multiplying host.';
CHAPTERS[4].encounters[2]='Vritra and the bound waters';
CHAPTERS[4].scenes[2]='Beyond Rudhiraksha’s broken seals, Vritra binds the river at its source. Indra’s lightning must reach him to break the accumulating coils. Release the waters and reconnect every temple along the river.';
Object.assign(MAPS[2],{intro:CHAPTERS[2].scenes[2],outro:'Mahishasura’s boon is broken. The town opens its doors, and the festival lamps shine again.',next:'The mountain road is open, but a multiplying host waits above the dry pools.'});
Object.assign(MAPS[3],{intro:CHAPTERS[3].scenes[2],outro:'With Kali’s aid, the multiplying host is overcome. The keepers reopen the mountain sanctuary.',next:'At the source, Vritra’s coils still bind the waters. Indra’s lightning will be needed.'});
Object.assign(MAPS[4],{intro:CHAPTERS[4].scenes[2],note:'Break Vritra’s coils and release the river.',outro:'Vritra falls. The waters run through the mountain pools, the town, the lotus crossing and the banyan grove. Lamps answer one another along the river.'});

CHAPTERS[2].encounters[1]='Mayadhara’s false streets';
CHAPTERS[2].scenes[1]='Recover the festival lamps from Mayadhara. He enters during wave five: lightning makes veiled copies, so prepare Saraswati and another damage source.';
CHAPTERS[3].scenes[1]='Escort the mountain keepers through Nishachara’s mist. He enters during wave five; Saraswati reveals him.';
CHAPTERS[4].scenes[1]='Bring the seven lamps past Rudhiraksha’s last seal. He enters during wave five and cycles protection between fire, water and lightning.';

export function mythWaves(b,w){
 if(b.mode==='survival')return w;
 if(b.encounter===0&&b.mapIndex===0)return w.map((g,i)=>g.map((_,k)=>({type:i>1&&k%3===0?'stone':'vanara'})));
 if(b.encounter===0&&b.mapIndex===1)return w.map((g,i)=>g.map((_,k)=>({type:i>1&&k%4===0?'venom':'naga',emerge:k%3===0?.32:0})));
 if(b.encounter===1){w=w.map(g=>g.map(x=>({...x})));if(b.mapIndex===0)w=w.map(g=>g.map((x,k)=>k%3===0?{type:'breaker'}:x));if(b.mapIndex===1)w=w.map(g=>g.map((x,k)=>k%4===0?{type:'naga',emerge:.32}:x));
 const elites={2:{name:'Mayadhara',boon:'mirror',protection:'agni'},3:{name:'Nishachara',boon:'night',protection:'indra'},4:{name:'Rudhiraksha',boon:'seals',protection:'agni'}};
 if(elites[b.mapIndex])w[4].splice(4,0,{type:'asura',...elites[b.mapIndex],scale:3,elite:true});
 }
 if(b.encounter===2&&b.mapIndex>0)w[5].push({type:'standard'});
 return w;
}
export function mythSpawn(b,e,spec){
 if(spec.emerge)e.distance=b.route.total*spec.emerge;
 if(e.boss&&['mahisha','raktabija','vritra'].includes(e.boon)){e.atlas=b.map.bossAtlas;e.cell=b.map.bossCell;e.speed=18;e.shield=b.map.shield;e.reward=110;e.protection=null;e.coils=e.boon==='vritra'?2:0;e.nextCoil=b.time+6;e.coilHitAt=-1;e.seedAt=0;}
}
export function mythTick(b){
 for(const e of b.enemies){e.mistHidden=false;e.bannerArmour=0;}
 for(const e of b.enemies.filter(e=>e.hp>0)){
 if(e.type==='venom')for(const t of b.enemies)if(t!==e&&Math.abs(t.distance-e.distance)<140)t.mistHidden=true;
 if(e.type==='standard')for(const t of b.enemies)if(t!==e&&Math.abs(t.distance-e.distance)<160)t.bannerArmour=.2;
 if(e.boon==='mahisha'){e.cell=Math.floor(b.time/6)%2;e.speed=e.cell===0?23:15;}
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
