import { NotesSideBar } from "@/components/features/notes/SideBar";
import { ReactNode } from "react";

export default function Layout({children}:{children:ReactNode}){
  return (<div className="w-full grid grid-cols-[290px_auto] h-full">
    <NotesSideBar />
    {children}
    </div>)
}