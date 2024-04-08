import { useQuery } from "react-query"
import { config } from '../../../../config';
import axios from "axios";
import { VoiceData } from "../../types/types";

export const getVoiceData = async () => {
  try {
    const data = await axios.get(config.API_DOMAIN + "google-api/voice-data");
    if(data && data.data) return data.data as VoiceData;
    throw new Error("Error retrieving voice data from google api");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const useGoogleVoiceData = () => {
  return useQuery({
    ...config,
    queryKey: ["get-voice-data"],
    queryFn: async ()=> getVoiceData()
  });
}

