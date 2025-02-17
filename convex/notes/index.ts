import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import { asyncMap } from "convex-helpers";
import { notesObject, tagsObject } from "./tables";

export const createNoteObject = {
	tags: v.optional(v.array(v.object(tagsObject))),
	noteData: v.object(notesObject),
};
// get all notes list by user Id
export const viewer = query({
	args: {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handler: async (ctx, _args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError("Please Sign in to view notes.");
		}
		const userToNotes = await ctx.db
			.query("usersToNotes")
			.withIndex("by_ownerId_by_noteId", (q) => q.eq("ownerId", userId))
			.collect();

		const notes = await asyncMap(userToNotes, async (doc) => {
			const note = await ctx.db.get(doc.noteId);
			return note;
		});

		const notesWithTags = await asyncMap(notes, async (doc) => {
			if (!doc) return null;
			const tagsToNote = await ctx.db
				.query("notesToTags")
				.withIndex("by_notesId_tagId", (q) => q.eq("noteId", doc._id))
				.collect();

			const tagsInNote = await asyncMap(tagsToNote, async (doc) => {
				const tag = await ctx.db.get(doc.tagId);
				return tag;
			});

			return { ...doc, tags: tagsInNote };
		});

		return notesWithTags;
	},
});

export const create = mutation({
	args: { note: v.object(createNoteObject) },
	handler: async (ctx, args_0) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError("Please Sign in to view notes.");
		}

		const noteId = await ctx.db.insert("notes", {
			...args_0.note.noteData,
		});

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const userToNote = await ctx.db.insert("usersToNotes", {
			noteId: noteId,
			ownerId: userId,
		});

		if (args_0.note.tags && args_0.note.tags?.length > 0) {
			for (const tag of args_0.note?.tags) {
				const tagId = await ctx.db.insert("tags", {
					...tag,
				});
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const _tagToNoteId = await ctx.db.insert("notesToTags", {
					tagId: tagId,
					noteId: noteId,
				});

				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const _tagToUsers = await ctx.db.insert("tagsToUsers", {
					userId: userId,
					tagId: tagId,
				});
			}
		}
		return noteId;
	},
});

// update the note, with the tags if required.
export const update = mutation({
	args: {
		noteId: v.id("notes"),
		note: v.object(createNoteObject),
		tagsList: v.optional(v.array(v.id("tags"))),
	},
	handler: async (ctx, args_0) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError("Please Sign in to view notes.");
		}
		const oldNote = await ctx.db.get(args_0.noteId);
		if (!oldNote) {
			throw new ConvexError("note not found.");
		}

		await ctx.db.patch(args_0.noteId, {
			...args_0.note.noteData,
			updatedAt: Date.now(),
		});
	},
});

export const destroy = mutation({
	args: { noteId: v.id("notes") },
	handler: async (ctx, args_0) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError("Please Sign in to view notes.");
		}
		await ctx.db.delete(args_0.noteId);
		// delete note to users
		const deletedRelation = await ctx.db
			.query("usersToNotes")
			.withIndex("by_ownerId_by_noteId", (q) =>
				q.eq("ownerId", userId).eq("noteId", args_0.noteId)
			)
			.first();
		if (deletedRelation) {
			await ctx.db.delete(deletedRelation._id);
		}
		// delete tags associated with the note
		const notesToTags = await ctx.db
			.query("notesToTags")
			.withIndex("by_notesId_tagId", (q) => q.eq("noteId", args_0.noteId))
			.collect();
		await asyncMap(notesToTags,async(doc)=>{

			const tagsToUsers = await ctx.db
				.query("tagsToUsers")
				.withIndex("by_userId_tagId", (q) => q.eq("userId", userId).eq('tagId', doc.tagId))
				.first();
			if(tagsToUsers){
				await ctx.db.delete(tagsToUsers._id)
			}	
		})

		for (const noteTag of notesToTags) {
			await ctx.db.delete(noteTag._id);
		}
	},
});

export const toggleArchived = mutation({
	args: { noteId: v.id("notes"), state: v.boolean() },
	handler: async (ctx, args_0) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError("Please Sign in to view notes.");
		}

		return await ctx.db.patch(args_0.noteId, { isArchived: args_0.state });
	},
});

export const viewNote = query({
	args: { noteId: v.string() },
	handler: async (ctx, args_0) => {
		const noteId = ctx.db.normalizeId("notes", args_0.noteId);
		if (!noteId) {
			throw new ConvexError("note not found");
		}
		const note = await ctx.db.get(noteId);

		const notesToTags = await ctx.db
			.query("notesToTags")
			.withIndex("by_notesId_tagId", (q) => q.eq("noteId", noteId))
			.collect();

		const tags = await asyncMap(notesToTags, async (doc) => {
			return await ctx.db.get(doc.tagId);
		});
		return { ...note, tags };
	},
});
