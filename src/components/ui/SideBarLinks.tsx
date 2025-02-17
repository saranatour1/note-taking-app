'use client'
import { cn } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link"
import { usePathname, useSearchParams } from 'next/navigation'
import { ReactNode, useMemo } from "react";
import { ChevronRightMD } from "../icons/ChevronRightMD";

 interface SideBarLinkProps{
  href:Url;
  title:string;
  icon:ReactNode;
  hasSearchParams?:boolean;
  param?:string;
 }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SideBarLinks = ({ href,title, icon , hasSearchParams=false, param=''}: SideBarLinkProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams();
  
  const active = useMemo(() => {
      const q = searchParams.get('q')
      return (href === pathname) || (href.toString() === pathname.concat(`?q=${q}`))
  }, [href, pathname, searchParams]);

  return (<Link className={cn(['w-full px-150 py-[10px] flex items-center self-stretch rounded-8 gap-100', active ? 'bg-neutral-100':''])} href={href}>
      {icon}
      <span className={cn(["sans-text-preset-4 text-neutral-700"])}>{title}</span>
      {active && <ChevronRightMD />}
  </Link>)
}