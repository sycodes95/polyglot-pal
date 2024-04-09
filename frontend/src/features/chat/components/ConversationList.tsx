import { useQuery } from "react-query"
import { useAllConversations } from "../api/conversation/getAllConversations"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { config } from "../../../config";

export const ConversationList = () => {

  const { isFetching, isError, data } = useAllConversations();
  
  return (
    <div className="flex flex-col gap-4">
      {
        !isFetching && !isError && data ?
        data.map((conversation) => (
          <Link className="text-sm p-4 border border-border rounded-md text-white" to={`/c/${conversation.id}`} key={conversation.id}>
            <span>{conversation.id}</span>
            <span>{conversation.languageData?.languageCode}</span>
          </Link>
        ))
        :
        <span className="text-white text-sm">No conversations available</span>
      }
    </div>
  )
}
