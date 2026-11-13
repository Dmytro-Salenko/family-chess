/** Original vector pieces, drawn on a shared 80 × 80 grid. */
export function ChessPiece({type,color}:{type:string;color:string}) {
 const white=color==='w';
 return <svg className={`chess-piece ${white?'ivory-piece':'charcoal-piece'}`} viewBox="0 0 80 80" aria-hidden="true" focusable="false">
 <g fill={white?'#fafaf8':'#515150'} stroke={white?'#555552':'#292927'} strokeWidth="2.3" strokeLinejoin="round" strokeLinecap="round">
 {type==='p'&&<><path d="M29 39c1 9-1 15-7 21l-5 7h46l-5-7c-6-6-8-12-7-21z"/><circle cx="40" cy="24" r="12"/><path d="M27 38q13-5 26 0l-2 6H29z"/><path d="M17 67q23-5 46 0v5H17z"/></>}
 {type==='r'&&<><path d="M21 29h38l-6 10 2 22H25l2-22z"/><path d="M18 12h11v10h7V12h8v10h7V12h11l-3 19H21z"/><path d="M23 61q17-3 34 0l7 9v3H16v-3z"/><path d="M27 39h26M24 62h32" fill="none"/></>}
 {type==='n'&&<><path d="M22 62c-1-12 3-23 12-30l-9 4-8-7 10-10 4-9 11 5 8-5 1 10c16 11 19 24 10 42z"/><path d="M25 24l-8 5 8 7 9-4c1 8-6 13-8 22 15-2 22-10 24-18" fill="none"/><path d="M41 20l-4 6" fill="none" strokeWidth="3.5"/><path d="M48 23c12 11 13 24 7 35" fill="none" opacity=".35"/><path d="M22 62q19-4 39 0l5 9v2H17v-2z"/></>}
 {type==='b'&&<><path d="M29 45c1 7-2 13-7 18h36c-5-5-8-11-7-18z"/><path d="M40 13C30 22 23 30 25 36c2 8 28 8 30 0 2-6-5-14-15-23z"/><circle cx="40" cy="11" r="4"/><path d="M44 22l-8 13" fill="none" strokeWidth="3"/><path d="M27 44q13-4 26 0l-2 5H29z"/><path d="M21 63q19-3 38 0l7 8v2H14v-2z"/></>}
 {type==='q'&&<><path d="M19 27l10 29h22l10-29-15 13-6-21-6 21z"/><path d="M28 55q12-4 24 0l3 7H25z"/><path d="M24 62q16-3 32 0l8 9v2H16v-2z"/><circle cx="17" cy="24" r="5"/><circle cx="40" cy="15" r="5"/><circle cx="63" cy="24" r="5"/><path d="M28 43l4 9m20-9-4 9" fill="none" opacity=".45"/></>}
 {type==='k'&&<><path d="M36 7h8v7h7v7h-7v10h-8V21h-7v-7h7z"/><path d="M40 35c-7-18-27-10-22 5l11 17h22l11-17c5-15-15-23-22-5z"/><path d="M40 35v17" fill="none"/><path d="M27 55q13-4 26 0l3 8H24z"/><path d="M23 63q17-4 34 0l8 8v2H15v-2z"/></>}
 </g>
 <path d="M24 69h32" stroke={white?'#c4c4c0':'#747471'} strokeWidth="2" strokeLinecap="round" opacity=".7"/>
 </svg>
}
