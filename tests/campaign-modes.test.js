import test from 'node:test';
import assert from 'node:assert/strict';
import {Battle} from '../dist/engine.js';
import {MAPS} from '../dist/data.js';
import {emptyJourney,recordVictory,introductions} from '../dist/campaign.js';
import {CAMPAIGNS,campaignProgress,chapterFor} from '../dist/campaign-content.js';

test('three campaigns have distinct routes, encounters and foes without changing the river',()=>{
 const before=JSON.stringify(MAPS);
 for(let i=0;i<5;i++){
  const battles=CAMPAIGNS.map(c=>new Battle(i,null,{campaignId:c.id,encounter:2}));
  assert.equal(new Set(battles.map(b=>JSON.stringify(b.map.points))).size,3);
  assert.equal(new Set(battles.map(b=>JSON.stringify(b.waves))).size,3);
  assert.equal(new Set(battles.map(b=>chapterFor(b).scenes[2])).size,3);
  for(const b of battles){assert.equal(b.totalWaves,8);assert.ok(introductions(b.waves.at(-1),i,[],b.map).some(c=>c.name===b.map.bossName));}
 }
 assert.equal(JSON.stringify(MAPS),before);
});
test('old river progress remains and new campaign victories stay separate',()=>{
 const j=emptyJourney();j.temples.banyan={shield:18,lamps:[true,false,false]};
 assert.equal(campaignProgress(j,'river'),j);
 const b=new Battle(1,null,{campaignId:'lamps',encounter:2});b.status='won';
 recordVictory(campaignProgress(j,'lamps'),b);
 assert.ok(j.campaigns.lamps.temples.lotus);assert.equal(j.temples.lotus,undefined);assert.equal(j.temples.banyan.shield,18);
 assert.equal(campaignProgress(j,'winds').temples.lotus,undefined);
});
test('quick battles are seeded, save their setup, and never award campaign lamps',()=>{
 const j=emptyJourney(),before=JSON.stringify(j);
 for(const quickLength of [4,8,12]){
  const b=new Battle(2,null,{mode:'quick',quickLength,seed:123});
  assert.equal(b.totalWaves,quickLength);
  assert.deepEqual(new Battle(2,b.snapshot()).waves,b.waves);
  assert.notDeepEqual(new Battle(2,null,{mode:'quick',quickLength,seed:124}).waves,b.waves);
  assert.ok(b.waves.at(-1).some(e=>e.type==='boss'&&e.boon==='iron'));
  b.status='won';assert.equal(recordVictory(j,b),null);assert.equal(JSON.stringify(j),before);
 }
});
test('campaign save restores route and progression identity; river reconciliation stays local',()=>{
 const b=new Battle(1,null,{campaignId:'lamps',encounter:1});b.startWave();b.spawn({type:'venom'});b.escort.state='safe';b.tick(.1);
 assert.ok(b.enemies.some(e=>e.type==='venom'));
 const restored=new Battle(1,b.snapshot());assert.equal(restored.campaignId,'lamps');assert.deepEqual(restored.map.points,b.map.points);assert.deepEqual(restored.waves,b.waves);
 const old=b.snapshot();delete old.campaignId;assert.equal(new Battle(1,old).campaignId,'river');
});
