import { useQuery } from "react-query"
import { useAllConversations } from "../api/conversation/getAllConversations"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { config } from "../../../config";

export const ConversationList = () => {

  const { isFetching, isError, data } = useAllConversations();
  
  return (
    <div className="flex flex-col">
      {
        !isFetching && !isError && data ?
        data.map((conversation) => (
          <Link className="text-sm p-4 border-b border-l hover:bg-white/5 text-white flex gap-2" to={`/c/${conversation.id}`} key={conversation.id}>
            <span>{conversation.languageData?.languageName}</span>
            <span>{conversation.languageData?.languageCode}</span>
          </Link>
        ))
        :
        <span className="text-white text-sm">No conversations available</span>
      }
    </div>
  )
}
