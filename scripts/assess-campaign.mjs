import {writeFileSync} from 'node:fs';
import {Battle} from '../dist/engine.js';
import {MAPS} from '../dist/data.js';
import {CHAPTERS} from '../dist/journey-content.js';
const styles={balanced:['agni','vayu','saraswati','indra','varuna','prithvi','durga'],heavy:['vayu','indra','saraswati','agni','durga','prithvi','varuna'],control:['varuna','indra','saraswati','vayu','prithvi','durga','agni']};
const results=[];
for(const difficulty of ['easy','normal','difficult'])for(let map=0;map<5;map++)for(let encounter=0;encounter<3;encounter++)for(const [style,order] of Object.entries(styles)){
 let b=new Battle(map,null,{encounter,difficulty});const positions=map===0?[0,4,2,6,3,8,9]:map===1?[0,1,3,5,4,7,8]:map===2?[0,2,3,5,4,6,9]:map===3?[0,2,3,5,4,6,9]:[0,1,4,5,6,8,9];
 let ticks=0,resumed=false,lastFoes=[];
 while(!['won','lost'].includes(b.status)&&ticks++<30000){
  for(let i=0;i<order.length;i++)if(!b.shrines.some(s=>s.plot===positions[i]))b.build(positions[i],order[i]);
  if(b.shrines.length===7)for(const s of [...b.shrines].sort((a,z)=>a.level-z.level))b.upgrade(s.plot);
  if(b.status==='planning')b.startWave();
  const mahisha=b.enemies.find(e=>e.boon==='mahisha'&&!e.boonBroken);
  for(const s of b.shrines.filter(s=>s.deity==='durga')){const e=b.enemies.filter(e=>b.visible(e)&&b.canAffect(e,'durga')&&(e.boon!=='iron'||e.stopped)).sort((a,z)=>Number(z.boss)-Number(a.boss)||z.hp-a.hp)[0];if(e){if(mahisha&&b.meter>=100)b.intervention(s.plot);b.strike(s.plot,e.id);}}
  if(b.meter>=100&&b.enemies.length>4&&!(map===2&&encounter===2)){const s=b.shrines.find(s=>s.deity==='indra');if(s)b.intervention(s.plot);}
  if(b.enemies.some(e=>e.boon==='raktabija')||b.enemies.length>5)b.useFeature();
  if(b.wave>=2&&b.enemies.length<4)b.sendEscort();
  if(!resumed&&b.wave>=3&&b.enemies.length){const saved=b.snapshot();b=new Battle(map,saved);resumed=true;}
  lastFoes=b.enemies.map(e=>({name:e.name,hp:Math.ceil(e.hp),progress:Math.round(e.distance/b.route.total*100)}));
  b.tick(.1);b.animate(.1);
 }
 results.push({difficulty,map:map+1,region:MAPS[map].name,encounter:encounter+1,name:CHAPTERS[map].encounters[encounter],style,status:b.status,wave:b.wave,shield:b.shield,seconds:Math.round(b.time),escort:b.escort.state,resumed,lastFoes:b.status==='won'?[]:lastFoes});
}
writeFileSync(new URL('../docs/stage-results.json',import.meta.url),JSON.stringify(results,null,2)+'\n');
const summary=Object.fromEntries(['easy','normal','difficult'].map(d=>[d,{won:results.filter(r=>r.difficulty===d&&r.status==='won').length,total:45}]));
console.log(JSON.stringify({summary,stalls:results.filter(r=>!['won','lost'].includes(r.status)).length,losses:results.filter(r=>r.status!=='won').map(({difficulty,map,encounter,style,wave})=>({difficulty,map,encounter,style,wave}))},null,2));
