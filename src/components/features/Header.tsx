import { Settings } from "../icons/Settings"
import { Button } from "../ui/button"
import { Search } from "../ui/Search"

export const Header = ()=>{

  return <header className="flex px-400 items-center justify-between border-b border-b-neutral-200 h-[81px] w-full">
    <p className=" sans-text-preset-1 text-neutral-950 font-bold">All Notes</p>
    <div className="flex items-center justify-between gap-200">
    <Search placeholder="Search by title, content, or tags…"/>
      <Button variant={`ghost`}>
      <Settings />
      </Button>
    </div>
  </header>
}