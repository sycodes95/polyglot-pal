import { useMutation } from "react-query"
import { config } from '../../../../config';
import axios from "axios";
import { ConversationDto } from "../../types/types";

export interface ConversationId {
  id: number;
};

export const createConversation = async () => {
  try {
    const data =  await axios.post(config.API_DOMAIN + "conversation");
    if(data.data) {
      return data.data as ConversationId;
    } else {
      throw new Error("Error creating conversation");
    }

  } catch(err) {
    console.error(err);
    throw err;
  };
  
};

export const useCreateConversation = () => {
  return useMutation({
    ...config,
    mutationKey: ["create-conversation"],
    mutationFn: async ()=> createConversation()
  });
};
