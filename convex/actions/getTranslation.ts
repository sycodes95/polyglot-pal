"use node";

import { v2 as Translate } from '@google-cloud/translate'
import { action } from "../_generated/server";
import { v } from "convex/values";


export const getTranslation = action({
  args: {
    text: v.string(),
    targetLanguage: v.string()
  },
  handler: async(ctx, args) => {
    const { text, targetLanguage } = args;

    if(!process.env.GC_TTS_KEY_STORAGE_ID) return null
    const keyUrl = await ctx.storage.get(process.env.GC_TTS_KEY_STORAGE_ID)
    const keyJson = await new Response(keyUrl).json()
    const translate = new Translate.Translate({
      credentials: {
        client_email: keyJson.client_email,
        private_key: keyJson.private_key,
      },
    });

    const [translation] = await translate.translate(text, targetLanguage );
    
    return translation;
  }
})