/** Vector artwork with broad rounded bases and restrained right-hand shading. */
export function ChessPiece({type,color}:{type:string;color:string}) {
 const white=color==='w';
 const fill=white?'#f9f9f9':'#4d4d4b', edge=white?'#555552':'#292927',shade=white?'#d8d8d6':'#3c3c3a';
 const base=<><path d="M29 78C19 78 18 85 18 94H82C82 85 81 78 71 78Z" fill={fill} stroke={edge}/><path d="M27 82C22 83 22 87 22 90H78C78 86 77 84 74 83L74 90H25Z" fill={shade} stroke="none" opacity=".52"/></>;
 return <svg className={`chess-piece ${white?'ivory-piece':'charcoal-piece'}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false"><g fill={fill} stroke={edge} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
 {type==='p'&&<><path d="M43 47C31 41 34 24 47 24C61 22 67 39 55 47L62 52Q65 57 58 57H54C55 67 60 73 68 78Q77 83 77 94H23Q23 83 32 78C40 73 45 67 46 57H38Q32 57 36 52Z"/><path d="M51 58C53 71 59 77 67 81Q72 86 72 91H58C57 81 53 77 50 72L48 58Z" fill={shade} stroke="none" opacity=".68"/></>}
 {type==='r'&&<><path d="M31 39H69L73 78H27Z"/><path d="M55 41H66L70 76H61Z" fill={shade} stroke="none" opacity=".7"/><path d="M25 18L36 16L38 28H46L47 17H55L56 28H64L66 16L77 18L75 34Q73 42 65 42H35Q27 42 25 34Z"/>{base}</>}
 {type==='n'&&<><path d="M29 78C32 68 47 60 49 48C43 54 38 56 33 55C26 64 19 60 16 56Q13 53 17 47L29 31C32 25 32 20 36 17L40 7L46 14C63 18 76 31 78 48C80 59 76 69 74 78Z"/><path d="M54 23C70 31 75 48 68 63L60 77H72C79 57 80 42 68 29Z" fill={shade} stroke="none" opacity=".75"/><path d="M37 31Q40 26 44 28Q45 32 38 33Z" fill={edge} stroke="none"/>{base}</>}
 {type==='b'&&<><path d="M35 78C21 66 24 45 35 30L44 18C39 13 42 7 48 6C57 5 62 12 56 19C49 31 45 44 46 55H54C54 43 57 33 61 24C77 42 81 64 66 78Z"/><path d="M64 31C75 49 75 64 64 75H58C69 60 69 47 62 35Z" fill={shade} stroke="none" opacity=".75"/>{base}</>}
 {type==='q'&&<><path d="M29 78L17 44C9 44 7 36 12 31C19 25 28 32 24 39L35 49L31 29C23 27 23 17 30 14C39 10 45 20 40 26L50 45L59 26C54 20 60 10 69 14C76 17 76 27 68 29L65 49L76 39C72 32 81 25 88 31C93 36 91 44 83 44L71 78Z"/><path d="M64 57L77 46L68 76H33L32 71H63Z" fill={shade} stroke="none" opacity=".65"/>{base}</>}
 {type==='k'&&<><path d="M45 7H55V15H63V24H55V34H45V24H37V15H45Z"/><path fillRule="evenodd" d="M50 43C40 23 14 26 12 45C10 59 26 70 36 78H64C74 70 90 59 88 45C86 26 60 23 50 43ZM43 53C34 41 24 43 29 51C32 56 37 59 43 62ZM57 53C66 41 76 43 71 51C68 56 63 59 57 62Z"/><path d="M77 37C86 47 77 62 61 75H56C71 61 81 50 77 37Z" fill={shade} stroke="none" opacity=".7"/>{base}</>}
 </g></svg>;
}
