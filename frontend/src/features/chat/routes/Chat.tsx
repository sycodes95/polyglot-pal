import { Conversation } from '../components/Conversation';
import { ConversationList } from "../components/ConversationList";
import { useEffect } from "react";
import { getAllConversations, useAllConversations } from "../api/conversation/getAllConversations";
import { Sidebar } from "../components/Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { NativeLanguageSelect } from '../components/NativeLanguageSelect';

export const Chat = () => {
  const navigate = useNavigate();
  useEffect(() => {
  },[])
  return (
    <>
      <div className="flex gap-4 w-full  p-8 ">
        <Sidebar className='w-64 flex flex-col gap-4 h-full overflow-y-auto'>
          <button className='whitespace-nowrap flex justify-center w-full hover:bg-white/5 transition-colors text-sm pr-4 pl-4 p-2 rounded-md border border-white text-white' onClick={()=> navigate('/')} >+ New Conversation</button>
          <NativeLanguageSelect />
          <ConversationList />
        </Sidebar>
        <Conversation />
      </div>
    </>
  );
};