"use server";

import { fetchMutation } from "convex/nextjs";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { revalidatePath } from "next/cache";

type NoteToUpdate = {
	title: string;
	description: string;
	tags: string[];
	noteId: Id<"notes"> | undefined;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function saveNote({ title, tags, description, noteId }: NoteToUpdate) {
	if (!noteId) return;
	await fetchMutation(
		api.notes.index.update,
		{
			noteId: noteId,
			note: {
				noteData: {
					description: description,
					title: title,
					isArchived: false,
				},
			},
		},
		{ token: await convexAuthNextjsToken() }
	);

	// update the tags for the same note Id
	if (tags) {
		await fetchMutation(
			api.notes.tags.update,
			{
				tags: tags.map((t) => ({ title: t })),
				noteId: noteId,
			},
			{ token: await convexAuthNextjsToken() }
		);
	}

	revalidatePath(`/notes/${noteId}`);
	// update tags here
}

export async function archiveNote({ noteId, state }: { state: boolean; noteId: Id<"notes"> | undefined }) {
	if (!noteId) return;
	await fetchMutation(
		api.notes.index.toggleArchived,
		{
			noteId: noteId,
			state: state,
		},
		{ token: await convexAuthNextjsToken() }
	);
}

export async function deleteNote({ noteId }: { noteId: Id<"notes"> | undefined }) {
	if (!noteId) return;
	await fetchMutation(
		api.notes.index.destroy,
		{
			noteId: noteId,
		},
		{ token: await convexAuthNextjsToken() }
	);
}
