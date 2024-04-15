import { useEffect, useState } from "react";
import { LanguageData, Settings } from "../features/chat/types/types";
import { useUpdateSettings } from "../features/chat/api/settings/updateSettings";
import { InitConversationParam } from "./useConversation";
import { useQueryClient } from "react-query";

const defaultSettings: Settings = {
  cefrLevel: "C2",
  ttsEnabled: true
};

interface UseSettingsProps {
  conversationId: string | undefined;
  initConversation: (initializer: InitConversationParam,
    data: {
      langData?: LanguageData,
      cefrLevel?: Settings["cefrLevel"]
    })=> void;
};

export const useSettings = ({ conversationId, initConversation } : UseSettingsProps) => {

  const queryClient = useQueryClient();

  const [ settings, setSettings ] = useState<Settings>(defaultSettings);

  const updateSettings = useUpdateSettings(settings);

  const handleLevelChange = (cefrLevel: Settings["cefrLevel"]) => {
    setSettings(prev => ({...prev, cefrLevel}));
    initConversation("settings", { cefrLevel });
  };

  const handleTtsEnabled = (ttsEnabled: boolean) => {
    setSettings(prev => ({...prev, ttsEnabled}));
  };

  useEffect(()=> {
    if(conversationId) {
      updateSettings.mutateAsync();
    };
  },[settings]);

  useEffect(()=> {
    if(updateSettings.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["all-conversations"]});
    }
  },[updateSettings.isSuccess])

  return {
    settings,
    setSettings,
    handleLevelChange,
    handleTtsEnabled
  };
}