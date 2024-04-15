import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNativeLanguage } from "../api/native-language/getNativeLanguage";
import { NativeLanguageOptions, NativeLanguageOption } from '../constants/nativeLanguageOptions';
import { Check, ChevronsUpDown } from "lucide-react";
import { useCreateNativeLanguage } from "../api/native-language/createNativeLanguage";
import { useUpdateNativeLanguage } from "../api/native-language/updateNativeLanguage";

const defaultSelectedLanguage = {
  languageName: "",
  languageCode: "",
};

export const NativeLanguageSelect = () => {

  const [open, setOpen] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState<NativeLanguageOption>(defaultSelectedLanguage);

  const query = useNativeLanguage();

  const createMutation = useCreateNativeLanguage(selectedLanguage);

  const updateMutation = useUpdateNativeLanguage(selectedLanguage);

  useEffect(()=> {

    // only update selectedLanguage if its not the same as query data
    // usually query data will only set selected language on render of component
    if(query.data 
      && selectedLanguage.languageCode !== query.data.languageCode 
      && selectedLanguage.languageName !== query.data.languageName
    ) {
      setSelectedLanguage(query.data);
    } else if(!query.data && !query.isLoading && !query.isFetching) {
      // if query does not return 
      createMutation.mutateAsync();
    };

  },[query.data]);

  useEffect(() => {

    updateMutation.mutateAsync();

  },[selectedLanguage]);

  const handleOnSelect = async (currentValue: string) => {
    // optimistic state change
    if(currentValue !== selectedLanguage.languageName) {
      const selectedLang = NativeLanguageOptions.find(x => x.languageName.toLowerCase() === currentValue);
      if(selectedLang) {
        setSelectedLanguage(selectedLang);
      } else {
        setSelectedLanguage(defaultSelectedLanguage);
      };
    };
  };

  return (
    <div className="flex justify-center w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full rounded-md justify-between text-sm h-fit"
          >
            {
              selectedLanguage.languageName 
              ?
              selectedLanguage.languageName 
              :
              "Select native language"
            }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
              className="hover:bg-background"
              value=""
              onSelect={(currentValue) => {
                handleOnSelect(currentValue)
                setOpen(false)
              }}
              >
                <Check
                  className={`
                  ${!selectedLanguage.languageName ? "opacity-100" : "opacity-0"}
                  
                  `}
                />

                <span className="text-yellow-100">None</span>
              </CommandItem>
              {NativeLanguageOptions.map((langObj) => (
                <CommandItem
                className="text-yellow-100"
                  key={langObj.languageCode}
                  value={langObj.languageName}
                  onSelect={(currentValue) => {
                    handleOnSelect(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={`
                    ${selectedLanguage.languageName === langObj.languageName ? "opacity-100" : "opacity-0"}
                    
                    `}
                  />
                  {langObj.languageName}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};