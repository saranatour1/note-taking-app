import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import { asyncMap } from "convex-helpers";
import { notesObject, tagsObject } from "./tables";

export const createNoteObject = {
  tags: v.optional(v.array(v.object(tagsObject))),
  noteData:v.object(notesObject)
}
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
  args:{ note : v.object(createNoteObject) },
  handler:async(ctx, args_0) =>{
    const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError("Please Sign in to view notes.");
		}

    const noteId = await ctx.db.insert('notes',{
      ...args_0.note.noteData
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userToNote = await ctx.db.insert('usersToNotes',{
      noteId:noteId,
      ownerId:userId,
    })

    if(args_0.note.tags && args_0.note.tags?.length > 0){
      for(const tag of args_0.note?.tags){
        const tagId  = await ctx.db.insert('tags',{
          ...tag
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _tagToNoteId = await ctx.db.insert('notesToTags',{
          tagId:tagId,
          noteId:noteId
        })
       }
    }
    return noteId 
  },
})

export const update = mutation({
  args:{},
  handler:async(ctx, args_0) =>{
    
  },
})

export const destroy = mutation({
  args:{},
  handler:async(ctx, args_0) =>{
    
  },
})

export const markAsArchived = mutation({
  args:{},
  handler:async(ctx, args_0) =>{
    
  },
})

export const viewBasedOnArchive = query({
  args:{archive:v.boolean()},
  handler:async(ctx, args_0) =>{
    
  },
})