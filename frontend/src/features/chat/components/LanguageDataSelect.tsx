import { useState, useEffect } from 'react';
import { LanguageData } from "../types/types"

import { Check, ChevronsUpDown } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useVoiceData } from "../api/google/getVoiceDatas"
import { useParams } from 'react-router-dom';
import { languageNameAndCodes } from '../../../constants/languageNameAndCodes';
import { cn } from '../../../lib/utils';

interface LanguageSelectProps {
  isSaved: boolean;
}

export const LanguageDataSelect = ({ isSaved }: LanguageSelectProps) => {
  const param = useParams();
  const [open, setOpen] = useState(false);
  const { data } = useVoiceData();
  const [languageData, setLanguageData] = useState<LanguageData>({
    languageName: "",
    languageCode: "",
    countryCode: "",
    voiceName: "",
    ssmlGender: ""
  });
  useEffect(() => {
    console.log(data)
  },[data])

  const handleOnSelect = (voiceName: string) => {

    const [languageCode, countryCode, _, __] = voiceName.split("-");
    const languageName = languageNameAndCodes.find(lang => lang.languageCode === languageCode)?.languageName;
    const ssmlGender = data?.voices.find(voice => voice.name === voiceName);

    if(!voiceName || !languageCode || !countryCode || !languageName || !ssmlGender) {
      return 
    };


  }

  return (
    <>
      {
        data && 
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {
                <span>{languageData.voiceName}</span>
              }
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {data.voices.map((voice) => (
                  <CommandItem
                    key={voice.name}
                    value={voice.name}
                    onSelect={(currentValue) => {
                      handleOnSelect(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        languageData.voiceName === voice.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {languageData.languageName}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

      }
    </>
    
  )
}