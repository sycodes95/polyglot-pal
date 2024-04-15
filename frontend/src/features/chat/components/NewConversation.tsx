import { useNavigate } from "react-router-dom"
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
export const NewConversation = () => {

  const navigate = useNavigate();
  return (
    <button className='whitespace-nowrap flex w-full  hover:bg-white/10 transition-colors text-sm font-semibold p-1 text-yellow-100 justify-between rounded-md items-center gap-2' onClick={()=> navigate("/")} >
      <div className="flex gap-2 items-center">
        <div className="w-6 h-6 rounded-full object-contain flex items-center justify-center bg-white">
          <VoiceChatIcon className="text-black" fontSize="inherit" />
        </div>
        <span>New Conversation</span>
      </div>
      
      <OpenInNewIcon className="text-yellow-100" fontSize="inherit"/>
    </button>
  )
}