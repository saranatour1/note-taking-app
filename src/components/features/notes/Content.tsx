"use client";;
import { api } from "../../../../convex/_generated/api";
import Tiptap from "./Editor";
import { TagIcon } from "@/components/icons/TagIcon";
import { TagsInput } from "@/components/ui/tags-input";
import { ReactNode, useState } from "react";
import { CircleClock } from "@/components/icons/CircleClock";
import { Button } from "@/components/ui/button";
import { archiveNote, deleteNote, saveNote } from "@/lib/actions";
import { formatDate } from './NotesList';
import { Preloaded, usePreloadedQuery } from "convex/react";
import { Archive } from "@/components/icons/Archive";
import { DeleteIcon } from "@/components/icons/Deleted";

interface Props {
	noteId: string;
	noteData:Preloaded<typeof api.notes.index.viewNote>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Content = ({ noteId,noteData }: Props) => {
	const [title,setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	
	const note = usePreloadedQuery(noteData)
	const [tags, setTags] = useState<string[]>(note.tags.map(i=> i?.title).filter((i): i is string => i !== undefined && i !== '') || []);
	return (
		<>
		<form action={async() => await saveNote({title:title != '' ? title:(note.title ?? 'untitled note'), tags:tags.length>0 ? tags:(note?.tags?.map(t=>t?.title ?? 'untitled note') ?? []) ,description:description !=="" ? description:(note?.description ?? 'Start typing..') , noteId:note?._id})} className="w-full py-200 px-300 flex flex-col items-start">
				{note && <Tiptap
					value={note?.title ==='' ? `Enter a new Title..`:note?.title}
					disableEnter={true}
					className="text-neutral-950 sans-text-preset-1 font-bold"
					getMarkdownValue={(value) => setTitle(value)}
				/>}
			

			<div className="grid grid-cols-2 grid-rows-2 w-full">
				{/* Tags */}
				<div className="flex w-full gap-100 items-center col-span-2">
					<div className="flex items-center gap-075 row-span-1">
						<TagIcon />
						<span className="sans-text-preset-5 text-neutral-700">Tags</span>
					</div>
					<TagsInput
						className="w-full sans-text-preset-5 row-span-1"
						value={tags}
						onValueChange={setTags}
						placeholder="Add tags separated by commas (e.g. Work, Planning)"
					/>
				</div>

				{/* Last Edited at */}
				<div className="flex w-full gap-100 items-center col-span-2">
					<div className="flex items-center gap-075 row-span-1">
						<CircleClock />
						<span className="sans-text-preset-5 text-neutral-700">
							Last Edited
						</span>
					</div>
					<span className="sans-text-preset-5 text-neutral-400 row-span-1">
						{note?.updatedAt ? formatDate(note.updatedAt) : `Not yet saved`}
					</span>
				</div>
			</div>
      
			<hr className="w-full text-neutral-200 my-200" />
			<Tiptap
				value={note?.description ?? `Start typing your note here…`}
				className="sans-text-preset-5 text-neutral-700 w-full h-full max-h-[50%]"
				getMarkdownValue={(value)=>setDescription(value)}
			/>
			<hr className="w-full text-neutral-200" />
			{/* Form Buttons */}
			<div className="flex items-center justify-start gap-200">
				<Button
					type="submit"
					className="py-150 px-200 bg-blue-500 rounded-8 flex items-center justify-center sans-text-preset-4 text-white"
				>
					Save Note
				</Button>
				<Button
					type="reset"
					className="py-150 px-200 bg-neutral-100 text-neutral-600 rounded-8 flex items-center justify-center sans-text-preset-4"
					onClick={()=>{setTags(note?.tags?.map(tag=>tag?.title ?? 'untitled note') ?? []); setTitle(note?.title ?? ''); setDescription(note?.description ?? '')}}	
				>
					cancel
				</Button>
			</div>
		</form>
			<div className="flex flex-col pt-250 pl-200 gap-150">
				{/* Archive note button */}
				<MenuButton icon={<Archive />} title="Archive Note" onClick={async()=> await archiveNote({noteId:note?._id, state:note.isArchived ?? false})} />
				<MenuButton icon={<DeleteIcon />} title={"Delete Note"} onClick={async()=> await deleteNote({noteId:note._id})}/>
			</div>			
		</>
	);
};

type MenuButtonProps = { title:string, onClick:()=> void, icon: ReactNode }
export const MenuButton = ({title, onClick,icon}:MenuButtonProps)=>{

	return (<Button className="px-200 py-150 flex items-center gap-100 border border-neutral-300 rounded-8 bg-white" onClick={onClick}>
		{icon}
		<span className="sans-text-preset-4 text-neutral-950">{title}</span>
	</Button>)
}