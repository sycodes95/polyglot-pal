import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover"

import { Button } from "../../../../components/ui/button"

import { Check, ChevronsUpDown } from "lucide-react"

type SelectALanguageProps = {

}

export default function SelectALanguage ({

}) {
  return (
    <Popover open={languageOptionsIsOpen} onOpenChange={setLanguageOptionsIsOpen}>
      <PopoverTrigger className="w-full border rounded-lg border-border hover:bg-foreground text-primary bg-background" asChild>
        <Button
        variant={'default'}
          aria-expanded={languageOptionsIsOpen}
          className="justify-between w-full h-8 overflow-hidden text-sm text-primary whitespace-nowrap text-ellipsis "
        >
          {(selectedLanguageData && selectedLanguageData.voiceName) 
          ? `${selectedLanguageData.languageName} ${selectedLanguageData.countryCode} ${selectedLanguageData.voiceName} ${selectedLanguageData.ssmlGender}` 
          : 'Select a language'
          }
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 w-full p-0 border border-border ">
        <Command className="w-full max-w-max bg-secondary border-border">
          <CommandInput placeholder="Search language voice." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup className="overflow-auto w-80 h-96 ">
            <CommandItem 
            className="cursor-pointer"
            onSelect={() => {
              setSelectedLanguageData(null)
              setLanguageOptionsIsOpen(false)
            }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  !selectedLanguageData ? "opacity-100" : "opacity-0"
                )}
              />
              ...
            </CommandItem>
            
            {languageOptions.map((lang : LanguageOption, index: number) => (
              <CommandItem
                className="flex items-start w-full gap-2 text-primary hover:cursor-pointer"
                key={index}
                onSelect={(currentValue) => {
                  const values = currentValue.split(' ')
                  const voiceName = values[2]
                  const selectedLanguageData = languageOptions.find(opt => opt.voiceName.toLowerCase() === voiceName)
                  selectedLanguageData ? setSelectedLanguageData(selectedLanguageData) : setSelectedLanguageData(null)
                  setMessages([])
                  setLanguageOptionsIsOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedLanguageData?.voiceName === lang.voiceName ? "opacity-100" : "opacity-0"
                  )}
                />
                <CountryFlag className="object-contain w-4 h-4 mt-0.5 rounded-lg" countryCode={lang.countryCode}/>
                {lang.languageName} ({lang.countryCode}) {lang.voiceName} ({lang.ssmlGender})
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}