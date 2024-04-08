import axios from "axios"
import { Message } from '../../types/types';
import { config } from '../../../../config';
import { useMutation } from "react-query";

interface GptMessage {
  role: string;
  content: string;
}

export const getGPTResponse = async (messages: Message[], input: string) => {
  try {
    const data = await axios.post(config.API_DOMAIN + "open-ai", messages);

    if(data.data) return data.data as GptMessage;

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useGPTResponse = (messages: Message[], input: string) => {
  return useMutation({
    ...config,
    mutationKey: ["get-gpt-response"],
    mutationFn: async ()=> getGPTResponse(messages, input)
  });
};