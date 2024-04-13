import { useMutation, useQueryClient } from "react-query"
import { Message } from "../../types/types"
import axios from "axios"
import { config } from "../../../../config"

export const deleteAllMsgs = async (conversationId?: number) => {
  try {
    if(!conversationId) return null
    const data = await axios.delete(config.API_DOMAIN + `message/${conversationId}`);

    if(data && data.data) return data.data as Message;

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useDeleteAllMsgs = (conversationId? : number) => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["message"],
    mutationFn: async ()=> deleteAllMsgs(conversationId),
    // onSuccess: ()=> {
    //   queryClient.invalidateQueries("message")
    // }
  });
};