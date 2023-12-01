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
import { Button } from "../ui/button"
import Icon from '@mdi/react';
import { mdiMessage, mdiTrashCan } from '@mdi/js';


import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";

type SidebarProps = {
  className?: string,
  resetState?: ()=> void,
  setShowMobileSideBar?: React.Dispatch<React.SetStateAction<boolean>>
}


export default function Sidebar ({
  className,
  resetState,
  setShowMobileSideBar
} : SidebarProps) {
  const { user } = useAuth0();

  const navigate = useNavigate()

  const location = useLocation();

  const { c_id } = useParams();

  const getAllConversations = useQuery(api.query.getAllConversations.getAllConversations, { sub: (user && user.sub) ? user.sub : ''})

  const nativeLanguage = useQuery(api.query.getNativeLanguage.getNativeLanguage, { sub: user && user.sub ? user.sub : '' })

  const mutateNativeLanguage = useMutation(api.mutation.mutateNativeLanguage.mutateNativeLanguage)

  const deleteConversation = useMutation(api.mutation.deleteConversation.deleteConversation)

  const [userNativeLanguage, setUserNativeLanguage] = useState({
    languageName: '',
    languageCode: ''
  })

  const [nativeLanguagePopoverIsOpen, setNativeLanguagePopoverIsOpen] = useState(false)

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
    
    mutateNativeLanguage(args)
    
    setUserNativeLanguage({
      languageName,
      languageCode
    });
  }

  useEffect(()=> {
    if(c_id) {
      setCurrentConversationId(c_id)
    }
  },[c_id])

  return (
    <div className={` ${className} w-full  md:w-80 flex-grow rounded- flex flex-col h-full pl-0 pb-0 pt-0 p-2 md:p-0`}>
      <div className="sticky p-2" >
        <Button className="w-full bg-red-400 text-background"  variant={'default'} size={'default'} onClick={()=> {
          setCurrentConversationId(null)
          if(location.pathname === '/'){
            resetState && resetState()
          } else {
            navigate('/')
          }
          setShowMobileSideBar && setShowMobileSideBar(false)
        }}> + New Conversation</Button>
      </div>
        

      <div className="sticky p-2">
        <Popover open={nativeLanguagePopoverIsOpen} onOpenChange={setNativeLanguagePopoverIsOpen} >
          <PopoverTrigger className="w-full border rounded-lg border-border hover:bg-foreground text-primary bg-background" asChild>
            <Button
              variant="outline"
              role="combobox"
              className="justify-between w-full h-8 overflow-hidden text-sm text-primary whitespace-nowrap text-ellipsis "
            >
              {(nativeLanguage && nativeLanguage[0].languageName)
              ? `${nativeLanguage[0].languageName} ` 
              : 'Select native language'
              }
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-50 w-full p-0 border border-border ">
            <Command className="w-full max-w-max border-border">
              <CommandInput placeholder="Search language voice." />
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup className="w-full overflow-auto h-96 ">
               
                {
                languageNameAndCodes.map((data) => (
                  <CommandItem
                    className="flex items-start w-full gap-2 text-primary hover:cursor-pointer"
                    key={data.languageCode}
                    onSelect={(currentValue) => {
                      const langName = currentValue;
                      handleUserNativeLanguage(langName[0].toUpperCase() + langName.slice(1))
                      setNativeLanguagePopoverIsOpen(false)
                      // setShowMobileSideBar && setShowMobileSideBar(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        userNativeLanguage.languageName === data.languageName ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {data.languageName} 
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        
      </div>
      
      {
      getAllConversations && getAllConversations.length > 0 ?
      <div className="flex flex-col flex-grow w-full h-0 gap-1 pr-2 m-2 overflow-y-scroll rounded-lg scroll text-primary">
        {
        getAllConversations.map((c, index) => (
          <Link 
          className={`${c._id === currentConversationId && 'bg-foreground '}  relative flex flex-col justify-center w-full h-20 gap-1 p-2 transition-all  rounded-lg  hover:bg-foreground  border border-border`} 
          key={index} to={`/c/${c._id}`} 
          onClick={()=> setShowMobileSideBar && setShowMobileSideBar(false)}
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
                  <span className="text-sm text-primary">Are you sure you want to delete this conversation?</span>
                  <div className="flex items-center justify-end gap-2">
                    <Button className=" text-primary hover:bg-foreground" variant={'ghost'} onClick={()=> setDeleteConvoPopoverIsOpen(false)}>
                       Cancel 
                    </Button>
                    <Button variant={'destructive'} onClick={ ()=> {
                      navigate('/')
                      deleteConversation({id : c._id, sub: c.sub})
                      setDeleteConvoPopoverIsOpen(false)
                      setShowMobileSideBar && setShowMobileSideBar(false)
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