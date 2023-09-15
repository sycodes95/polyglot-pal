import { ThreeDots } from "react-loader-spinner"
import { Message } from "../../types"
import { useEffect, useRef } from "react";


type TalkMessagesProps = {
  className?: string,
  messages: Message[],
  messageIsLoading: boolean
}

export default function TalkMessages ({className, messages, messageIsLoading} : TalkMessagesProps) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={`${className} flex flex-grow flex-col h-1 w-full gap-4 overflow-y-auto rounded-2xl
      p-2`} >
        {
        messages.map((msg, index) => {
          if(index !== 0){
            return ( 
            <div className={`
            flex w-full
            ${msg.role === 'user' ? 'justify-start' : 'justify-end'}
            `}
            key={index}>
              <div className={`${msg.role === 'user' ? 'bg-stone-300' : 'bg-orange-200'} p-4 rounded-2xl max-w-66pct`}>
                {
                msg.role === 'user' 
                ?
                <span>You : </span>
                :
                <span>Pal : </span>
                }
                <span className="text-sm">{msg.content}</span>
              </div>
            </div>
            )
          }
        })
        }
        {
        messageIsLoading &&
        <div className="flex justify-end w-full">
          <ThreeDots
          height="40" 
          width="40" 
          radius="9"
          color="#000000" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
          />
        </div>
        }
        <div className="hidden" ref={messagesEndRef}></div>
    </div>
  )
}