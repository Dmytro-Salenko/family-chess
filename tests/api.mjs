import assert from 'node:assert/strict';
const origin=process.env.TEST_ORIGIN||'http://127.0.0.1:5173';
async function post(body,key){const r=await fetch(origin+'/api/game',{method:'POST',headers:{'Content-Type':'application/json',...(key?{Authorization:'Bearer '+key}:{})},body:JSON.stringify(body)});return {status:r.status,data:await r.json()};}
async function get(s,key=s.key){const r=await fetch(origin+'/api/game?id='+s.id,{headers:{Authorization:'Bearer '+key}});return {status:r.status,data:await r.json()};}
const {data:w,status}=await post({action:'create'});assert.equal(status,200);
assert.equal((await get(w,'bad-key')).status,404);
assert.equal((await post({action:'move',id:w.id,version:0,from:'e2',to:'e4'},w.key)).status,400);
assert.equal((await post({action:'join',id:w.id,invite:'bad'})).status,409);
const {data:b}=await post({action:'join',id:w.id,invite:w.invite});assert.ok(b.key);
assert.equal((await post({action:'join',id:w.id,invite:w.invite})).status,409);
let g=(await get(w)).data;assert.equal(g.joined,true);
assert.equal((await post({action:'move',id:w.id,version:g.version,from:'e7',to:'e5'},b.key)).status,400);
assert.equal((await post({action:'move',id:w.id,version:g.version,from:'e2',to:'e5'},w.key)).status,400);
for(const [from,to,key] of [['f2','f3',w.key],['e7','e5',b.key],['g2','g4',w.key],['d8','h4',b.key]]){const r=await post({action:'move',id:w.id,version:g.version,from,to},key);assert.equal(r.status,200,JSON.stringify(r));g=r.data;}
assert.equal(g.result,'Black wins by checkmate');assert.equal(g.over,true);
const restored=(await get(w)).data;assert.deepEqual(restored.moves,['f3','e5','g4','Qh4#']);assert.equal(restored.result,g.result);
assert.equal((await post({action:'move',id:w.id,version:g.version,from:'a2',to:'a3'},w.key)).status,400);
const {data:w2}=await post({action:'create'});const {data:b2}=await post({action:'join',id:w2.id,invite:w2.invite});const v=(await get(w2)).data.version;
const results=await Promise.all([post({action:'move',id:w2.id,version:v,from:'e2',to:'e4'},w2.key),post({action:'move',id:w2.id,version:v,from:'d2',to:'d4'},w2.key)]);assert.deepEqual(results.map(x=>x.status).sort(),[200,409]);
const final=(await get(b2)).data;assert.equal(final.moves.length,1);
assert.equal((await post({action:'resign',id:b2.id,version:final.version},b2.key)).data.result,'White wins by resignation');
console.log('PASS: create/join, single-use invitation, authorization, turn enforcement, illegal moves, checkmate, persistence, concurrent moves, resignation.');
