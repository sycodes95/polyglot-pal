"use node";
import { action } from "../_generated/server";

export const getTTSVoices = action({
  args: {},
  handler: async () => {
    return await fetch(`https://texttospeech.googleapis.com/v1/voices?key=${process.env.GC_API_KEY}`)
    .then(res => res.json())
    .then(data => {
      if(data && data.voices.length > 0) {
        return data.voices
      }
      return []
    })
    .catch(err => {
      console.error(err)
      return []
    })
  }
})
  
