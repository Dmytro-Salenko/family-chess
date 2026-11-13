import assert from 'node:assert/strict';
const origin=process.env.TEST_ORIGIN||'http://127.0.0.1:5173';
async function family(body,key){const r=await fetch(origin+'/api/family',{method:'POST',headers:{'Content-Type':'application/json',...(key?{Authorization:'Bearer '+key}:{})},body:JSON.stringify(body)});return {status:r.status,data:await r.json()};}
async function game(body,key){const r=await fetch(origin+'/api/game',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+key},body:JSON.stringify(body)});return {status:r.status,data:await r.json()};}
const dad=(await family({action:'create'})).data;assert.ok(dad.key);
assert.equal((await family({action:'heartbeat',id:dad.id},'wrong-key')).status,403);
assert.equal((await family({action:'play',id:dad.id},dad.key)).status,400);
const son=(await family({action:'join',id:dad.id,invite:dad.invite})).data;assert.ok(son.key);
assert.equal((await family({action:'join',id:dad.id,invite:dad.invite})).status,409);
const d=(await family({action:'heartbeat',id:dad.id},dad.key)).data;assert.equal(d.role,'dad');assert.equal(d.paired,true);assert.equal(d.sonOnline,true);
const s=(await family({action:'heartbeat',id:dad.id},son.key)).data;assert.equal(s.role,'son');assert.equal(s.dadOnline,true);
const [a,b]=await Promise.all([family({action:'play',id:dad.id},dad.key),family({action:'play',id:dad.id},son.key)]);assert.equal(a.status,200);assert.equal(a.data.gameId,b.data.gameId);
const id=a.data.gameId;const r=await fetch(origin+'/api/game?id='+id,{headers:{Authorization:'Bearer '+dad.key}});let g=await r.json();assert.equal(g.joined,true);const white=g.color==='w'?dad:son,black=g.color==='b'?dad:son;
for(const [from,to,key]of [['f2','f3',white.key],['e7','e5',black.key],['g2','g4',white.key],['d8','h4',black.key]]){const r=await game({action:'move',id,version:g.version,from,to},key);assert.equal(r.status,200);g=r.data;}
assert.equal(g.result,'Black wins by checkmate');
if(process.env.UI_TEST_FILE){const {writeFile}=await import('node:fs/promises');await writeFile(process.env.UI_TEST_FILE,JSON.stringify({url:origin+'/#game='+id+'&key='+white.key}));}
assert.equal((await family({action:'heartbeat',id:dad.id},son.key)).data.finished,true);
const rematch=(await family({action:'play',id:dad.id},son.key)).data;assert.notEqual(rematch.gameId,id);
assert.equal((await family({action:'play',id:dad.id},dad.key)).data.gameId,rematch.gameId);
console.log('PASS: private pairing, single-use link, presence, role authorization, shared start, concurrent start, complete game, persistent room, rematch without invitations.');
