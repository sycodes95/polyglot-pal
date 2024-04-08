import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryConversation } from "../api/conversation/getConversationById";
import { useCreateConversation } from "../api/conversation/createConversation";
import { LanguageDataSelect } from "./LanguageDataSelect";
// const defaultConversationData = {
//   id: uuidv4(),
//   messages: [],
//   languageData: null,
//   settings: {
//     id: uuidv4(),
//     cefrLevel: "C2",
//     ttsEnabled
//   },
// };

export const Conversation = () => {
  const param = useParams();
  const [convoIsSaved, setConvoIsSaved] = useState(false);
  // const [conversationData, setConversationData] = useState<ConversationDto>(defaultConversationData);

  const queryConversation = useQueryConversation(Number(param["conversationId"]));
  
  const createMutateConversation = useCreateConversation();

  useEffect(()=> {
    if(param["conversationId"]) {
      setConvoIsSaved(true);
    };
  },[param])

  
  
  return (
    <div className="border w-full h-full grow flex flex-col gap-4">
      <LanguageDataSelect 
      convoIsSaved={convoIsSaved} 
      createMutationConversation={createMutateConversation} 
      />
      
    </div>
  );
};