import { env } from "cloudflare:workers";
export const dynamic="force-dynamic";
const db=()=>env.DB!;
const reply=(data:any,status=200)=>Response.json(data,{status,headers:{"Cache-Control":"no-store"}});
const token=()=>crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().replaceAll('-','');
const hash=async(s:string)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))).map(x=>x.toString(16).padStart(2,'0')).join('');
async function room(id:string){return db().prepare('SELECT * FROM families WHERE id=?').bind(id).first<any>();}
async function view(f:any,key:string){const role=f.dad===key?'dad':f.son===key?'son':null;if(!role)return null;const g=f.active_game?await db().prepare('SELECT id,result FROM games WHERE id=?').bind(f.active_game).first<any>():null;return {id:f.id,role,paired:!!f.son,dadOnline:Date.now()-f.dad_seen<20000,sonOnline:Date.now()-f.son_seen<20000,activeGame:g?.id||null,finished:!!g?.result};}
export async function POST(req:Request){
 if(req.headers.get('Origin')&&req.headers.get('Origin')!==new URL(req.url).origin)return reply({error:'Invalid origin'},403);
 try{const b=await req.json() as any;
 if(b.action==='create'){const id=crypto.randomUUID(),key=token(),invite=token();await db().prepare('INSERT INTO families (id,dad,invite,dad_seen,created) VALUES (?,?,?,?,?)').bind(id,await hash(key),await hash(invite),Date.now(),Date.now()).run();return reply({id,key,invite});}
 if(b.action==='join'){if(typeof b.invite!=='string')return reply({error:'Неверная ссылка'},400);const key=token();const r=await db().prepare('UPDATE families SET son=?,son_seen=? WHERE id=? AND invite=? AND son IS NULL').bind(await hash(key),Date.now(),b.id,await hash(b.invite)).run();return r.meta.changes?reply({id:b.id,key}):reply({error:'Эта комната уже подключена. Открой её в том браузере, где подключался впервые.'},409);}
 const key=await hash(req.headers.get('Authorization')?.replace('Bearer ','')||'');let f=await room(b.id);let v=f&&await view(f,key);if(!v)return reply({error:'Не удалось открыть семейную комнату. Используй своё подключённое устройство.'},403);
 if(b.action==='heartbeat'){const column=v.role==='dad'?'dad_seen':'son_seen';await db().prepare(`UPDATE families SET ${column}=? WHERE id=?`).bind(Date.now(),f.id).run();return reply(await view(await room(f.id),key));}
 if(b.action==='play'){
 if(!f.son)return reply({error:'Сначала подключите устройство Ярослава.'},400);
 if(v.activeGame&&!v.finished)return reply({gameId:v.activeGame});
 const id=crypto.randomUUID(),old=f.active_game;
 // D1 batch is transactional; the room comparison prevents two concurrent new games.
 const results=await db().batch([
 db().prepare("INSERT INTO games (id,white,black,invite,moves,version,created) SELECT ?,?,?,?,'[]',0,? FROM families WHERE id=? AND active_game IS ?").bind(id,v.role==='dad'?f.dad:f.son,v.role==='dad'?f.son:f.dad,await hash(token()),Date.now(),f.id,old),
 db().prepare('UPDATE families SET active_game=? WHERE id=? AND active_game IS ?').bind(id,f.id,old)
 ]);
 const current=await room(f.id);return reply({gameId:current.active_game});
 }
 return reply({error:'Неизвестное действие'},400);
 }catch{return reply({error:'Не удалось связаться с комнатой. Попробуй ещё раз.'},400);}
}
