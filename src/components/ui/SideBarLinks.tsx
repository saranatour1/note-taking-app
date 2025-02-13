'use client'
import { cn } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { ReactNode } from "react";
import { ChevronRightMD } from "../icons/ChevronRightMD";

 interface SideBarLinkProps{
  href:Url;
  title:string;
  icon:ReactNode;
 }

export const SideBarLinks = ({ href,title, icon }: SideBarLinkProps) => {
  const pathname = usePathname()
  return (<Link className={cn(['w-full px-150 py-[10px] flex items-center self-stretch rounded-8 gap-100', pathname.includes(href.toString()) ? 'bg-neutral-100':''])} href={href}>
      {icon}
      <span className={cn(["sans-text-preset-4 text-neutral-700"])}>{title}</span>
      {pathname.includes(href.toString()) && <ChevronRightMD />}
  </Link>)
}