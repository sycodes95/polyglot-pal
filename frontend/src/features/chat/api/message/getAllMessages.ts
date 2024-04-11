import axios from "axios"
import { config } from "../../../../config"
import { Message } from "../../types/types";
import { useQuery } from "react-query";

export const getAllMessages = async (conversationId?: number) => {
  try {
    const data = await axios.get(config.API_DOMAIN + `message/${conversationId}`);
    
    if(data.data) return data.data as Message[];

    return [];
  } catch (error) {
    console.error(error);
    return [];
  };
};

export const useQueryMessages = (conversationId?: number) => {
  return useQuery({
    ...config,
    queryKey: ["message"],
    queryFn: async ()=> getAllMessages(conversationId),
    enabled: !!conversationId
  });
};