import { api } from "../../../convex/_generated/api"
import { Archive } from "../icons/Archive"
import { Home } from "../icons/Home"
import { Logo } from "../ui/Logo"
import { SideBarLinks } from "../ui/SideBarLinks"
import { preloadQuery } from "convex/nextjs";
import { Tags } from "./Tags"
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server"

export const SideBar = async()=> { 
  const tags = await preloadQuery(api.notes.tags.viewer, {  },{ token : await convexAuthNextjsToken()});
  return <aside className="col-span-1 bg-white flex  flex-col py-150 px-200 border-r border-r-neutral-200 items-center w-full gap-y-200">
    <div className="flex items-center py-150 justify-between w-full">
      <Logo />
    </div>
    <div className="w-full">
      <SideBarLinks href={'/notes'} icon={<Home />} title={'All Notes'} />
      <SideBarLinks href={'/notes?q=archived'} param="archived" hasSearchParams={true} icon={<Archive />} title={'Archived'} />    
    </div>
      <hr className="text-neutral-200 space-y-100 w-full"/>
    <Tags preloadedTags={tags}/>
  </aside>
}