import { mdiSendOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Oval } from 'react-loader-spinner';
type TalkMessageInputProps = {
  messageIsLoading: boolean,
  input: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  handleMessageSend: () => void
}

export default function TalkMessageInput ({messageIsLoading, input, setInput, handleMessageSend} : TalkMessageInputProps) {
  return (
    <div className="sticky bottom-0 w-full h-24 max-w-5xl backdrop-blur-lg" >
      <form className="flex items-center w-full gap-2" onSubmit={(e)=> {
        e.preventDefault()
        handleMessageSend()
        
      }}>
        <div className="flex items-center w-full border-2 border-stone-700 rounded-2xl">
          <input className="w-full h-12 outline-none rounded-2xl" type="text" value={input} onChange={(e)=> setInput(e.target.value)}/>
                
          <button className="flex items-center justify-center w-12 h-12" type="submit" >
            {
            messageIsLoading ? 
            <Oval
              height={25}
              width={25}
              color="#000000"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#4fa94d"
              strokeWidth={4}
              strokeWidthSecondary={4}

            />
            :
            <Icon path={mdiSendOutline} size={1} />
            }
            
          </button>
        </div>
      </form>
    </div>
  )
}