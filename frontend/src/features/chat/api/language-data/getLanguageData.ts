import axios from "axios"
import { config } from "../../../../config"
import { useQuery } from "react-query";
import { LanguageData } from "../../types/types";

type ConversationId = number;

export const getLanguageData = async (conversationId: ConversationId) => {
  try {
    const data = await axios.get(config.API_DOMAIN + `language-data?conversationId=${conversationId}`);

    if(data && data.data) return data.data as LanguageData;

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useQueryLanguageData = (conversationId: ConversationId) => {
  return useQuery({
    ...config,
    queryKey: ["get-language-data"],
    queryFn: async ()=> getLanguageData(conversationId)
  });
};