import { defineTable } from "convex/server";
import { v } from "convex/values";

export const tagsObject = {
	title: v.union(v.string()),
	color: v.optional(v.string()),
	description: v.optional(v.string()),
};

export const notesObject = {
	title: v.string(),
	description: v.optional(v.string()),
	isArchived: v.boolean(),
	updatedAt: v.number(),
};

export const tags = defineTable(tagsObject).index("by_title", ["title"]);

export const usersToNotes = defineTable({
	ownerId: v.id("users"),
	noteId: v.id("notes"),
}).index("by_ownerId_by_noteId", ["ownerId", "noteId"]);

export const notes = defineTable(notesObject)
	.index("by_title_isArchived", ["title", "isArchived"])
	.searchIndex("search_title", {
		searchField: "title",
		filterFields: ["isArchived", "description"],
	});

// tags to notes
export const notesToTags = defineTable({
	noteId: v.id("notes"),
	tagId: v.id("tags"),
}).index("by_notesId_tagId", ["noteId", "tagId"]);

export const tagsToUsers = defineTable({
	userId: v.id("users"),
	tagId: v.id("tags"),
}).index("by_userId_tagId", ["userId", "tagId"]);
