import axios from "axios"
import { Conversation } from '../../types/types';
import { config } from "../../../../config";
import { useQuery } from "react-query";

export const getAllConversations = async () => {
  try {
    const data = await axios.get(config.API_DOMAIN + "conversation");

    if(data) return data.data as Conversation[];
    // if(data) return data.data;
    return null;
    
  } catch (err) {
    console.error(err);
    return null;
  };
};

export const useAllConversations = () => {
  return useQuery({
    ...config,
    queryKey: ["all-conversations"],
    queryFn: async ()=> getAllConversations
  });
}; 
