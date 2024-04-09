import { useMutation, useQueryClient } from "react-query"
import { Message } from "../../types/types"
import axios from "axios"
import { config } from "../../../../config"

export const createMessage = async (message?: Message) => {
  try {
    if(!message) return null
    const data = await axios.post(config.API_DOMAIN + "message", {
      role: message.role,
      content: message.content,
    });

    if(data && data.data) return data.data as Message;

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useMutateMessage = (message?: Message) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["message"],
    mutationFn: async ()=> createMessage(message),
    onSuccess: ()=> {
      queryClient.invalidateQueries("message")
    }
  });
};