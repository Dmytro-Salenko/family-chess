import { env } from "cloudflare:workers";
import { Chess } from "chess.js";
export const dynamic = "force-dynamic";
const reply = (data: any, status=200) => Response.json(data,{status,headers:{"Cache-Control":"no-store"}});
const token=()=>crypto.randomUUID().replaceAll("-","")+crypto.randomUUID().replaceAll("-","");
const db=()=>env.DB!;
const hash=async(s:string)=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)))).map(x=>x.toString(16).padStart(2,"0")).join("");
async function row(id:string){return await db().prepare("SELECT * FROM games WHERE id = ?").bind(id).first<any>();}
function view(g:any,key:string){const color=g.white===key?"w":g.black===key?"b":null;if(!color)return null;const c=new Chess();for(const m of JSON.parse(g.moves))c.move(m);return {id:g.id,moves:JSON.parse(g.moves),fen:c.fen(),color,joined:!!g.black,result:g.result,version:g.version,check:c.isCheck(),over:c.isGameOver()||!!g.result};}
export async function GET(req:Request){const u=new URL(req.url),id=u.searchParams.get("id")||"";const k=req.headers.get("Authorization")?.replace("Bearer ","")||"";const g=await row(id);const v=g&&view(g,await hash(k));return v?reply(v):reply({error:"Game unavailable. Open your original player link."},404);}
export async function POST(req:Request){
 if(req.headers.get("Origin") && req.headers.get("Origin")!==new URL(req.url).origin)return reply({error:"Invalid origin"},403);
 try{const b=await req.json() as any;
 if(b.action==="create"){const id=crypto.randomUUID(),key=token(),invite=token();await db().prepare("INSERT INTO games (id,white,invite,moves,version,created) VALUES (?,?,?,'[]',0,?)").bind(id,await hash(key),await hash(invite),Date.now()).run();return reply({id,key,invite});}
 if(b.action==="join"){if(typeof b.invite!=="string")return reply({error:"Invalid invite"},400);const key=token();const r=await db().prepare("UPDATE games SET black=?, version=version+1 WHERE id=? AND invite=? AND black IS NULL").bind(await hash(key),b.id,await hash(b.invite)).run();if(!r.meta.changes)return reply({error:"This invitation has already been used. Open the game on the device you joined with."},409);return reply({id:b.id,key});}
 const g=await row(b.id);const key=await hash(req.headers.get("Authorization")?.replace("Bearer ","")||"");const v=g&&view(g,key);if(!v)return reply({error:"Your player key is missing."},403);
 if(b.version!==g.version)return reply({error:"The game changed. Please try again."},409);
 if(!g.black)return reply({error:"Waiting for your opponent to join."},400);if(v.over)return reply({error:"This game has finished."},400);
 const c=new Chess();const moves=JSON.parse(g.moves);for(const m of moves)c.move(m);let result=null;
 if(b.action==="move"){if(c.turn()!==v.color)return reply({error:"It is your opponent’s turn."},400);let m;try{m=c.move({from:b.from,to:b.to,promotion:b.promotion||"q"});}catch{return reply({error:"That move is not legal."},400);}moves.push(m.san);if(c.isCheckmate())result=(c.turn()==="w"?"Black":"White")+" wins by checkmate";else if(c.isStalemate())result="Draw by stalemate";else if(c.isThreefoldRepetition())result="Draw by repetition";else if(c.isDraw())result="Draw";
 }else if(b.action==="resign")result=(v.color==="w"?"Black":"White")+" wins by resignation";else return reply({error:"Unknown action"},400);
 const r=await db().prepare("UPDATE games SET moves=?,result=?,version=version+1 WHERE id=? AND version=?").bind(JSON.stringify(moves),result,b.id,g.version).run();if(!r.meta.changes)return reply({error:"The game changed. Please try again."},409);return reply(view(await row(b.id),key));
 }catch{return reply({error:"Could not complete that request. Please retry."},400);}
}
