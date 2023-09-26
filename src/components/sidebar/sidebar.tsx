import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { languageNameAndCodes } from "../../constants/languageNameAndCodes"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api";
import { useAuth0 } from "@auth0/auth0-react";
import { Id } from "convex/dist/cjs-types/values/value";
import CountryFlag from "../countryFlag/countryFlag";
import { format } from "date-fns";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../@/components/ui/button"
import Icon from '@mdi/react';
import { mdiMessage, mdiTrashCan } from '@mdi/js';


import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../@/components/ui/popover"

type SidebarProps = {
  className?: string,
  resetState: ()=> void
}


export default function Sidebar ({
  className,
  resetState
} : SidebarProps) {
  const { user } = useAuth0();

  const navigate = useNavigate()

  const location = useLocation();

  const { c_id } = useParams();

  const getAllConversations = useQuery(api.query.getAllConversations.getAllConversations, { sub: (user && user.sub) ? user.sub : ''})

  const nativeLanguage = useQuery(api.query.getNativeLanguage.getNativeLanguage, { sub: user && user.sub ? user.sub : '' })

  const mutateNativeLanguage = useMutation(api.mutation.mutateNativeLanguage.mutateNativeLanguage)

  const deleteConversation = useMutation(api.mutation.deleteConversation.deleteConversation)

  const nativeLanguageExists = nativeLanguage && nativeLanguage[0] && nativeLanguage[0]._id

  const [userNativeLanguage, setUserNativeLanguage] = useState({
    languageName: '',
    languageCode: ''
  })

  const [currentConversationId, setCurrentConversationId] = useState<Id<'conversation'> | null>(null)

  const [deleteConvoPopoverIsOpen, setDeleteConvoPopoverIsOpen] = useState(false)

  const handleUserNativeLanguage = (languageName: string) => {
    const languageCode = languageNameAndCodes.find(langObj => langObj.languageName === languageName)?.languageCode
    if(!languageCode || !user || user && !user.sub) return

    const args: {
      id?: Id<"nativeLanguage">,
      sub:string,
      languageName: string,
      languageCode: string
    } = {
      sub: user && user.sub ? user.sub : '', 
      languageName, 
      languageCode 
    }

    if(nativeLanguage && nativeLanguage[0] && nativeLanguage[0]._id) args.id = nativeLanguage[0]._id
    
    if(nativeLanguage) mutateNativeLanguage(args)
    setUserNativeLanguage({
      languageName,
      languageCode
    });
  }

  useEffect(()=> {
    if(c_id) {
      setCurrentConversationId(c_id)
    }
    console.log(c_id);
  },[c_id])

  return (
    <div className={`relative ${className} p-2 w-80 flex-grow rounded-2xl flex flex-col gap-4`}>
      <div className="sticky" >
        <Button className="w-full border text-accent bg-primary "  variant={'default'} size={'default'} onClick={()=> {
          setCurrentConversationId(null)
          if(location.pathname === '/'){
            resetState()
          } else {
            navigate('/')
          }
        }}> +    New Conversation</Button>
      </div>


      <div className="sticky pt-4">
      
        <FormControl className="!m-0" sx={{ 
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'gray',}}}
        fullWidth>
      
          <InputLabel className="!flex !items-center !-top-3 !text-sm !text-stone-500 " sx={{ 
          '&.MuiInputLabel-shrink': {
          transform: 'translate(10px, -12px) scale(0.8)',  
          }}} id="user-native-language"> Native Language</InputLabel>
          
          <Select className="!rounded-lg !h-8 !outline-none  border border-white"
            value={nativeLanguageExists ? nativeLanguage[0].languageName : userNativeLanguage.languageName}
            onChange={(e) => handleUserNativeLanguage(e.target.value)}
            sx={{ 
              color: 'gray', 
              '& legend': { display: 'none'},
            }}
          >
            {
            languageNameAndCodes.map((data) => (
              <MenuItem className="!text-sm" key={data.languageCode} value={data.languageName}>{data.languageName}</MenuItem>
            ))
            }
          </Select>
        </FormControl>
      </div>

      
      {
      getAllConversations && getAllConversations.length > 0 ?
      <div className="flex flex-col flex-grow w-full h-0 gap-2 mb-12 overflow-y-scroll rounded-lg scroll text-primary">
        {
        getAllConversations.map((c, index) => (
          <Link 
          className={`${c._id === currentConversationId && 'bg-accent'} relative flex flex-col justify-center w-full h-20 gap-1 p-2 transition-all  rounded-lg  hover:bg-accent  border border-accent`} 
          key={index} to={`/c/${c._id}`} 
          >
            <div className="flex items-center gap-2">
              <CountryFlag className="object-contain w-6 h-6 rounded-2xl" countryCode={c.selectedLanguageData.countryCode} />
              <span>{c.selectedLanguageData.languageName} {c.cefrLevel}</span>
            </div>
            <span className="text-xs font-light">{c.selectedLanguageData.voiceName} {c.selectedLanguageData.ssmlGender}</span>
            <span className="text-xs font-light">{format(new Date(c._creationTime), 'yyyy-MM-dd HH:mm:ss')}</span>
            {
            currentConversationId === c._id &&
            <div className="absolute top-0 right-0">
              <Popover open={deleteConvoPopoverIsOpen}>
                <PopoverTrigger className="flex items-center gap-2 p-2 transition-all rounded-lg hover:text-stone-700 whitespace-nowrap " onClick={()=> setDeleteConvoPopoverIsOpen(true)}>
                  <Icon path={mdiTrashCan} size={0.8} />
                </PopoverTrigger>
                
                <PopoverContent className="flex flex-col gap-2"  onInteractOutside={()=> setDeleteConvoPopoverIsOpen(false)}>
                  <span className="text-sm">Are you sure you want to delete this conversation?</span>
                  <div className="flex items-center justify-end gap-2">
                    <Button className="hover:text-stone-500" variant={'ghost'} onClick={()=> setDeleteConvoPopoverIsOpen(false)}>
                       Cancel 
                    </Button>
                    <Button variant={'destructive'} onClick={ ()=> {
                      navigate('/')
                      deleteConversation({id : c._id, sub: c.sub})
                      setDeleteConvoPopoverIsOpen(false)
                    }}> Delete </Button>
                  </div>
                </PopoverContent>
                
              </Popover>
            </div>
            
            }
          </Link>
        ))
        }
      </div>
      :
      <div className="flex items-center justify-center w-full h-full mb-12 rounded-lg text-stone-400">
        <div className="flex items-center gap-2">
          <Icon className="text-stone-300" path={mdiMessage} size={1} />
          <span>No Conversations...</span>
        </div>
      </div>
      }
    </div>
  )
}