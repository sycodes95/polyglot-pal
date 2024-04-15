import { useAllConversations } from "../api/conversation/getAllConversations"
import { Link } from "react-router-dom";
import { useEffect } from "react";

import CountryFlag from "@/components/countryFlag/countryFlag";

export const ConversationList = () => {

  const { isFetching, isError, data } = useAllConversations();
  useEffect(() => {
    console.log(data)
  },[data])
  return (
    <div className="flex flex-col">
      {
        !isFetching && !isError && data ?
        data.map((conversation) => (
          <Link className="text-xs p-2 hover:bg-white/5 text-white flex gap-2 h-fit rounded-md" to={`/c/${conversation.id}`} key={conversation.id}>
            {/* <span>{format(new Date(conversation.createdAt), "MM/dd/yyyy")}</span> */}
            <CountryFlag className="h-4 w-4 object-contain" countryCode={conversation.languageData?.countryCode.toUpperCase() ?? ""}/>
            <span>{conversation.languageData?.languageName}</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">{conversation.languageData?.voiceName}aaaaaaaaaaaa</span>
          </Link>
        ))
        :
        <span className="text-white text-sm">No conversations available</span>
      }
    </div>
  )
}
