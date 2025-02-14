import { fetchQuery } from "convex/nextjs";
import { AddNoteButton } from "./AddNoteButton";
import { NotesList } from "./NotesList";
import { api } from "../../../../convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";

export const NotesSideBar = async () => {
	const notes = await fetchQuery(
		api.notes.index.viewer,
		{},
		{ token: await convexAuthNextjsToken() }
	);
	return (
		<aside className="px-400 py-250 border-r border-r-neutral-200 w-full h-full max-h-[calc(100%-140px)] col-span-1 flex flex-col items-start justify-start gap-200">
			<AddNoteButton />
			<NotesList notes={notes} />
		</aside>
	);
};
