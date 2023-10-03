import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const mutateNativeLanguage = mutation({
  args: { 
    id: v.optional(v.id("nativeLanguage")),
    sub: v.string(), 
    languageName: v.string(),
    languageCode: v.string() 
  },
  handler: async (ctx, args) => {
    console.log(args);
    const { id, sub , languageName, languageCode } = args
    const nativeLanguageExists = ctx.db.query("nativeLanguage").filter((q) => q.eq(q.field("sub"), args.sub))
    if(nativeLanguageExists && id) {
      return await ctx.db.replace(id, { sub, languageName, languageCode });
    }
    return await  ctx.db.insert("nativeLanguage", {  sub, languageName, languageCode })
  },
});