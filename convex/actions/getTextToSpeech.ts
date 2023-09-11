"use node";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { action } from "../_generated/server";
import { v } from "convex/values";

export const getTextToSpeech = action({
  args: { 
    input: v.object({
      text: v.string() 
    }),
    voice: v.object({
      languageCode: v.string(),
      name: v.string(),
      ssmlGender: v.optional(
        v.union(
        v.literal('MALE'), 
        v.literal('FEMALE'), 
        v.literal('NEUTRAL'), 
        v.null()
        )
      )
        
    }),
  },
  handler: async (ctx, args) => {
    const { input, voice  } = args;
    const audioConfig: {audioEncoding : 'MP3'} = {
      audioEncoding: 'MP3'
    }

    if(!process.env.GC_TTS_CONVEX_STORAGE_ID) return null
    const keyUrl = await ctx.storage.get(process.env.GC_TTS_CONVEX_STORAGE_ID)
    console.log(keyUrl);
    if(!keyUrl) return null
    const keyJson = await new Response(keyUrl).json()
    const client = new TextToSpeechClient({
      credentials: {
        client_email: keyJson.client_email,
        private_key: keyJson.private_key,
      }
    });

    const [response] = await client.synthesizeSpeech({ input, voice, audioConfig});
    console.log(response.audioContent);
    const audioData = (response.audioContent as Buffer)?.toString('base64');
    console.log(audioData);
    const dataUrl = 'data:audio/mpeg;base64,' + audioData;
    return dataUrl
    
  },
});
