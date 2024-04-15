import { Conversation } from '../components/Conversation';
import { ConversationList } from "../components/ConversationList";
import { useEffect } from "react";
import { getAllConversations, useAllConversations } from "../api/conversation/getAllConversations";
import { Sidebar } from "../components/Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { NativeLanguageSelect } from '../components/NativeLanguageSelect';
import { useQueryClient } from 'react-query';

import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import { NewConversation } from '../components/NewConversation';

export const Chat = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-full   ">
        <Sidebar className='w-72 flex flex-col h-full overflow-y-auto p-4 gap-4 bg-black/30 border-r border-border/20 grow'>
          <NewConversation />
          <NativeLanguageSelect />
          <ConversationList />
        </Sidebar>
        <Conversation />
      </div>
    </>
  );
};