import CountryFlag from "../../../../components/countryFlag/countryFlag"
import TalkOptionSetupContainer from "../../../../components/talkSetupOptionContainer/talkSetupOptionContainer"
import { cefrLevels } from "../../../../constants/cefrLevels"
import { LanguageOption, Message } from "../../types"

type TalkSetupOptionsProps = {
  className?: string,
  selectedLanguageData: LanguageOption | null,
  setSelectedLanguageData: React.Dispatch<React.SetStateAction<LanguageOption | null>>,
  languageOptions: LanguageOption[] | [],
  cefrLevel: string,
  setCefrLevel: React.Dispatch<React.SetStateAction<string>>,
  setMessages: React.Dispatch<React.SetStateAction<Message[] | []>>,
  setVoiceEnabled: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function TalkSetupOptions ({ 
  className,
  selectedLanguageData, 
  setSelectedLanguageData,  
  languageOptions,
  cefrLevel,
  setCefrLevel,
  setMessages,
  setVoiceEnabled
}: TalkSetupOptionsProps) {
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
          languageOptions.map((opt, index) => (
          <option className="text-sm md:text-lg" value={opt.voiceName} key={index}>
            {opt.languageName} ({opt.countryCode}) {opt.voiceName} ({opt.ssmlGender})
          </option>
          ))
          }
        </select>
        {
        selectedLanguageData &&
        <CountryFlag className="object-contain w-10 h-10" countryCode={selectedLanguageData?.countryCode}/>
        }
      </TalkOptionSetupContainer>
      
      <TalkOptionSetupContainer>
        <label className="flex items-center w-40 p-2 "> CEFR Level</label>
        <div className="grid items-center w-full gap-2 md:grid-cols-6">
          {
          Object.keys(cefrLevels).map((level) => (
            <button className={`flex items-center ${level === cefrLevel ? 'bg-black text-white' : 'bg-stone-300 text-stone-600'} justify-center w-full h-full p-2  rounded-2xl`} onClick={()=> {
              setCefrLevel(level)
              setMessages([])   
            }}>{level}</button>
          ))
          }
        </div>
      </TalkOptionSetupContainer>
      
      <TalkOptionSetupContainer
      className="w-1/2">
        <label className="p-2 whitespace-nowrap"> Enable TTS</label>
        <div className="flex items-center w-full h-full gap-2">
          <button className="w-full h-full rounded-2xl bg-stone-300">Enabled</button>
          <button className="w-full">Disabled</button>
        </div>
      </TalkOptionSetupContainer>

    </div>
  )
}