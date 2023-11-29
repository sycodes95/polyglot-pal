"use node";

import { LanguageServiceClient } from "@google-cloud/language";
import { action } from "../_generated/server";
import { v } from "convex/values";

type Document = {
  content: string,
  type: "PLAIN_TEXT" | "TYPE_UNSPECIFIED" | "HTML" | null | undefined
}

export const getDetectedLanguage = action({
  args: {
    text: v.string()
  },
  handler: async(ctx, args) => {
    const { text } = args;

    if(!process.env.GC_KEY_STORAGE_ID) return null
    const keyUrl = await ctx.storage.get(process.env.GC_KEY_STORAGE_ID)
    const keyJson = await new Response(keyUrl).json()
    const client = new LanguageServiceClient({
      credentials: {
        client_email: keyJson.client_email,
        private_key: keyJson.private_key,
      },
    });

    const document: Document = {
      content: text,
      type: 'PLAIN_TEXT'
    }

    const [result] = await client.analyzeEntities({document});
    const languageCode = result.language;

    return languageCode;
  }
})