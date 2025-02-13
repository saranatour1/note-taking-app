import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../_generated/server";
import { ConvexError } from "convex/values";
import { asyncMap } from "convex-helpers";

export const viewer = query({
	args: {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handler: async (ctx, _args_0) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError("Please Sign in to view notes.");
		}
    const tagsToUsers = await ctx.db.query('tagsToUsers')
    .withIndex('by_userId_tagId',q=>q.eq('userId', userId))
    .collect();

    const tags = await asyncMap(tagsToUsers, async(doc)=>{
      const tag = await ctx.db.get(doc.tagId);
      return tag
    })

    return tags
  },
});
