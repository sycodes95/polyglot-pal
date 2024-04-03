import { useParams } from "react-router-dom"
import { Conversation } from './Conversation';
import { ConversationList } from "../components/ConversationList";

export const Chat = () => {


  return (
    <>
      <div className="flex gap-4 w-full h-full">
        <ConversationList />
        <Conversation />
      </div>
    </>
  );
};