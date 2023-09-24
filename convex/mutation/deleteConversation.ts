import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const deleteConversation = mutation({
  args: { 
    id: v.optional(v.id("conversation")),
    sub: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, sub } = args
    const conversationsExists = ctx.db.query("conversation").filter((q) => q.eq(q.field("sub"), sub))
    if(conversationsExists && id) {
      return await ctx.db.delete(id);
    }
  },
});