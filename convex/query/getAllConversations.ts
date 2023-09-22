import { query } from "../_generated/server";
import { v } from "convex/values";

export const getAllConversations = query({
  args: { 
    sub: v.string() 
  },
  handler: async (ctx, args) => {
    const { sub} = args;
    
    const conversations = await ctx.db
    .query("conversation")
    .filter((q) => q.eq(q.field("sub"), sub))
    .order('desc')
    .collect()
    return conversations;
  },
});