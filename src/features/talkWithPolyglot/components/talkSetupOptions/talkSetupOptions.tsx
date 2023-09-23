import CountryFlag from "../../../../components/countryFlag/countryFlag"
import TalkOptionSetupContainer from "../../../../components/talkSetupOptionContainer/talkSetupOptionContainer"
import { cefrLevels } from "../../../../constants/cefrLevels"
import { LanguageOption, Message } from "../../types"
import Icon from '@mdi/react';
import { mdiHelpCircleOutline, mdiCloseCircleOutline } from '@mdi/js';
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../../@/components/ui/button"
import { FormControl, InputLabel, MenuItem, Select, Switch } from "@mui/material"
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "convex/dist/cjs-types/values/value";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../../../@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../@/components/ui/popover"
import { cn } from "../../../../@/lib/utils";

type TalkSetupOptionsProps = {
  c_id: Id<'conversation'>,
  className?: string,
  selectedLanguageData: LanguageOption | null,
  setSelectedLanguageData: React.Dispatch<React.SetStateAction<LanguageOption | null>>,
  languageOptions: LanguageOption[] | [],
  cefrLevel: string,
  setCefrLevel: React.Dispatch<React.SetStateAction<string>>,
  setMessages: React.Dispatch<React.SetStateAction<Message[] | []>>,
  ttsEnabled: boolean,
  setTtsEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  messages: Message[] | [],
  palVoiceElement: React.RefObject<HTMLAudioElement> | null,
}

