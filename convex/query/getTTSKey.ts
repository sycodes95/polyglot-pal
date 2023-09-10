
import { query } from "../_generated/server";

export const getTTSKey = query({
  args: {},
  handler: async (ctx) => {
    if(!process.env.GC_TTS_CONVEX_STORAGE_ID) return ''
    const key = await ctx.storage.getUrl(process.env.GC_TTS_CONVEX_STORAGE_ID)
    return key
  },
});