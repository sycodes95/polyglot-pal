import { useState, useEffect } from 'react';
import { ConversationDto, LanguageData } from "../types/types"

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

import { useGoogleVoiceData } from "../api/google/getVoiceDatas"
import { useNavigate, useParams } from 'react-router-dom';
import { languageNameAndCodes } from '../../../constants/languageNameAndCodes';
import { cn } from '../../../lib/utils';
import { UseMutationResult } from 'react-query';
import { useCreateLanguageData } from '../api/language-data/createLanguageData';
import { useQueryLanguageData } from '../api/language-data/getLanguageData';
import { useUpdateLanguageData } from '../api/language-data/updateLanguageData';
import { ConversationId } from '../api/conversation/createConversation';

interface LanguageSelectProps {
  // isNewConversationState: {
  //   isNewConversation: boolean;
  //   setIsNewConversation: React.Dispatch<React.SetStateAction<boolean>>;
  // }
  // createMutationConversation: UseMutationResult<ConversationId | null, unknown, void, unknown>;
  languageDataState: {
    languageData: LanguageData;
    setLanguageData: React.Dispatch<React.SetStateAction<LanguageData>>;
  }
}

export const LanguageDataSelect = ({ 
  languageDataState
}: LanguageSelectProps) => {
  
  const [open, setOpen] = useState(false);

  const { data } = useGoogleVoiceData();
  
  const { languageData, setLanguageData } = languageDataState;

  const handleOnSelect = (voiceName: string) => {

    const [languageCode, countryCode, _, __] = voiceName.split("-");
    const languageName = languageNameAndCodes.find(lang => lang.languageCode === languageCode)?.languageName;
    const name = data?.voices.find(voice => voice.name.toLowerCase() === voiceName)?.name;
    const ssmlGender = data?.voices.find(voice => voice.name.toLowerCase() === voiceName)?.ssmlGender;

    if(!name || !languageCode || !countryCode || !languageName || !ssmlGender) {
      return 
    };
    
    setLanguageData(prev => ({
      ...prev,
      languageName,
      languageCode,
      countryCode,
      voiceName: name,
      ssmlGender,
    }));
  };

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
              className="w-full justify-between"
            >
              {
                <span className='text-white'>{languageData.voiceName}</span>
              }
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {data.voices.map((voice) => (
                  <CommandItem
                  className='text-white'
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
                    {voice.name}
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