import {MAPS} from './data.js';
import {CHAPTERS} from './journey-content.js';

export const CAMPAIGNS=[
 {id:'river',name:'The Bound River',art:'lotus',tag:'An epic journey',description:'Follow Mira upriver. Break the alliance of Mahishasura, Raktabija and Vritra and return water to five communities.',rule:'Distinct mythic commanders, disputed crossings and a river to restore.'},
 {id:'lamps',name:'Night of Lamps',art:'town',tag:'Revelation & endurance',description:'After the waters return, false lights lure pilgrims off the festival road. Leela and Kapi carry the true flame from grove to mountain.',rule:'Veiled raiders and mist bearers conceal the advance. Place Saraswati to cover the path; fire holds clustered foes.'},
 {id:'winds',name:'The Seven Winds',art:'mountain',tag:'Power & precision',description:'Monsoon winds reopen the high passes. Dharan escorts supplies to isolated shrines while an asura warband seizes the exposed roads.',rule:'Airborne raids alternate with armoured columns. Vayu answers the flyers; Prithvi cracks the ground troops’ armour.'}
];
export const campaignInfo=id=>CAMPAIGNS.find(c=>c.id===id)||CAMPAIGNS[0];
export function campaignProgress(j,id='river'){
 if(id==='river')return j;
 j.campaigns??={};return j.campaigns[id]??={temples:{},encounters:{},difficulties:{},festival:[],seen:[],stories:[]};
}
export function campaignMap(index,id='river',mode='campaign'){
 const source=MAPS[index];if(id==='river'&&mode!=='quick')return source;
 const m={...source,points:source.points.map(p=>[...p]),plots:source.plots.map(p=>[...p]),alternatePoints:undefined};
 if(id==='lamps'&&mode!=='quick'){
  m.points=m.points.map(([x,y])=>[1200-x,y]);m.plots=m.plots.map(([x,y])=>[1200-x,y]);m.restore=m.restore.map(r=>({...r,x:1200-r.x}));
  Object.assign(m,{boss:'night',bossName:'Veiled General',bossProtection:null,boon:'The Veiled General vanishes periodically. Saraswati reveals him; keep her influence over the final approach.',quote:'Which of these lights will you follow?',tint:'lamps'});
 }else{
  if(id==='winds'&&mode!=='quick'){m.points=m.points.map(([x,y])=>[x,40+y*.8]);m.plots=m.plots.map(([x,y])=>[x,40+y*.8]);}
  Object.assign(m,{boss:'iron',bossName:'Armoured General',bossProtection:'agni',boon:'Marching armour opens when the general pauses. Agni cannot harm him. Use powerful strikes during the opening.',quote:'This road belongs to my army.',tint:mode==='quick'?null:'winds'});
 }
 Object.assign(m,{bossAtlas:undefined,bossCell:undefined,bossFamily:3,outro:'The sanctuary is safe and the road reopens.',next:'The keepers prepare for the next journey.'});return m;
}
const places=['the grove','the lotus crossing','the market town','the mountain refuge','the first spring'];
const nightScenes=[
 ['The festival begins, but unfamiliar lights flicker beyond the banyan roots. Kapi finds pilgrims walking towards them. Hold the grove while he brings them back.','Carry the real flame through the clearing. Mist bearers hide the raiders around them; overlapping revelation is more reliable than a single watch post.','A veiled commander waits beside the village road. Reveal him and keep the procession moving.'],
 ['Reflections make a second bridge across the pools. The keepers mark the real crossing with lamps; the raiders follow their light.','The flame bearers cross the water. Protect their route from hidden foes and the heavier guards travelling with them.','The commander uses the pool mist to disappear. Light the far bank before he reaches it.'],
 ['Every shop has lit a lamp, but false doorways still lead pilgrims astray. Leela asks you to secure the festival street.','Veiled raiders shelter behind armoured guards. Separate revelation from damage: Saraswati finds them, the other shrines turn them back.','The false lights gather around the market commander. Break his advance so the town can keep its vigil.'],
 ['The flame has reached the mountain steps. Mist gathers below the shrine, hiding the first assault.','Guide the bearers past the narrow turns. The upper shrines must reveal foes that escaped the first circle of light.','A veiled general blocks the refuge. Hold the steps until every pilgrim is inside.'],
 ['The last festival lamp belongs at the source of the river. The remaining raiders have gathered along its channels.','Carry the flame through one final procession. Keep a reserve for hidden attackers at the sanctuary.','The last Veiled General tries to extinguish the vigil. Defeat him and the five settlements will see the same true light.']
];
const windScenes=[
 ['Monsoon winds have cleared a supply road beyond the grove. Flying scouts arrive before the warband’s ground troops.','Kapi leads the supply bearers out between raids. Wind strikes reach the flyers; water cannot wash them backwards.','The first armoured general closes the grove road. Save your strongest strikes for the pauses in his march.'],
 ['The crossing is open, but airborne raiders can approach above the pools. Spread powerful shrines along the route.','A ground column follows the aerial scouts. Boulders crack its armour while lightning crosses the crowded ranks.','The crossing’s commander wears Agni’s protection. Keep a second source of heavy damage ready.'],
 ['Supply carts wait in the market. The warband alternates swift flyers with slow, reinforced troops.','Dharan escorts the bearers through the town. Choose when to launch them: the gaps between air raids are brief.','An armoured general attempts to seize the stores. Stop him before the final turn.'],
 ['The exposed mountain road is the only way to the refuge. Flying raids make Vayu especially valuable here.','Armoured guards follow the storm scouts. Prithvi and Vayu can work together, but keep enough reach to cover the ascent.','The mountain general marches behind a screen of flyers. Durga can pick him out of the crowd.'],
 ['Supplies have almost reached the spring. The remaining warband gathers for a final attempt to cut the road.','Protect the last bearers as air and ground assaults overlap. Decide whether an early wave is worth the extra offerings.','Defeat the final armoured general. The high road will remain open, and the keepers can provision the five sanctuaries before the next storm.']
];
export function chapterFor(b){
 const base=CHAPTERS[b.mapIndex];if((b.campaignId||'river')==='river'&&b.mode!=='quick')return base;
 const quick=b.mode==='quick',night=b.campaignId==='lamps';
 const names=quick?['A standalone defence','A standalone defence','A standalone defence']:night?['Gather the true flame','The lamp procession','Drive back the false lights']:['Open the supply road','Through wind and armour','Break the blockade'];
 const [x,y]=base.featurePoint;
 return {...base,featurePoint:quick?[x,y]:night?[1200-x,y]:[x,40+y*.8],encounters:names.map(n=>n+' · '+places[b.mapIndex]),scenes:quick?Array(3).fill('A self-contained battle. Choose your shrines, inspect each wave and hold the sanctuary. Campaign progress and restoration rewards are unchanged.'):(night?nightScenes:windScenes)[b.mapIndex],objective:'Protect the optional supply bearers',escort:'Supply bearers'};
}
export function expeditionWaves(b){
 let seed=b.seed>>>0;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const quick=b.mode==='quick',night=b.campaignId==='lamps',count=quick?b.quickLength:[4,6,8][b.encounter];
 return Array.from({length:count},(_,i)=>{
  const pools=quick?(i===0?['pisacha','swift','rakshasa']:i===1?['pisacha','rakshasa','winged']:['pisacha','rakshasa','winged','asura','shade','stone']):night?(i<2?['pisacha','rakshasa']:['shade','rakshasa','asura','pisacha']):(i%2===0?['winged','winged','pisacha']:['rakshasa','asura','stone']);
  const size=7+i*2+b.mapIndex+(b.difficulty==='difficult'&&i>2?1:0);
  const group=Array.from({length:size},(_,k)=>({type:pools[quick?Math.floor(random()*pools.length):(k+b.mapIndex+b.encounter)%pools.length],scale:(quick?1+Math.max(0,i-7)*.08:1)*(b.difficulty==='difficult'&&i<3?.85:1)}));
  if(night&&i>=3)group.splice(4,0,{type:'venom'});
  if(i>=3&&!night)group.splice(3,0,{type:'standard'});
  if(i===count-1&&(quick||b.encounter===2))group.splice(Math.floor(size/2),0,{type:'boss',boon:b.map.boss,protection:b.map.bossProtection,scale:quick&&count===4?.5:.7});
  return group;
 });
}
