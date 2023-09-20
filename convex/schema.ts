import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  convo: defineTable({
    title: v.string(),
    body: v.string(),
    priority: v.string(),
    dateCreated: v.string(),
    dateDeadline: v.string(),
  }),
  nativeLanguage: defineTable({
    sub: v.string(),
    languageName: v.string(),
    languageCode: v.string()
  })

});