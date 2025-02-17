import { Header } from "@/components/features/Header";
import { SideBar } from "@/components/features/SideBar";
import { ReactNode } from "react";
export default function Layout({ children,}: { children: ReactNode}) {
	return (
		<div className="grid grid-cols-[272px_auto]">
      <SideBar />
			<div className="flex flex-col items-start justify-evenly w-full h-full">
				<Header />
				<div className="w-full max-w-[98%]">
          {children}
				</div>
			</div>
		</div>
	);
}
