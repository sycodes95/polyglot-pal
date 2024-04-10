import { useMutation, useQueryClient } from "react-query"
import { Message, Settings } from "../../types/types"
import axios from "axios"
import { config } from "../../../../config"

export const createSettings = async (settings?: Settings) => {
  try {
    if(!settings || !settings.conversationId) return null;
    const data = await axios.post(config.API_DOMAIN + "settings", {
      cefrLevel: settings.cefrLevel,
      ttsEnabled: settings.ttsEnabled,
      conversationId: settings.conversationId,
    });

    if(data && data.data) return data.data as Settings;

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useCreateSettings = (settings?: Settings) => {
  return useMutation({
    mutationKey: ["settings"],
    mutationFn: async ()=> createSettings(settings),
  });
};