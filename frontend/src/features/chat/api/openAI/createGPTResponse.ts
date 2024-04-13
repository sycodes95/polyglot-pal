import axios from "axios"
import { Message } from '../../types/types';
import { useMutation } from "react-query";
import { config } from "../../../../config";

interface GptMessage {
  role: string;
  content: string;
}

export const createGPTResponse = async (messages: Message[], input: string) => {
  try {
    const data = await axios.post(config.API_DOMAIN + "open-ai", { messages, input });
    console.log(data)
    if(data.data) return data.data as Message;

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useGPTResponse = (messages: Message[], input: string) => {
  return useMutation({
    mutationKey: ["get-gpt-response"],
    mutationFn: async ()=> createGPTResponse(messages, input)
  });
};