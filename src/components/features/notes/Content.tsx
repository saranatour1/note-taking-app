'use client'
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex-helpers/react/cache";
import Tiptap from "./Editor";
import { TagIcon } from "@/components/icons/TagIcon";
import { TagsInput } from "@/components/ui/tags-input";
import { useState } from "react";
import { CircleClock } from "@/components/icons/CircleClock";

interface Props{
  noteId:string;
}

export const Content = ({ noteId }:Props)=> {
  const note = useQuery(api.notes.index.viewNote, noteId ?{ noteId : noteId}:"skip")
  const [tags, setTags] = useState<string[]>([])
  return (<form className="w-full col-auto py-200 px-300 flex flex-col">
    {note && <Tiptap value={note?.title ?? `Enter a new Title..`}  disableEnter={true} className="text-neutral-950 sans-text-preset-1 font-bold"/>}

  <div className="flex flex-col w-full items-start justify-start">
    {/* Tags */}
    <div className="flex w-full gap-100 items-center">
      <div className="flex items-center gap-075">
        <TagIcon />
        <span className="sans-text-preset-5 text-neutral-700">Tags</span>
      </div>
      <TagsInput className="w-full" value={tags} onValueChange={setTags} placeholder="Add tags separated by commas (e.g. Work, Planning)"/>
    </div>

    {/* Last Edited at */}
    <div className="flex w-full gap-100 items-center">
      <div className="flex items-center gap-075">
        <CircleClock />
        <span className="sans-text-preset-5 text-neutral-700">Last Edited</span>
      </div>
      <span className="sans-text-preset-5 text-neutral-400">{note?.updatedAt ? note.updatedAt:`Not yet saved`}</span>
    </div>

  </div>
  <hr className="w-full text-neutral-200 my-200"/>
  <Tiptap value={note?.description ?? `Start typing your note here…`} className="sans-text-preset-5 text-neutral-700 w-full h-full"/>
  </form>)
}