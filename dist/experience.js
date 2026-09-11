export const CAST={
 mira:{name:'Mira',role:'Temple keeper',colour:'#966332'},
 kapi:{name:'Kapi',role:'Vanara scout',colour:'#aa6231'},
 dharan:{name:'Dharan',role:'Yaksha guardian',colour:'#427365'},
 leela:{name:'Leela',role:'Mountain keeper',colour:'#5b6590'}
};
const briefings=[
 [['mira','The raiders are hungry. Hold them here while we put food beyond the grove.'],['kapi','I know a clear way through. Mostly clear. Keep an eye on the flame bearers.'],['mira','Watch his feet. When he stops marching, that armour opens.']],
 [['kapi','I checked the bridge. And underneath it. You’ll want shrines on both sides.'],['mira','The stone belongs beside the pools. Get it back there, and we may end this without another fight.'],['mira','Dharan kept this crossing safe long before that seal arrived. Break its hold.']],
 [['dharan','Two streets. One sanctuary. Leave either street unguarded and they will use it.'],['kapi','That doorway was on the other side a moment ago. I don’t trust a house that moves.'],['dharan','His charge is coming. Durga can stop it now—or wait for the opening after it.']],
 [['leela','Those pools have never been dry. Something above us is holding the water.'],['dharan','The keepers have the right of passage. I intend to enforce it.'],['leela','Wait for Kali’s aid, then strike together. Otherwise we give him another army.']],
 [['leela','There. One channel still running. Keep the soldiers away from it.'],['kapi','Seven lamps. I counted them twice. Dharan made me.'],['mira','The grove, the crossing, the town—all of them need this water. Keep Indra within reach.']]
];
export function briefingFor(b,j){
 if(b.mode==='survival')return {speaker:'dharan',text:'The road is open. Keeping it open is our work now.'};
 if(b.mapIndex===0&&b.encounter===0&&!j.metMira)return {speaker:'mira',text:'I’m Mira, the temple keeper. Help me hold the grove while the villagers return.'};
 const [speaker,text]=briefings[b.mapIndex][b.encounter];return {speaker,text};
}
export function targetAvailability(b,plot,kind='strike'){
 const s=b.shrines.find(s=>s.plot===plot);
 if(b.status!=='fighting')return {ok:false,label:b.status==='planning'?'Waiting for the wave':'Battle ended'};
 if(!s)return {ok:false,label:'Choose a shrine'};
 if(kind==='strike'&&s.cooldown>0)return {ok:false,label:`Recharging · ${Math.ceil(s.cooldown)}s`};
 if(kind==='intervention'&&b.meter<100)return {ok:false,label:'Intervention is charging'};
 if(!b.enemies.some(e=>b.canAffect(e,s.deity)&&b.visible(e)))return {ok:false,label:'No visible targets'};
 return {ok:true,label:s.empowered?'Choose foe · empowered strike':'Choose a foe for Durga'};
}
export function encounterStyle(b){
 if(b.mode==='survival')return 'Endless defence';
 if(b.encounter===0)return b.mapIndex===2?'Two approaches · defend both streets':b.mapIndex===0?'Four short raids':b.mapIndex===1?'Four waves · guard the pools':'Four waves · secure the approach';
 if(b.encounter===1)return 'Six waves · choose your escort window';
 return 'Eight waves · commander confrontation';
}
export function fieldLine(b){
 if(b.shield<=7)return {speaker:b.mapIndex>2?'leela':'mira',text:'They’re through the outer defence. Watch the last turn.'};
 const boss=b.enemies.find(e=>e.boon==='mahisha');
 if(boss&&!boss.boonBroken)return {speaker:'dharan',text:boss.charging?'He’s charging. Durga can stop him.':'The charge will leave him exposed. Decide when to strike.'};
 if(b.escort.state==='safe'&&b.mapIndex===1&&b.encounter===1)return {speaker:'mira',text:'The stone is home. Look—the naga guardians are withdrawing.'};
 const lines={
 '0:0:2':['mira','The food is ready beyond the grove. Keep them away from the lamps.'],
 '0:1:2':['kapi','A procession walks very slowly. I’m beginning to understand why you needed help.'],
 '1:0:3':['kapi','Mist on the water. That is not ordinary mist.'],
 '1:2:4':['mira','Hold the crossing. I’m trying to reach him.'],
 '2:0:2':['dharan','I said both streets.'],
 '2:1:5':['kapi','Found him. Unless that’s another one.'],
 '3:1:2':['dharan','Stay with the keepers. The ledge can wait.'],
 '3:2:8':['leela','Kali is here. Bring your strongest attacks together.'],
 '4:1:2':['kapi','Dharan says I may carry one lamp. One.'],
 '4:2:8':['mira','Listen. Beneath that thunder, the river is moving.']
 };const line=lines[`${b.mapIndex}:${b.encounter}:${b.wave}`];return line?{speaker:line[0],text:line[1]}:null;
}
export function victoryLine(b){
 if(b.mapIndex===0&&b.encounter===0)return 'The vanara band accepts food outside the grove. Kapi stays behind: he knows the river paths, and insists you will get lost without him.';
 if(b.mapIndex===1&&b.encounter===1)return b.escort.state==='safe'?'The river stone is returned. Naga guardians leave the steps, and the pilgrims begin crossing again.':'The road is held, but the river stone has not reached its place. The keepers will have to return under guard.';
 if(b.mapIndex===1&&b.encounter===2)return 'Dharan lays down the disputed seal. “The oath is ended. My responsibility is not.” He joins the journey upriver.';
 if(b.mapIndex===2&&b.encounter===2)return 'The market opens. Captured orders confirm the alliance: Vritra holds the waters and Raktabija guards the source. Kapi finds the sweet stalls before Dharan can gather everyone for the climb.';
 if(b.mapIndex===3&&b.encounter===2)return 'The rescued keepers reopen their sanctuary. Leela leads the party along a sheltered passage to the source while two keepers go ahead to secure the last open water channel.';
 return b.encounter===2?b.map.outro:'The lamps along the road are lit again. The bearers gather their things, and the journey continues.';
}
