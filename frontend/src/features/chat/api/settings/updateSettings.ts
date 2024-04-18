import axios from "axios";
import { Settings } from "../../types/types";
import { config } from "../../../../config";
import { useMutation } from "react-query";

export const updateSettings = async (settings : Settings) => {

  try {
    if(!settings.conversationId || !settings.id) return null;
    const data = await axios.put(config.API_DOMAIN + `settings/${settings.id}`, settings);

    if(data && data.data) return data.data as Settings;
    return null;

  } catch (error) {
    console.error(error);
    return null;
  };

};

export const useUpdateSettings = (settings : Settings) => {
  return useMutation({
    mutationKey: ["settings"],
    mutationFn: async ()=> updateSettings(settings)
  });
};

