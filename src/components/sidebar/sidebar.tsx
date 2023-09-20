import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { languageNameAndCodes } from "../../constants/languageNameAndCodes"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api";
import { useAuth0 } from "@auth0/auth0-react";
import { Id } from "convex/dist/cjs-types/values/value";
type SidebarProps = {
  className?: string
}


export default function Sidebar ({className} : SidebarProps) {

  const { user } = useAuth0();
  const mutateNativeLanguage = useMutation(api.mutation.mutateNativeLanguage.mutateNativeLanguage)

  const nativeLanguage = useQuery(api.query.getNativeLanguage.getNativeLanguage, { sub: user && user.sub ? user.sub : '' })

  const nativeLanguageExists = nativeLanguage && nativeLanguage[0] && nativeLanguage[0]._id

  const [userNativeLanguage, setUserNativeLanguage] = useState({
    languageName: '',
    languageCode: ''
  })

  const handleUserNativeLanguage = (languageName: string) => {
    const languageCode = languageNameAndCodes.find(langObj => langObj.languageName === languageName)?.languageCode
    console.log(languageCode);
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
    console.log(nativeLanguage);
  },[nativeLanguage])
  return (
    <div className={`${className} p-2  w-80  rounded-2xl flex flex-col gap-2`}>
      <div className="p-4">
      
        <FormControl className="!m-0" sx={{ 
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'gray',}}}
        fullWidth>
      
          <InputLabel className="!flex !items-center !-top-3 !text-sm !text-stone-500" sx={{ 
          '&.MuiInputLabel-shrink': {
          transform: 'translate(10px, -12px) scale(0.8)',  
          }}} id="user-native-language"> Native Language</InputLabel>
          
          <Select className="!rounded-lg !h-8 !outline-none"
            labelId="user-native-language-label"
            id="user-native-language"
            value={nativeLanguageExists ? nativeLanguage[0].languageName : userNativeLanguage.languageName}
            label="Age"
            onChange={(e) => handleUserNativeLanguage(e.target.value)}
            sx={{ 
              color: 'gray', 
              '& legend': { display: 'none'},
            }}
          >
            {
            languageNameAndCodes.map((data, index) => (
              <MenuItem className="!text-sm" key={data.languageCode} value={data.languageName}>{data.languageName}</MenuItem>
            ))
            }
          </Select>
        </FormControl>
      </div>
    </div>
  )
}