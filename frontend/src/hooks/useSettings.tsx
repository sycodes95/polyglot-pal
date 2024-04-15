import { useEffect, useState } from "react";
import { Settings } from "../features/chat/types/types";
import { useUpdateSettings } from "../features/chat/api/settings/updateSettings";

const defaultSettings: Settings = {
  cefrLevel: "C2",
  ttsEnabled: true
};

interface UseSettingsProps {
  conversationId: string | undefined;
}

export const useSettings = ({ conversationId } : UseSettingsProps) => {

  const [ settings, setSettings ] = useState<Settings>(defaultSettings);

  const updateSettings = useUpdateSettings(settings);

  const handleLevelChange = (cefrLevel: Settings["cefrLevel"]) => {
    setSettings(prev => ({...prev, cefrLevel}));
  };

  const handleTtsEnabled = (ttsEnabled: boolean) => {
    setSettings(prev => ({...prev, ttsEnabled}));
  };

  useEffect(()=> {
    if(conversationId) {
      updateSettings.mutateAsync();
    }
  },[settings])

  return {
    settings,
    setSettings,
    handleLevelChange,
    handleTtsEnabled
  };
}