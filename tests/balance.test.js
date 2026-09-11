import test from 'node:test';
import assert from 'node:assert/strict';
import {Battle} from '../dist/engine.js';
test('all fifteen encounters can be won with finite offerings and active targeting',()=>{
const results=[];
for(let map=0;map<5;map++)for(let encounter=0;encounter<3;encounter++){
 const b=new Battle(map,null,{encounter}),order=['agni','vayu','saraswati','indra','varuna','prithvi','durga'];const positions=map===0?[0,4,2,6,3,8,9]:map===1?[0,1,3,5,4,7,8]:map===2?[0,2,3,5,4,6,9]:map===3?[0,2,3,5,4,6,9]:[0,1,4,5,6,8,9];
 let safety=0;while(!['won','lost'].includes(b.status)&&safety++<30000){for(let i=0;i<order.length;i++)if(!b.shrines.some(s=>s.plot===positions[i]))b.build(positions[i],order[i]);if(b.shrines.length===7)for(const s of [...b.shrines].sort((a,z)=>a.level-z.level))b.upgrade(s.plot);if(b.status==='planning')b.startWave();for(const s of b.shrines.filter(s=>s.deity==='durga')){const e=b.enemies.filter(e=>b.visible(e)&&b.canAffect(e,'durga')&&(e.boon!=='iron'||e.stopped)).sort((a,z)=>Number(z.boss)-Number(a.boss)||z.hp-a.hp)[0];if(e){if(e.boon==='mahisha'&&!e.boonBroken&&b.meter>=100)b.intervention(s.plot);b.strike(s.plot,e.id);}}if(b.meter>=100&&b.enemies.length>4&&b.map.boss!=='mahisha'){const s=b.shrines.find(s=>s.deity==='indra');if(s)b.intervention(s.plot);}if(b.enemies.length>5)b.useFeature();b.tick(.1);b.animate(.1);}
 results.push({map:map+1,encounter:encounter+1,status:b.status,wave:b.wave,shield:b.shield,kills:b.kills,time:Math.round(b.time)});
}for(const r of results)assert.equal(r.status,'won',JSON.stringify(r));
});
