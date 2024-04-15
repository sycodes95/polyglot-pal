import { useParams } from "react-router-dom";
import { LanguageData, Settings } from "../types/types";
import { ReactNode, useEffect } from "react";
import { cefrLevels } from '../../../constants/cefrLevels';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import StairsIcon from '@mui/icons-material/Stairs';

interface SettingsBarProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  languageData: LanguageData;
  handleLevelChange: (cefrLevel: Settings["cefrLevel"])=> void;
}

export const SettingsBar = ({ settings, setSettings, languageData, handleLevelChange } : SettingsBarProps) => {
  
  return (
    <>
      {
        languageData.voiceName &&
        <div className="flex items-center gap-4">
          <Select onValueChange={(value) => handleLevelChange(value.toUpperCase() as Settings["cefrLevel"])}>
            <SelectTrigger className="w-[100px] h-8 flex items-center text-sm gap-2 border-border/30" disabled={!languageData.voiceName}>
              <StairsIcon className="text-primary" fontSize="inherit"/>
              <SelectValue className="text-sm placeholder:text-yellow-100" placeholder={settings.cefrLevel}/>
            </SelectTrigger>
            <SelectContent className="w-full">
              {
                Object.entries(cefrLevels).reverse().map(([key, _]) => (
                <SelectItem className="w-full text-sm" key={key} value={key} 
                >{key}</SelectItem>
    
                  // <button className={`${settings.cefrLevel === key && "bg-white/5"} text-sm text-yellow-100 bg-black/10 p-2 w-10`} key={key} onClick={()=> setSettings(prev => ({...prev, cefrLevel: key as Settings["cefrLevel"]}))}>
                  //   {key}
                  // </button>
                ))
              }
              
            </SelectContent>
          </Select>
    
          <div className={`rounded-md w-fit border border-border/20 h-8 flex items-center`}>
            <button className={`text-sm pl-2 pr-2 h-full w-full rounded-md hover:opacity-80 transition-all
            ${settings.ttsEnabled ? "border border-green-400/70 text-green-400/70" : "border border-red-500 text-red-500"}
            ${!languageData.voiceName && "cursor-not-allowed"}
            `}
            onClick={()=> setSettings(prev => ({...prev, ttsEnabled: !prev.ttsEnabled}))}
            disabled={!languageData.voiceName}
            >AI Text-To-Speech</button>
          </div>
            
          
        </div>
      }

    </>

  );
};