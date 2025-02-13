import { Header } from "@/components/features/Header";
import { SideBar } from "@/components/features/SideBar";
import { ReactNode } from "react";
export default function Layout({ children }: { children: ReactNode }) {
  return (<div className="grid grid-cols-[272px_auto]">
    <SideBar />
    <div className="w-full h-full max-w-full">
    <Header />   
    {children}
    </div>
  </div>)
}
