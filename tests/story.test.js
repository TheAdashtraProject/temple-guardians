import test from 'node:test';
import assert from 'node:assert/strict';
import {Battle} from '../dist/engine.js';
import {MAPS} from '../dist/data.js';
import {CHAPTERS} from '../dist/journey-content.js';
import {introductions} from '../dist/campaign.js';
test('every encounter and enemy introduction uses the consolidated cast',()=>{const text=[];for(let map=0;map<5;map++)for(let encounter=0;encounter<3;encounter++){const b=new Battle(map,null,{encounter});text.push(...CHAPTERS[map].scenes,JSON.stringify(MAPS[map]));for(const wave of b.waves)text.push(JSON.stringify(introductions(wave,map)));}assert.doesNotMatch(text.join(' '),/Vajraketu|Mayadhara|Nishachara|Rudhiraksha/);assert.deepEqual(MAPS.map(m=>m.bossName),['Armoured General','Dharan','Mahishasura','Raktabija','Vritra']);});
test('the river crisis is foreshadowed, alliance revealed and rescued keepers open the final approach',()=>{assert.match(CHAPTERS[0].scenes[0],/well.*dry/);assert.match(CHAPTERS[2].scenes[1],/Vritra.*Mahishasura.*Raktabija/);assert.match(MAPS[3].outro,/rescued keepers.*source/);assert.match(CHAPTERS[4].scenes[0],/keepers guide/);});
