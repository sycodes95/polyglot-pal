import { useMutation } from "react-query"
import { config } from '../../../../config';
import axios from "axios";
import { ConversationDto } from "../../types/types";

export const createConversation = async () => {
  try {
    const data =  await axios.post(config.API_DOMAIN + "conversation");
    if(data.data) {
      return data.data as ConversationDto;
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
