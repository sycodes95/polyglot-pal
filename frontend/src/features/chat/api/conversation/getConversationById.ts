import axios from "axios"
import { ConversationDto } from '../../types/types';
import { config } from "../../../../config";
import { useQuery } from "react-query";

type ConversationId = number;

export const getConversationById = async (conversationId?: ConversationId) => {
  try {
    const data = await axios.get(config.API_DOMAIN + `conversation/?id=${conversationId}`);

    console.log(conversationId)
    if(data) return data.data as ConversationDto;
    // if(data) return data.data;
    return null;
    
  } catch (err) {
    console.error(err);
    return null;
  };
};

export const useQueryConversation = (conversationId?: ConversationId) => {
  return useQuery({
    ...config,
    queryKey: ["get-conversation-id"],
    queryFn: async ()=> getConversationById(conversationId),
    enabled: !!conversationId
  });
}; 
