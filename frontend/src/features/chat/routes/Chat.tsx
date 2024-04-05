import { Conversation } from './Conversation';
import { ConversationList } from "../components/ConversationList";
import { useEffect } from "react";
import { getAllConversations } from "../api/conversation/getAllConversations";
import { Sidebar } from "../components/Sidebar";
import { Link } from 'react-router-dom';
import { NativeLanguageSelect } from '../components/NativeLanguageSelect';

export const Chat = () => {

  useEffect(() => {
    getAllConversations()
  },[])
  return (
    <>
      <div className="flex gap-4 w-full h-full p-8">
        <Sidebar className='w-64 flex flex-col gap-4'>
          <Link className='whitespace-nowrap flex justify-center w-full hover:bg-white/5 transition-colors text-sm pr-4 pl-4 p-2 rounded-md border border-white text-white' to={"/"} >+ New Conversation</Link>
          <NativeLanguageSelect />
          <ConversationList />
        </Sidebar>
        <Conversation />
      </div>
    </>
  );
};