import {  useQuery } from "react-query"
import { Settings } from "../../types/types"
import axios from "axios"
import { config } from "../../../../config"

export const getSettings = async (conversationId?: number) => {
  try {
    const data = await axios.get(config.API_DOMAIN + `settings/${conversationId}`);
    if(data && data.data) return data.data as Settings;

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useQuerySettings = (conversationId?: number) => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async ()=> getSettings(conversationId),
    enabled: !!conversationId
  });
};