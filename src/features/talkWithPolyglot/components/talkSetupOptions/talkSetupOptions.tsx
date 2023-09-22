import CountryFlag from "../../../../components/countryFlag/countryFlag"
import TalkOptionSetupContainer from "../../../../components/talkSetupOptionContainer/talkSetupOptionContainer"
import { cefrLevels } from "../../../../constants/cefrLevels"
import { LanguageOption, Message } from "../../types"
import Icon from '@mdi/react';
import { mdiHelpCircleOutline, mdiCloseCircleOutline } from '@mdi/js';
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../../@/components/ui/button"
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "convex/dist/cjs-types/values/value";

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

      <TalkOptionSetupContainer
      >
        <label className="flex items-center w-40 border-stone-300 text-stone-600 whitespace-nowrap">Language & Voice</label>
        <select className="w-full h-full p-1 border rounded-lg outline-none border-stone-300 text-stone-600" 
        value={(selectedLanguageData && selectedLanguageData.voiceName) ?  selectedLanguageData.voiceName : ''} 
        onChange={(e)=> {
          const selectedVoiceName = e.target.value
          const selectedLanguageData = languageOptions.find(opt => opt.voiceName === selectedVoiceName)
          selectedLanguageData ? setSelectedLanguageData(selectedLanguageData) : setSelectedLanguageData(null)
          setMessages([])
        }}>
          <option value="">...</option>
          {
          languageOptions.map((opt : LanguageOption , index) => (
          <option className="text-sm md:text-sm" value={opt.voiceName} key={index}>
            {opt.languageName} ({opt.countryCode}) {opt.voiceName} ({opt.ssmlGender})
          </option>
          ))
          }
        </select>
        {
        selectedLanguageData &&
        <CountryFlag className="object-contain w-8 h-8 mr-2 rounded-2xl" countryCode={selectedLanguageData?.countryCode}/>
        }
      </TalkOptionSetupContainer>
      
      <TalkOptionSetupContainer
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
            <button className={`flex items-center border text-black ${level === cefrLevel ? 'border-emerald-300 text-emerald-500 ' : 'border-stone-300 text-stone-400'} justify-center w-full h-full text-sm rounded-lg`} onClick={()=> {
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
            <label className="w-24 whitespace-nowrap text-stone-600"> Enable TTS</label>
          </div>
          <div className="grid items-center w-full h-full grid-cols-2 gap-2 text-sm">
            <button className={`border w-full h-full rounded-lg flex items-center justify-center  ${ttsEnabled ? 'border-emerald-400 text-emerald-500' : 'border-stone-300 text-stone-400'}`}
            onClick={()=> setTtsEnabled(true)}>Enabled</button>
            <button className={`w-full h-full border rounded-lg  flex items-center justify-center ${!ttsEnabled ? 'border-emerald-400 text-emerald-500' : 'border-stone-300 text-stone-400'}`} 
            onClick={()=> setTtsEnabled(false)}>Disabled</button>
          </div>
        </TalkOptionSetupContainer>
        <TalkOptionSetupContainer
        className="flex justify-end">
          <Button className={`${selectedLanguageData ? 'bg-primary' : 'bg-stone-300'} w-30 text-secondary`} color={'default'} variant={'default'} size={'default'} onClick={handleConvoSave}>Save Conversation / Settings</Button>
        </TalkOptionSetupContainer>

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