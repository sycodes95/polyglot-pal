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
      <div className="w-fit grid grid-cols-6 items-center rounded-b-lg overflow-hidden border">
        {
          Object.entries(cefrLevels).map(([key, value]) => (
            <button className="text-sm text-white bg-black/10 p-2 w-10" key={key}>
              {key}
            </button>
          ))
        }

      </div>
     
      <button></button>
    </div>
  );
};