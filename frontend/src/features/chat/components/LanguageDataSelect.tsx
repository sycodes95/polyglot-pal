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
import { useParams } from 'react-router-dom';
import { languageNameAndCodes } from '../../../constants/languageNameAndCodes';
import { cn } from '../../../lib/utils';
import { UseMutationResult } from 'react-query';
import { useMutateLanguageData } from '../api/language-data/createLanguageData';
import { useQueryLanguageData } from '../api/language-data/getLanguageData';
import { useUpdateMutateLanguageData } from '../api/language-data/updateLanguageData';

interface LanguageSelectProps {
  isNewConversation: boolean;
  createMutationConversation: UseMutationResult<ConversationDto | null, unknown, void, unknown>;
  languageDataState: {
    languageData: LanguageData;
    setLanguageData: React.Dispatch<React.SetStateAction<LanguageData>>;
  }
}

export const LanguageDataSelect = ({ 
  isNewConversation, 
  createMutationConversation,
  languageDataState
}: LanguageSelectProps) => {

  const { conversationId } = useParams();
  
  const [open, setOpen] = useState(false);

  const { data } = useGoogleVoiceData();
  
  const { languageData, setLanguageData } = languageDataState;

  const createMutateLanguageData = useMutateLanguageData(languageData);

  const updateMutateLanguageData = useUpdateMutateLanguageData(languageData);

  const queryLanguageData = useQueryLanguageData(Number(conversationId));

  const handleOnSelect = (voiceName: string) => {

    const [languageCode, countryCode, _, __] = voiceName.split("-");
    const languageName = languageNameAndCodes.find(lang => lang.languageCode === languageCode)?.languageName;
    const name = data?.voices.find(voice => voice.name.toLowerCase() === voiceName)?.name;
    const ssmlGender = data?.voices.find(voice => voice.name.toLowerCase() === voiceName)?.ssmlGender;

    if(!name || !languageCode || !countryCode || !languageName || !ssmlGender) {
      return 
    };
    
    setLanguageData({
      languageName,
      languageCode,
      countryCode,
      voiceName: name,
      ssmlGender
    });
  };

  useEffect(() => {
    if(queryLanguageData.isSuccess && queryLanguageData.data ) {
      setLanguageData(queryLanguageData.data);
    };
  },[queryLanguageData.isSuccess])

  useEffect(() => {
    // once conversation is created in the db, use the data returned to insert conversationId into languagedata state
    if(createMutationConversation.isSuccess && createMutationConversation.data) {
      const conversationId = createMutationConversation.data.id;
      setLanguageData(prev => ({...prev, conversationId}));
    };
  },[createMutationConversation.isSuccess]);

  useEffect(() => {
    if(languageData.conversationId && isNewConversation) {
      createMutateLanguageData.mutateAsync()
    } else if(languageData.conversationId && !isNewConversation) {
      updateMutateLanguageData.mutateAsync();
    };
  },[languageData])

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