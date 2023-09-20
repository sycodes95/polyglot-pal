import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useState } from "react"
import { languageNameAndCodes } from "../../constants/languageNameAndCodes"

type SidebarProps = {
  className?: string
}


export default function Sidebar ({className} : SidebarProps) {

  const [userNativeLanguage, setUserNativeLanguage] = useState({
    languageName: '',
    languageCode: ''
  })

  const handleUserNativeLanguage = (languageName: string) => {
    const languageCode = languageNameAndCodes.find(langObj => langObj.languageName)?.languageCode
    if(!languageCode) return
    setUserNativeLanguage({
      languageName,
      languageCode
    });

  }
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
            value={userNativeLanguage.languageName}
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