import { useAction } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { formatGCTTSVoiceOptions } from "../../../utils/formatGCTTSVoiceOptions";
import { LanguageOption } from "../types";

const useLanguageOptions = () => {
  const [languageOptions, setLanguageOptions] = useState<LanguageOption[] | []>([])

  const getTTSVoiceOptionList = useAction(api.actions.getTTSVoices.getTTSVoices);
  
  useEffect(()=> {
    async function getLangAndVoiceOptions() {
      const gcVoiceList = await getTTSVoiceOptionList();
      const formattedVoiceList = formatGCTTSVoiceOptions(gcVoiceList);
      setLanguageOptions(formattedVoiceList);
    }

    getLangAndVoiceOptions();
  },[getTTSVoiceOptionList])

  return { languageOptions }
}

export default useLanguageOptions;