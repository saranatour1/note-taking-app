import { Header } from "@/components/features/Header";
import { SideBar } from "@/components/features/SideBar";
import { ReactNode } from "react";
export default function Layout({ children,}: { children: ReactNode}) {
	return (
		<div className="grid grid-cols-[272px_auto] min-h-screen">
      <SideBar />
			<div className="w-full max-w-full">
				<Header />
          {children}
			</div>
		</div>
	);
}
