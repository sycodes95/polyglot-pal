import { useAllConversations } from "../api/conversation/getAllConversations"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CountryFlag from "@/components/countryFlag/countryFlag";
import { useDeleteConversation } from "../api/conversation/deleteConversation";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LineWave, Discuss } from "react-loader-spinner";

export const ConversationList = () => {

  const { conversationId } = useParams();

  const { isFetching, isError, data } = useAllConversations();

  const [ selectedConversationId, setSelectedConversationId ] = useState<number | null>(null);

  const [ selectedEditCId, setSelectedEditCId ] = useState<number | null>(null);

  const deleteConversation = useDeleteConversation(selectedConversationId);

  useEffect(() => {
    const handleClick = (e: Event) => {
      if(e)
      setSelectedEditCId(null);
    }

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  },[]);

  return (
    <div className=' h-full overflow-y-auto overflow-x-hidden relative flex flex-col'>
      <div className='absolute top-0 h-full w-full grow p-2'>
        <div className="flex flex-col h-full w-full">
          {
            !isFetching && !isError && data ?
            data.map((conversation) => (

              <div className="relative text-sm group w-full hover:bg-white/5 text-yellow-100 flex gap-1 h-fit rounded-md">
                <Link className={`${(selectedConversationId === conversation.id) || (Number(conversationId) === conversation.id) && "bg-white/5"} relative text-sm group p-2 w-full hover:bg-white/5 text-yellow-100 flex gap-1 h-fit rounded-md`} to={`/c/${conversation.id}`} 
                key={conversation.id} 
                onClick={()=> setSelectedConversationId(conversation.id)}>
                  <div className="h-full flex items-center">
                    <CountryFlag className="h-4 w-4 object-contain" countryCode={conversation.languageData?.countryCode.toUpperCase() ?? ""}/>
                  </div>
                  <span>{conversation.languageData?.languageName}</span>
                  <span>{conversation.settings?.cefrLevel}</span>
                  <span className="whitespace-nowrap">{conversation.languageData?.voiceName.split("-")[2]}</span>
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">{conversation.languageData?.ssmlGender}</span>
                </Link>

                <Popover>
                  <PopoverTrigger className={` ${selectedConversationId === conversation.id ? "flex" : "hidden"}  items-center justify-center absolute top-0 right-0 h-full rounded-r-md text-xl p-1 hover:text-white overflow-hidden backdrop-blur-sm z-10`} onClick={()=> setSelectedEditCId(conversation.id)}
                  >
                    <DeleteForeverIcon fontSize="inherit" />
                    <div className="w-[1px] h-[1px] glow-box absolute top-1/2 -translate-y-1/2 right-0"></div>
                  </PopoverTrigger>
                  <PopoverContent>Place content for the popover here.</PopoverContent>
                </Popover>
              </div>
            ))
            :
            <div className="relative text-sm group w-full hover:bg-white/5 text-yellow-100 flex flex-col items-center gap-1 h-full justify-center rounded-md">
              <Discuss colors={["dark-yellow", "white"]} height={50} width={50}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
