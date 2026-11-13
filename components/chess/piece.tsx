/** Clean, original vector silhouettes; shared geometry for both colours. */
export function ChessPiece({type,color}:{type:string;color:string}) {
 const white=color==='w';
 return <svg className={`chess-piece ${white?'ivory-piece':'charcoal-piece'}`} viewBox="0 0 80 80" aria-hidden="true" focusable="false">
 <g fill={white?'#fafaf8':'#4b4b49'} stroke={white?'#575754':'#282827'} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
 {type==='p'&&<><path d="M34 33c-6-2-8-6-8-11a14 14 0 0 1 28 0c0 5-2 9-8 11l5 6H29z"/><path d="M34 39c0 12-5 19-13 25-3 2-4 5-4 9h46c0-4-1-7-4-9-8-6-13-13-13-25"/></>}
 {type==='r'&&<><path d="M19 12h10v10h7V12h8v10h7V12h10v19l-7 6v23l8 8v5H18v-5l8-8V37l-7-6z"/><path d="M26 37h28M26 60h28M19 68h42" fill="none"/></>}
 {type==='n'&&<><path d="M22 63c2-10 7-18 16-26l-7 1-8 5-10-8c-1-1-1-3 0-4l15-14 4-9 8 6c18 0 30 16 27 34-1 6-4 11-6 15z"/><path d="M41 18c16 8 21 22 15 38" fill="none" stroke={white?'#d1d1ce':'#686865'} strokeWidth="4"/><path d="M32 24l4-3" fill="none" strokeWidth="3"/><path d="M21 63q20-3 40 0l5 9v2H16v-2z"/></>}
 {type==='b'&&<><path d="M40 13c-8 9-16 19-15 28 1 5 7 8 10 8-1 7-5 12-11 16l-6 8h44l-6-8c-6-4-10-9-11-16 3 0 9-3 10-8 1-9-7-19-15-28z"/><circle cx="40" cy="10" r="4"/><path d="M44 23l-8 15M29 49h22M24 65h32" fill="none"/></>}
 {type==='q'&&<><path d="M17 28l9 29-4 9-5 7h46l-5-7-4-9 9-29-15 14-8-22-8 22z"/><circle cx="16" cy="26" r="5"/><circle cx="40" cy="17" r="5"/><circle cx="64" cy="26" r="5"/><path d="M26 57q14-4 28 0M23 66q17-3 34 0" fill="none"/></>}
 {type==='k'&&<><path d="M36 7h8v7h7v7h-7v10h-8V21h-7v-7h7z"/><path d="M40 36c-5-12-15-12-20-6-5 7 2 19 9 27l-5 9-7 7h46l-7-7-5-9c7-8 14-20 9-27-5-6-15-6-20 6z"/><path d="M40 36v16M29 57q11-3 22 0M24 66q16-3 32 0" fill="none"/></>}
 </g>
 </svg>
}
