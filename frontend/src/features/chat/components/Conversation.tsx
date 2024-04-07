import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ConversationDto } from "../types/types";
import { useQueryConversation } from "../api/conversation/getConversationById";
import { useCreateConversation } from "../api/conversation/createConversation";
import { nanoid } from 'nanoid'
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
  const [isSaved, setIsSaved] = useState(false);
  // const [conversationData, setConversationData] = useState<ConversationDto>(defaultConversationData);

  const queryConversation = useQueryConversation(Number(param["conversationId"]));
  
  const createMutateConversation = useCreateConversation();

  useEffect(()=> {
    if(param["conversationId"]) {
      setIsSaved(true);
    }
  },[param])

  // useEffect(() => {
  //   if(queryConversation.isSuccess && queryConversation.data) {
  //     setConversationData(queryConversation.data);
  //   }
  // },[queryConversation.isSuccess]);

  // useEffect(() => {
  //   if(
  //     createMutateConversation.isSuccess &&
  //     !createMutateConversation.isLoading
  //   ) {
  //     setConversationData(createMutateConversation.data);
  //   }
  // },[createMutateConversation.isSuccess]);
  
  return (
    <div className="border w-full h-full grow flex flex-col gap-4">
      <LanguageDataSelect />
      
    </div>
  );
};