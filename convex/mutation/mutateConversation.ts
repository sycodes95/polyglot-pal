import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const mutateConversation = mutation({
  args: { 
    id: v.optional(v.id("conversation")),
    sub: v.string(),
    messages: v.array(v.object({ 
      content: v.string(), 
      role: v.string() 
    })),
    selectedLanguageData: v.object({
      languageCode: v.string(),
      countryCode: v.string(),
      voiceName: v.string(),
      languageName: v.string(),
      ssmlGender: v.string()
    }),
    cefrLevel: v.string(),
    ttsEnabled: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { 
      id, 
      sub, 
      messages, 
      selectedLanguageData, 
      cefrLevel, 
      ttsEnabled 
    } = args;
    
    const conversationExists = ctx.db.query("conversation").filter((q) => q.eq(q.field("sub"), args.sub))
    if(conversationExists && id) {
      await ctx.db.replace(id, { sub, messages, selectedLanguageData, cefrLevel, ttsEnabled });
      const data = await ctx.db.get(id);
      return data?._id
    }
    return await  ctx.db.insert("conversation", {  sub, messages, selectedLanguageData, cefrLevel, ttsEnabled })
  },
});