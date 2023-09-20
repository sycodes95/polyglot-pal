import { query } from "../_generated/server";
import { v } from "convex/values";

export const getNativeLanguage = query({
  args: { sub: v.string() },
  handler: async (ctx, args) => {
    const nativeLanguage = await ctx.db
      .query("nativeLanguage")
      .filter((q) => q.eq(q.field("sub"), args.sub))
      .take(100);
    console.log(nativeLanguage);
    return nativeLanguage;
  },
});