export default function TalkSetupOptions ({ 
  c_id,
  className,
  selectedLanguageData, 
  setSelectedLanguageData,  
  languageOptions,
  cefrLevel,
  setCefrLevel,
  setMessages,
  ttsEnabled,
  setTtsEnabled,
  messages,
  palVoiceElement
}: TalkSetupOptionsProps) {

  const { user } = useAuth0();
  const mutateConversation = useMutation(api.mutation.mutateConversation.mutateConversation)
  const cefrTipDialogRef = useRef(null)
  const [cefrToolTipIsOpen, setCefrToolTipIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const [open, setOpen] = useState(false)

  const handleConvoSave = () => {
    if(!user || !user.sub || !selectedLanguageData) return
    const args = {
      messages,
      sub: user.sub,
      selectedLanguageData,
      cefrLevel,
      ttsEnabled 
    } 
    if(c_id) {
      args.id = c_id
    }
    mutateConversation(args)
  }
  
  return (
    <div className={` ${className}`}>

      <div
      className="flex items-center gap-2"
      >
        {
        languageOptions && languageOptions.length > 0 &&
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="w-full border rounded-lg border-stone-300" asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between w-full h-8 text-sm"
            >
              {(selectedLanguageData && selectedLanguageData.voiceName) 
              ? `${selectedLanguageData.languageName} ${selectedLanguageData.countryCode} ${selectedLanguageData.voiceName} ${selectedLanguageData.ssmlGender}` 
              : 'Select a language'
              }
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-50 w-full p-0 border border-stone-300 ">
            <Command className="w-full overflow-y-scroll max-w-max">
              <CommandInput placeholder="Search language voice." />
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup className="w-full overflow-y-scroll h-96">
                <CommandItem 
                className="cursor-pointer"
                onSelect={() => {
                  setSelectedLanguageData(null)
                  setOpen(false)
                }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      !selectedLanguageData ? "opacity-100" : "opacity-0"
                    )}
                  />
                  ...
                </CommandItem>
                
                {languageOptions.map((lang : LanguageOption, index: number) => (
                  <CommandItem
                    className="flex items-center w-full gap-2 hover:cursor-pointer"
                    key={index}
                    onSelect={(currentValue) => {
                      console.log(currentValue);
                      const [ country, languageCode, voiceName, gender ] = currentValue.split(' ')
                      const selectedLanguageData = languageOptions.find(opt => opt.voiceName.toLowerCase() === voiceName)
                      console.log(selectedLanguageData);
                      selectedLanguageData ? setSelectedLanguageData(selectedLanguageData) : setSelectedLanguageData(null)
                      setMessages([])
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedLanguageData?.voiceName === lang.voiceName ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <CountryFlag className="object-contain w-4 h-4 rounded-lg" countryCode={lang.countryCode}/>
                    {lang.languageName} ({lang.countryCode}) {lang.voiceName} ({lang.ssmlGender})
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        }
        
        {
        selectedLanguageData &&
        <CountryFlag className="object-contain w-8 h-8 mr-2 rounded-2xl" countryCode={selectedLanguageData?.countryCode}/>
        }
      </div>
      
      <TalkOptionSetupContainer
      className="!h-8"
      >
        <div className="relative flex items-center h-full ">
          <label className="flex items-center w-24 rounded-lg text-stone-600 whitespace-nowrap "> CEFR Level</label>
          <button className="absolute right-0 -translate-y-1/2 top-1/2 group" onClick={()=> setCefrToolTipIsOpen(true)}>
            <Icon className="" path={mdiHelpCircleOutline} size={0.7} />
          </button>
        </div>
        
        <div className="grid items-center w-full h-full grid-cols-3 gap-2 md:grid-cols-6">
          {
          Object.keys(cefrLevels).map((level) => (
            <button className={`flex items-center border text-black ${level === cefrLevel ? 'border-black text-black ' : 'border-stone-300 text-stone-400'} hover:border-stone-500 justify-center w-full h-full text-sm rounded-lg transition-all`} onClick={()=> {
              if(palVoiceElement && palVoiceElement.current){
              palVoiceElement.current.remove()
              }
              setCefrLevel(level)
              setMessages([])   
            }}>{level}</button>
          ))
          }
        </div>
      </TalkOptionSetupContainer>
      
      <div className="flex items-center gap-4">
        <TalkOptionSetupContainer
        className=""
        >
          <div className="flex items-center">
            <label className="w-24 whitespace-nowrap text-stone-600">AI TTS</label>
          </div>

          <Switch className="" checked={ttsEnabled} onChange={()=> setTtsEnabled(!ttsEnabled)} />
          
        </TalkOptionSetupContainer>
        <TalkOptionSetupContainer
        className="flex justify-end ">
          <div className="relative h-full group">
          
            <Button disabled={selectedLanguageData ? false : true} className={`
            ${selectedLanguageData ? 'bg-primary' : 'bg-stone-400 hover:!pointer-events-none z-10'} 
            relative w-30 text-secondary group h-full `} 

            color={'default'} 
            variant={'default'} 
            size={'default'} 
            onClick={handleConvoSave}>
              <span>Save Conversation</span>
              
            </Button>
            <span className={` ${!selectedLanguageData ? 'group-hover:flex' : 'group-hover:hidden' }
              hidden absolute left-0 border border-red-500 rounded-lg top-full `}>Select a language</span>
          </div>
        </TalkOptionSetupContainer>

      </div>

      {
      cefrToolTipIsOpen &&
      <div className="fixed top-0 left-0 z-20 w-full h-full bg-black bg-opacity-25 backdrop-blur-sm" onClick={()=> setCefrToolTipIsOpen(false)}></div>
      }
      

      <dialog className="fixed p-4 -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2 rounded-2xl border-stone-300" open={cefrToolTipIsOpen} ref={cefrTipDialogRef}>
        <button  className="absolute rounded-full -top-2 -right-2" onClick={()=> setCefrToolTipIsOpen(false)}>
          <Icon className="w-full h-full rounded-full" path={mdiCloseCircleOutline} size={1} />
        </button>
        <div className="flex flex-col max-w-md gap-2 overflow-y-scroll text-sm max-h-80">
          <p className="pt-4 pb-4 text-2xl">
            CEFR Levels
          </p>
          <p>
            A1: The most basic level demonstrates an ability to communicate and exchange simple information. The language learner can utilize and understand familiar common expressions and basic phrases to satisfy their needs. For example, they can introduce themselves and others and have conversations about personal details, such as things they have, people they know and where they live. At this level, the language learner can understand the conversation when the other person speaks slowly and wants to help them.
          </p>
          <p>
            A2: This stage describes a capability to handle simple information and express oneself in familiar contexts. The language learner can frequently comprehend used expressions and sentences related to personal information, such as employment, family, local geography, and shopping.
          </p>
          <p>
            B1: The independent level illustrates a limited ability to express oneself in familiar situations and generally deal with unfamiliar ones. The language learner can understand the primary points of information regarding leisure, work, and school. They can also provide brief explanations for their plans and opinions and express their ambitions, future events, hopes, and dreams. They'll most likely feel comfortable communicating in an area where the target language is commonly spoken.
          </p>
          <p>
            B2: This stage demonstrates a capacity to fulfill most goals and express oneself in various topics. The language learner can comprehend a complex text's primary ideas on abstract and concrete issues, such as technical discussions in their career field. They can interact with native speakers with fluidity and spontaneity to prevent strain for either speaker.
          </p>
          <p>
            C1: This proficiency level describes an ability to communicate appropriately, sensitively, and capably while addressing unfamiliar topics. The language learner can recognize a wide range of longer, more demanding texts and understand their implicit meaning. They can typically express themselves without much need to pause and search for the correct expression. They can use this language for professional, social, and academic purposes, demonstrating a controlled use of organizational patterns and cohesive devices.
          </p>
          <p>
            C2: This mastery level illustrates the capacity to deal with academic or cognitively demanding material and use language effectively at a level of performance that's usually more advanced than that of an average native speaker. The language learner can easily understand almost everything they hear or read. They can summarize information from various sources and create new arguments and stories coherently in many advanced situations.
          </p>
        </div>
        
      </dialog>

    </div>
  )
}