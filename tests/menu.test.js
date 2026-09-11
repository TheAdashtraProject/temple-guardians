import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Battle} from '../dist/engine.js';

// Exercise the real UI event handlers in a small DOM adapter. This is not browser or visual QA.
test('menu, all campaign selectors, resume and quick setup use the real application handlers',async()=>{
 const store=new Map(),listeners={},frames=[];
 let roots=[];
 class Element{
  constructor(tag,attrs=''){this.tagName=tag.toUpperCase();this.dataset={};this.style={};this.children=[];this.hidden=/\bhidden\b/.test(attrs);this.disabled=/\bdisabled\b/.test(attrs);this.open=false;this.value='';this.textContent='';this.classList={toggle(){}};for(const [,k,v] of attrs.matchAll(/([\w-]+)="([^"]*)"/g)){if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=v;else this[k==='class'?'className':k]=v;}}
  set innerHTML(html){this.html=html;this.children=parse(html);}get innerHTML(){return this.html||'';}
  get parentElement(){return {classList:this.classList};}
  get options(){return this.children.filter(e=>e.tagName==='OPTION');}
  add(e){this.children.push(e);}append(e){this.children.push(e);}
  setAttribute(k,v){this[k]=v;}addEventListener(k,f){this['on'+k]=f;}
  showModal(){this.open=true;}close(){this.open=false;}scrollIntoView(){}
  click(){if(!this.disabled)this.onclick?.({target:this});}
  getBoundingClientRect(){return {width:1200,height:650,left:0,top:0};}
  getContext(){return new Proxy({measureText:t=>({width:t.length*8}),createLinearGradient:()=>({addColorStop(){}})}, {get:(o,k)=>k in o?o[k]:()=>{}});}
 }
 function parse(html){return [...html.matchAll(/<([a-z][a-z0-9-]*)\b([^>]*)>/gi)].map(([,tag,attrs])=>new Element(tag,attrs));}
 function all(){const walk=elements=>elements.flatMap(e=>[e,...walk(e.children)]);return walk(roots);}
 function matches(e,s){if(s==='dialog[open]')return e.tagName==='DIALOG'&&e.open;if(s.startsWith('.'))return (e.className||'').split(' ').includes(s.slice(1));const data=s.match(/^\[data-([\w-]+)\]$/);return data?data[1].replace(/-([a-z])/g,(_,c)=>c.toUpperCase()) in e.dataset:false;}
 roots=parse(readFileSync(new URL('../dist/index.html',import.meta.url),'utf8'));
 globalThis.document={getElementById:id=>all().findLast(e=>e.id===id),querySelector:s=>all().find(e=>matches(e,s)),querySelectorAll:s=>all().filter(e=>matches(e,s)),createElement:t=>new Element(t),addEventListener:(k,f)=>listeners[k]=f,activeElement:{tagName:'BODY'}};
 globalThis.window={addEventListener:(k,f)=>listeners[k]=f,scrollTo(){}};
 globalThis.localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)};
 globalThis.requestAnimationFrame=f=>frames.push(f);
 globalThis.Image=class{constructor(){this.width=1536;this.height=1024;}set src(v){queueMicrotask(()=>this.onload());}};
 globalThis.Option=class extends Element{constructor(name,value){super('option');this.textContent=name;this.value=value;}};
 await import('../dist/app.js');await new Promise(resolve=>setImmediate(resolve));
 const $=document.getElementById,click=id=>$(id).click();
 assert.equal($('mainMenu').hidden,false);assert.equal($('gameScreen').hidden,true);assert.equal($('resumeGame').hidden,true);
 assert.equal(document.querySelectorAll('[data-expedition]').length,3);
 for(const id of ['river','lamps','winds']){
  document.querySelectorAll('[data-expedition]').find(e=>e.dataset.expedition===id).click();
  assert.equal($('campaignDialog').open,true);assert.equal(document.querySelectorAll('[data-encounter]').length,15);
  document.querySelectorAll('[data-encounter]')[0].click();
  assert.equal($('mainMenu').hidden,true);assert.equal($('storyDialog').open,true);
  click('storyContinue');frames.at(-1)(performance.now()+16);click('mainMenuButton');assert.equal($('mainMenu').hidden,false);
  assert.equal(JSON.parse(store.get('temple-guardians-battle-v5')).campaignId,id);
  click('resumeGame');assert.equal($('gameScreen').hidden,false);click('mainMenuButton');
 }
 $('quickMap').value='2';$('quickDifficulty').value='difficult';$('quickLength').value='12';click('quickStart');
 const saved=JSON.parse(store.get('temple-guardians-battle-v5'));
 assert.equal(saved.mode,'quick');assert.equal(saved.mapIndex,2);assert.equal(saved.quickLength,12);assert.equal(saved.difficulty,'difficult');
 assert.equal($('storyDialog').open,true);assert.match($('storyGoal').textContent,/12 waves/);click('storyContinue');
 // Draw the quick route, then exercise its victory UI using a completed-battle fixture.
 frames.at(-1)(performance.now()+16);
 const progress=store.get('temple-guardians-journey-v2'),tick=Battle.prototype.tick;
 Battle.prototype.tick=function(){this.status='won';this.wave=this.totalWaves;};
 try{for(let i=1;i<=4;i++)frames.at(-1)(performance.now()+i*200);}finally{Battle.prototype.tick=tick;}
 assert.match($('result').innerHTML,/Sanctuary defended/);assert.doesNotMatch($('result').innerHTML,/nextTemple|achievement-lamps/);
 assert.equal(store.get('temple-guardians-journey-v2'),progress);assert.equal($('continueBattle').hidden,true);
 click('mainMenuButton');assert.match($('resumeGame').textContent,/Quick Battle/);
});
