import { Conversation } from '../components/Conversation';
import { ConversationList } from "../components/ConversationList";
import { Sidebar } from "../components/Sidebar";
import { NativeLanguageSelect } from '../components/NativeLanguageSelect';

import { NewConversation } from '../components/NewConversation';

export const Chat = () => {
  return (
    <>
      <div className="flex w-full relative grow">
        
        <Sidebar className='w-72 flex flex-col h-full overflow-y-auto bg-black/30 border-r border-border/20 grow relative'>
          <div className='sticky top-0 flex flex-col gap-4  p-4'>
            <NewConversation />
            <NativeLanguageSelect />
          </div>
          <ConversationList />
        </Sidebar>

        <Conversation />
      </div>
    </>
  );
};