import { useQuery } from "react-query"
import { getAllConversations } from "../api/conversation/getAllConversations"

export const ConversationList = () => {

  const { isFetching, isError, data } = useQuery({
    queryKey: ["allconversations"],
    queryFn: getAllConversations
  });

  return (
    <div className="flex flex-col gap-4">
      {
        !isFetching && !isError && data &&
        data.map((conversation) => (
          <div className="text-sm" key={conversation.id}>
            <span>{conversation.id}</span>
            <span>{conversation.languageData?.languageCode}</span>
          </div>
        ))
      }
    </div>
  )
}
