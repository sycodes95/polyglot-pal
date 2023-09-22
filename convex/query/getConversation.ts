import { query } from "../_generated/server";
import { v } from "convex/values";

export const getConversation = query({
  args: { 
    id: v.optional(v.id("conversation")), 
    sub: v.string() 
  },
  handler: async (ctx, args) => {
    const {id, sub} = args;
    if(id) {
      const conversation = await ctx.db
      .query("conversation")
      .filter((q) => q.eq(q.field("sub"), sub) && q.eq(q.field("_id"), id))
      .take(1)
      console.log(conversation);
      return conversation;
    }
    return null
    
  },
});