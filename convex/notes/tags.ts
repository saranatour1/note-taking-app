import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import { asyncMap } from "convex-helpers";
import { tagsObject } from "./tables";

export const viewer = query({
	args: {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handler: async (ctx, _args_0) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError("Please Sign in to view notes.");
		}
		const tagsToUsers = await ctx.db
			.query("tagsToUsers")
			.withIndex("by_userId_tagId", (q) => q.eq("userId", userId))
			.collect();

		const tags = await asyncMap(tagsToUsers, async (doc) => {
			const tag = await ctx.db.get(doc.tagId);
			return tag;
		});

		return tags;
	},
});

export const create = mutation({
	args: { noteId: v.id("notes"), tags: v.array(v.object(tagsObject)) },
	handler: async (ctx, args_0) => {
		// get userId
		const user = await getAuthUserId(ctx);
		if (!user) {
			throw new ConvexError("not signed in");
		}
		// create the tags first
		const createdTags = await asyncMap(args_0.tags, async (item) => {
			const tag = await ctx.db.insert("tags", {
				...item,
			});
			return tag;
		});
		// assign the tags to the noteId
		await asyncMap(createdTags, async (doc) => {
			await ctx.db.insert("tagsToUsers", {
				userId: user,
				tagId: doc,
			});

			await ctx.db.insert("notesToTags", {
				noteId: args_0.noteId,
				tagId: doc,
			});
		});
	},
});

export const update = mutation({
	args: { noteId: v.id("notes"), tags: v.array(v.object(tagsObject)) },
	handler: async (ctx, args_0) => {
		// get userId
		const user = await getAuthUserId(ctx);
		if (!user) {
			throw new ConvexError("not signed in");
		}
		// delete all previous tags relations
		const previousTags = await ctx.db
			.query("notesToTags")
			.withIndex("by_notesId_tagId", (q) => q.eq("noteId", args_0.noteId))
			.collect();
      // run this only if old tags are available
    if(previousTags.length > 0 && args_0.tags){
      await asyncMap(previousTags, async (doc) => {
        const tagToUser = await ctx.db
          .query("tagsToUsers")
          .withIndex("by_userId_tagId", (q) =>
            q.eq("userId", user).eq("tagId", doc.tagId)
          )
          .first();
        if (tagToUser) {
          await ctx.db.delete(tagToUser._id);
        }
        await ctx.db.delete(doc._id);
      });
    }
    
		// add all the new tags
		const newTags = await asyncMap(args_0.tags, async (doc) => {
			const newTag = await ctx.db.insert("tags", { ...doc });
			return newTag;
		});

		// add all the relations to the new Tags
		return await asyncMap(newTags, async (doc) => {
			const tagToNote = await ctx.db.insert("notesToTags", {
				noteId: args_0.noteId,
				tagId: doc,
			});
			const tagToUser = await ctx.db.insert("tagsToUsers", {
				tagId: doc,
				userId: user,
			});
			return { tagToNote, tagToUser };
		});
	},
});
