import axios from "axios";
import { config } from "../../../../config";
import { useMutation } from "react-query";

export const deleteConversation = async (conversationId: number | null) => {
  try {
    if(!conversationId) return null;
    const data = await axios.delete(config.API_DOMAIN + `conversation/${conversationId}`);
    if(data.status !== 204) throw new Error("Error deleting conversation");

  } catch (error) {
    throw error;
  };
};

export const useDeleteConversation = (conversationId: number | null) => {
  return useMutation({
    mutationKey: ["delete-conversation"],
    mutationFn: async ()=> deleteConversation(conversationId),
  });
};