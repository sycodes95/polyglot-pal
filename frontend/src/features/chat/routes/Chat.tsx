import { Conversation } from '../components/Conversation';
import { ConversationList } from "../components/ConversationList";
import { useEffect } from "react";
import { getAllConversations, useAllConversations } from "../api/conversation/getAllConversations";
import { Sidebar } from "../components/Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { NativeLanguageSelect } from '../components/NativeLanguageSelect';
import { useQueryClient } from 'react-query';

export const Chat = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const handleNewConversation = () => {
    navigate("/");
  };
  useEffect(() => {
  },[])
  return (
    <>
      <div className="flex w-full  ">
        <Sidebar className='w-64 flex flex-col h-full overflow-y-auto'>
          <button className='whitespace-nowrap flex justify-center w-full bg-border hover:bg-white/5 transition-colors text-sm pr-4 pl-4 p-2 border text-white' onClick={()=> handleNewConversation()} >+ New Conversation</button>
          <NativeLanguageSelect />
          <ConversationList />
        </Sidebar>
        <Conversation />
      </div>
    </>
  );
};