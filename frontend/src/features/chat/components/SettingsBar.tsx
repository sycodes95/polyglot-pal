import { useParams } from "react-router-dom";
import { Settings } from "../types/types";
import { ReactNode } from "react";
import { cefrLevels } from '../../../constants/cefrLevels';


interface SettingsBarProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export const SettingsBar = ({ settings, setSettings} : SettingsBarProps) => {

  return (
    <div className="flex items-center">
      <div className="w-fit grid grid-cols-6 items-center overflow-hidden border">
        {
          Object.entries(cefrLevels).reverse().map(([key, value]) => (
            <button className={`${settings.cefrLevel === key && "bg-white/5"} text-sm text-white bg-black/10 p-2 w-10`} key={key} onClick={()=> setSettings(prev => ({...prev, cefrLevel: key as Settings["cefrLevel"]}))}>
              {key}
            </button>
          ))
        }

      </div>
     
      <button></button>
    </div>
  );
};