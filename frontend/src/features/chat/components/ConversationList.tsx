import { useAllConversations } from "../api/conversation/getAllConversations"
import { Link } from "react-router-dom";
import { useEffect } from "react";

import CountryFlag from "@/components/countryFlag/countryFlag";

export const ConversationList = () => {

  const { isFetching, isError, data } = useAllConversations();
  
  return (
    <div className="flex flex-col overflow-y-auto">
      {
        !isFetching && !isError && data ?
        data.map((conversation) => (
          <Link className="text-sm  p-2 hover:bg-white/5 text-yellow-100 flex gap-1 h-fit rounded-md" to={`/c/${conversation.id}`} key={conversation.id}>
            {/* <span>{format(new Date(conversation.createdAt), "MM/dd/yyyy")}</span> */}
            <div className="h-full flex items-center">
              <CountryFlag className="h-4 w-4 object-contain" countryCode={conversation.languageData?.countryCode.toUpperCase() ?? ""}/>
            </div>
            <span>{conversation.languageData?.languageName}</span>
            <span>{conversation.settings?.cefrLevel}</span>

            <span className="whitespace-nowrap">{conversation.languageData?.voiceName.split("-")[2]}</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">{conversation.languageData?.ssmlGender}</span>

          </Link>
        ))
        :
        <span className="text-yellow-100 text-sm">No conversations available</span>
      }
    </div>
  )
}
