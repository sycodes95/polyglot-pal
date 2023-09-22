import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  conversation: defineTable({
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
  }),
  nativeLanguage: defineTable({
    sub: v.string(),
    languageName: v.string(),
    languageCode: v.string()
  })

});