import { Button } from "@/components/ui/button";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { revalidatePath } from "next/cache";

export const AddNoteButton = async () => {
	const createNewNote = async () => {
    'use server'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const id = await fetchMutation(
			api.notes.index.create,
			{
				note: {
					noteData: {
						title: "untitled note",
						isArchived: false,
					},
					tags: undefined,
				},
			},
			{
				token: await convexAuthNextjsToken(),
			}
		)
		// Todo : figure out how to navigate to /notes/id
    revalidatePath(`/notes`) 
	};

	return (
		<Button onClick={createNewNote} className="w-full sans-text-preset-4 py-150 px-200 bg-blue-500 rounded-8 flex items-center justify-center gap-100">
			+ Create New Note
		</Button>
	);
};
