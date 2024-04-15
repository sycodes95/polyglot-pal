import { useEffect, useState } from 'react';
import { LanguageData, VoiceData } from '../types/types';

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
import { languageNameAndCodes } from '../../../constants/languageNameAndCodes';
import { cn } from '../../../lib/utils';
import { getLangNameFromCode } from '../utils/getLangNameFromCode';
import { useDeleteAllMsgs } from '../api/message/deleteAllMessages';
import { UseQueryResult } from 'react-query';

interface LanguageSelectProps {
  // isNewConversationState: {
  //   isNewConversation: boolean;
  //   setIsNewConversation: React.Dispatch<React.SetStateAction<boolean>>;
  // }
  // createMutationConversation: UseMutationResult<ConversationId | null, unknown, void, unknown>;
  languageDataState: {
    languageData: LanguageData;
    setLanguageData: React.Dispatch<React.SetStateAction<LanguageData>>;
  },
  googleVoiceData: UseQueryResult<VoiceData, unknown>,
  handleLanguageSelect: (voiceName: string) => void;
}

export const LanguageDataSelect = ({ 
  languageDataState,
  googleVoiceData,
  handleLanguageSelect
}: LanguageSelectProps) => {
  
  const [open, setOpen] = useState(false);

  const { languageData, setLanguageData } = languageDataState;

  const deleteAllMsgs = useDeleteAllMsgs();

  // const handleOnSelect = (voiceName: string) => {

  //   const [languageCode, countryCode, _, __] = voiceName.split("-");
  //   const languageName = languageNameAndCodes.find(lang => lang.languageCode === languageCode)?.languageName;
  //   const name = data?.voices.find(voice => voice.name.toLowerCase() === voiceName)?.name;
  //   const ssmlGender = data?.voices.find(voice => voice.name.toLowerCase() === voiceName)?.ssmlGender;

  //   if(!name || !languageCode || !countryCode || !languageName || !ssmlGender) {
  //     return 
  //   };
    
  //   setLanguageData(prev => ({
  //     ...prev,
  //     languageName,
  //     languageCode,
  //     countryCode,
  //     voiceName: name,
  //     ssmlGender,
  //   }));
  // };

  const resetLanguageData = () => {
    setLanguageData({
      languageName: "",
      languageCode: "",
      countryCode: "",
      voiceName: "",
      ssmlGender: "",
    });
  };

  useEffect(()=> {
    console.log(languageData)
  },[languageData])


  return (
    <>
      {
        googleVoiceData && googleVoiceData.data && 
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full flex gap-4 justify-between"
            >
              <div className='flex gap-4 items-center'>
                <span className='text-white'>{languageData.languageName}</span>
                <span className='text-white'>{languageData.voiceName}</span>
              </div>
              {
              }
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 ">
            <Command className='w-full'>
              <CommandInput placeholder="Search framework..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup className='overflow-y-auto max-h-[400px]'>
                <CommandItem
                className='text-white'
                  value={undefined}
                  onSelect={() => {
                    resetLanguageData();
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      !languageData.voiceName ? "opacity-100" : "opacity-0"
                    )}
                  />
                  ...
                </CommandItem>

                {googleVoiceData.data.voices.map((voice) => (
                  <CommandItem
                  className='text-white'
                    key={voice.name}
                    value={voice.name}
                    onSelect={(currentValue) => {
                      handleLanguageSelect(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        languageData.voiceName === voice.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className='flex gap-2 items-center'>
                      <span>{languageNameAndCodes.find(data => data.languageCode === getLangNameFromCode(voice.languageCodes[0]))?.languageName}</span>
                      <span>{voice.name}</span>
                    </div>
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