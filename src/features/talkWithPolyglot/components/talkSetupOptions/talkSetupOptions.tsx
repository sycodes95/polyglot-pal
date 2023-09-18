import CountryFlag from "../../../../components/countryFlag/countryFlag"
import TalkOptionSetupContainer from "../../../../components/talkSetupOptionContainer/talkSetupOptionContainer"
import { cefrLevels } from "../../../../constants/cefrLevels"
import { LanguageOption, Message } from "../../types"
import Icon from '@mdi/react';
import { mdiHelpCircleOutline, mdiCloseCircleOutline } from '@mdi/js';
import { useEffect, useRef, useState } from "react";

type TalkSetupOptionsProps = {
  className?: string,
  selectedLanguageData: LanguageOption | null,
  setSelectedLanguageData: React.Dispatch<React.SetStateAction<LanguageOption | null>>,
  languageOptions: LanguageOption[] | [],
  cefrLevel: string,
  setCefrLevel: React.Dispatch<React.SetStateAction<string>>,
  setMessages: React.Dispatch<React.SetStateAction<Message[] | []>>,
  ttsEnabled: boolean,
  setTtsEnabled: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function TalkSetupOptions ({ 
  className,
  selectedLanguageData, 
  setSelectedLanguageData,  
  languageOptions,
  cefrLevel,
  setCefrLevel,
  setMessages,
  ttsEnabled,
  setTtsEnabled
}: TalkSetupOptionsProps) {
  const cefrTipDialogRef = useRef(null)
  const [cefrToolTipIsOpen, setCefrToolTipIsOpen] = useState(false)
  
  return (
    <div className={` ${className}`}>

      <TalkOptionSetupContainer>
        <label className="flex items-center w-40 p-2 border-stone-300 whitespace-nowrap">Language & Voice</label>
        <select className="w-full h-full outline-none text-stone-600 rounded-2xl" value={selectedLanguageData?.voiceName} onChange={(e)=> {
          const selectedVoiceName = e.target.value
          const selectedLanguageData = languageOptions.find(opt => opt.voiceName === selectedVoiceName)
          selectedLanguageData ? setSelectedLanguageData(selectedLanguageData) : setSelectedLanguageData(null)
          setMessages([])
        }}>
          <option value=""></option>
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
      
      <TalkOptionSetupContainer>
        <div className="relative flex items-center h-full">
          <label className="flex p-2 w-28 whitespace-nowrap"> CEFR Level</label>
          <button className="absolute right-0 -translate-y-1/2 top-1/2 group" onClick={()=> setCefrToolTipIsOpen(true)}>
            <Icon className="" path={mdiHelpCircleOutline} size={0.7} />
          </button>
        </div>
        
        <div className="grid items-center w-full grid-cols-3 gap-1 md:grid-cols-6">
          {
          Object.keys(cefrLevels).map((level) => (
            <button className={`flex items-center ${level === cefrLevel ? 'bg-black text-white' : 'bg-stone-300 text-stone-600'} justify-center w-full h-10 p-2  rounded-2xl`} onClick={()=> {
              setCefrLevel(level)
              setMessages([])   
            }}>{level}</button>
          ))
          }
        </div>
      </TalkOptionSetupContainer>
      
      <TalkOptionSetupContainer
      className="w-full md:w-1/2">
        <div className="flex items-center">
          <label className="p-2 w-28 whitespace-nowrap"> Enable TTS</label>
        </div>
        <div className="grid items-center w-full h-full grid-cols-2 gap-2">
          <button className={`w-full h-full p-2 rounded-2xl flex items-center justify-center  ${ttsEnabled ? 'bg-black text-white' : 'bg-stone-300 text-black'}`}
          onClick={()=> setTtsEnabled(true)}>Enabled</button>
          <button className={`w-full h-full p-2 rounded-2xl flex items-center justify-center ${!ttsEnabled ? 'bg-black text-white' : 'bg-stone-300 text-black'}`} 
          onClick={()=> setTtsEnabled(false)}>Disabled</button>
        </div>
      </TalkOptionSetupContainer>
      {
      cefrToolTipIsOpen &&
      <div className="fixed top-0 left-0 z-20 w-full h-full bg-black bg-opacity-25 backdrop-blur-sm" onClick={()=> setCefrToolTipIsOpen(false)}></div>
      }
      

      <dialog className="fixed z-50 p-4 -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2 rounded-2xl border-stone-300" open={cefrToolTipIsOpen} ref={cefrTipDialogRef}>
        <button  className="absolute rounded-full -top-2 -right-2" onClick={()=> setCefrToolTipIsOpen(false)}>
          <Icon className="w-full h-full rounded-full" path={mdiCloseCircleOutline} size={1} />
        </button>
        <div className="flex flex-col max-w-md gap-2 overflow-y-scroll text-sm max-h-80">
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