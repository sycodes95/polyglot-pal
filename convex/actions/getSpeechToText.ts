"use node";
import { SpeechClient } from "@google-cloud/speech"
import { action } from "../_generated/server";
import { v } from "convex/values";

type Request = {
  audio: { content: string },
  config: {
    encoding: "LINEAR16" | "ENCODING_UNSPECIFIED" | "FLAC" | "MULAW" | "AMR" | "AMR_WB" | "OGG_OPUS" | "SPEEX_WITH_HEADER_BYTE" | "WEBM_OPUS" | null | undefined,
    sampleRateHertz?: number,
    languageCode: string
  }
}

export const getSpeechToText = action({
  args: { 
    base64: v.string(),
    languageCode: v.string(),
    sampleRate: v.number()
  },
  handler: async (ctx, args) => {
    try {
      const { base64, languageCode, sampleRate } = args;

      //create request object to send to GC STT API
      const request: Request = {
        audio: { content: base64 },
        config: {
          encoding: 'WEBM_OPUS',
          sampleRateHertz: sampleRate,
          languageCode: languageCode
        }
      };

      if(!process.env.GC_KEY_STORAGE_ID) return null;

      const keyUrl = await ctx.storage.get(process.env.GC_KEY_STORAGE_ID)
      //if for whatever reason GC API KEY is not found in storage, return null
      if(!keyUrl) return null

      const keyJson = await new Response(keyUrl).json()

      //create STT client with credentials
      const client = new SpeechClient({
        credentials: {
          client_email: keyJson.client_email,
          private_key: keyJson.private_key,
        }
      });
      
      const [response] = await client.recognize(request);
      if(response.results && response.results.length < 1){
        return null
      }
      
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) { 
        console.error('Error processing audio:', error.message);
        return null;
      } else {
        console.error('An unknown error occurred:', error);
        return null;
      }
    }
    
    // const audioData = (response.audioContent as Buffer)?.toString('base64');
    // const dataUrl = 'data:audio/mpeg;base64,' + audioData;
    // return dataUrl
    
  },
});
