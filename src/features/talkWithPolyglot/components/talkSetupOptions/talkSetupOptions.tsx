import CountryFlag from "../../../../components/countryFlag/countryFlag"
import { cefrLevels } from "../../../../constants/cefrLevels"
import { LanguageOption, Message } from "../../types"
import Icon from '@mdi/react';
import {  mdiCloseCircleOutline } from '@mdi/js';
import {  useRef, useState } from "react";
import { Button } from "../../../../components/ui/button"
import { Switch } from "@mui/material"
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "convex/dist/cjs-types/values/value";
import { Check, ChevronsUpDown } from "lucide-react"
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

import { cn } from "../../../../lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { PalVoiceElementData } from "../../../../pages/talkWithPolyglot";

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
  palVoiceElement: PalVoiceElementData,
  setPalVoiceElement: React.Dispatch<React.SetStateAction<PalVoiceElementData>>
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
  palVoiceElement,
  setPalVoiceElement
}: TalkSetupOptionsProps) {

  const { user } = useAuth0();
  const mutateConversation = useMutation(api.mutation.mutateConversation.mutateConversation)
  const cefrTipDialogRef = useRef(null)
  const [cefrToolTipIsOpen, setCefrToolTipIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [languageOptionsIsOpen, setLanguageOptionsIsOpen] = useState(false)

  const handleConvoSave = async () => {
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
    const convoId = await mutateConversation(args);
    const updatedURL = `/c/${convoId}`
    if((location.state !== updatedURL) && convoId){
      navigate(`/c/${convoId}`)
    }
    
  }
  
  return (
    <div className={` ${className} bg-background`}>

      <div
      className="flex items-center gap-2 "
      >
        {
        <Popover open={languageOptionsIsOpen} onOpenChange={setLanguageOptionsIsOpen}>
          <PopoverTrigger className="w-full border rounded-lg border-border hover:bg-foreground text-primary bg-background" asChild>
            <Button
            variant={'default'}
              aria-expanded={languageOptionsIsOpen}
              className="justify-between w-full h-8 overflow-hidden text-sm text-primary whitespace-nowrap text-ellipsis "
            >
              {(selectedLanguageData && selectedLanguageData.voiceName) 
              ? `${selectedLanguageData.languageName} ${selectedLanguageData.countryCode} ${selectedLanguageData.voiceName} ${selectedLanguageData.ssmlGender}` 
              : 'Select a language'
              }
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-50 w-full p-0 border border-border ">
            <Command className="w-full max-w-max border-border ">
              <CommandInput  className='' placeholder="Search language voice." />
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup className="w-64 overflow-auto md:w-full h-96 ">
                <CommandItem 
                className="cursor-pointer"
                onSelect={() => {
                  setSelectedLanguageData(null)
                  setLanguageOptionsIsOpen(false)
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
                    className="flex items-start w-full gap-2 text-primary hover:cursor-pointer "
                    key={index}
                    onSelect={(currentValue) => {
                      const values = currentValue.split(' ')
                      const voiceName = values[2]
                      const selectedLanguageData = languageOptions.find(opt => opt.voiceName.toLowerCase() === voiceName)
                      selectedLanguageData ? setSelectedLanguageData(selectedLanguageData) : setSelectedLanguageData(null)
                      setMessages([])
                      setLanguageOptionsIsOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedLanguageData?.voiceName === lang.voiceName ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <CountryFlag className="object-contain w-4 h-4 mt-0.5 rounded-lg" countryCode={lang.countryCode}/>
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
      
      <div
      className="flex items-center justify-between w-full h-8 gap-2"
      >
        <div className="flex items-center h-full gap-2">
          <Popover>
            <PopoverTrigger className="flex items-center pl-2 pr-2 text-sm transition-all border rounded-lg whitespace-nowrap border-border text-primary hover:bg-foreground">
              <span className="flex items-center h-8 pl-2">CEFR</span>
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </PopoverTrigger>
            
            <PopoverContent className="grid w-full grid-cols-3 gap-2 ">
              {
              Object.keys(cefrLevels).map((level) => (
                <button className={`flex items-center border text-black ${level === cefrLevel ? 'bg-black text-white ' : 'border-stone-300 text-stone-400'} hover:bg-accent justify-center w-12 h-12 text-sm rounded-full transition-all`} onClick={()=> {
                  if(palVoiceElement.element){
                  palVoiceElement?.element.remove()
                  }
                  setCefrLevel(level)
                  setMessages([])   
                }}
                key={level}>{level}</button>
              ))
              }

            </PopoverContent>
            {/* <button className="" onClick={()=> setCefrToolTipIsOpen(true)}>
              <Icon className="" path={mdiHelpCircleOutline} size={0.7} />
            </button> */}
          </Popover>

          <Popover>
            <PopoverTrigger className="flex items-center pl-2 pr-2 transition-all border rounded-lg whitespace-nowrap hover:bg-foreground text-primary border-border">
              <span className="flex items-center h-8 pl-2">TTS</span>
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </PopoverTrigger>
            
            <PopoverContent className="w-full h-full bg-foreground">
              <Switch className="" checked={ttsEnabled} onChange={()=> setTtsEnabled(!ttsEnabled)} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="relative h-full group">
          
          <Button disabled={selectedLanguageData ? false : true} className={`
          ${selectedLanguageData ? 'bg-primary' : 'bg-stone-400 hover:!pointer-events-none z-10'} 
          relative w-30 text-secondary dark:text-background group h-8 `} 
          color={'default'} 
          variant={'default'} 
          size={'default'} 
          onClick={handleConvoSave}>
            <span>Save</span>
            
          </Button>
          
          <span className={` ${!selectedLanguageData ? 'group-hover:flex group-hover:opacity-100' : 'group-hover:hidden' }
            hidden absolute mt-2 opacity-0 right-0 border border-border rounded-lg top-full transition-all text-primary p-4 whitespace-nowrap`}>Please select a language</span>
        </div>
        
      </div>

      {
      cefrToolTipIsOpen &&
      <div className="fixed top-0 left-0 z-20 w-full h-full bg-black bg-opacity-25 backdrop-blur-sm" onClick={()=> setCefrToolTipIsOpen(false)}></div>
      }

      <dialog className="fixed z-50 p-4 -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2 rounded-2xl border-stone-300" open={cefrToolTipIsOpen} ref={cefrTipDialogRef}>
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