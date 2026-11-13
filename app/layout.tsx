import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Family Chess · A little closer, one move at a time",description:"A quiet place to play chess together. Share a link and enjoy a game, wherever you are.",robots:{index:false,follow:false},other:{"referrer":"no-referrer"},appleWebApp:{capable:true,title:"Family Chess",statusBarStyle:"default"}};
export const viewport={width:"device-width",initialScale:1,themeColor:"#f6f5ef"};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
