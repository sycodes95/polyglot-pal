import { useEffect, useState } from "react";
import { useCreateLanguageData } from "../features/chat/api/language-data/createLanguageData";
import { LanguageData, Message, Settings } from '../features/chat/types/types';
import { useCreateConversation } from "../features/chat/api/conversation/createConversation";
import { getGptPrompt } from "../features/chat/utils/getGptPrompt";
import { useNavigate } from "react-router-dom";
import { useCreateMessage } from "../features/chat/api/message/createMessage";
import { useCreateSettings } from "../features/chat/api/settings/createSettings";


interface UseCreateNewConversationProps {
  conversationId: string | undefined;
  setIsNewConversation: React.Dispatch<React.SetStateAction<boolean>>;
  isExistingConversation: boolean;
  setIsExistingConversation: React.Dispatch<React.SetStateAction<boolean>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  languageData: LanguageData;
  setLanguageData: React.Dispatch<React.SetStateAction<LanguageData>>;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  resetState: ()=> void;
};

export const useInitCreateConversation = ({ 
  conversationId,
  setIsNewConversation,
  isExistingConversation,
  setIsExistingConversation,
  messages,
  setMessages,
  languageData,
  setLanguageData,
  settings,
  setSettings,
  resetState
} : UseCreateNewConversationProps) => {

  const navigate = useNavigate();

  const initialPrompt = {
    role: "user",
    content: getGptPrompt(languageData, settings.cefrLevel)
  };

  const [ errorCreating, setErrorCreating ] = useState(false);

  const createConversation = useCreateConversation();

  const createLangData = useCreateLanguageData(languageData);

  const createMessage = useCreateMessage(messages[0]);

  const createSettings = useCreateSettings(settings);

  const [navigateParam, setNavigateParam] = useState<number | null>(null);

  const [ isCreated, setIsCreated ] = useState({
    conversation: false,
    languageData: false,
    settings: false,
    message: false,
  });

  // const [ready, setReady] = useState(false);

  useEffect(() => {
    if(!conversationId && languageData.voiceName) {
        // create conversation after user selects language & voice
      const handleConversationCreate = async () => {
        const conversationData = await createConversation.mutateAsync();
        if(conversationData) {
          setIsCreated(prev => ({...prev, conversation: true}));
          // if conversation is created, insert convo id as foreign key into children tables
          setLanguageData(prev => ({...prev, conversationId: conversationData.id}));
          setSettings(prev => ({...prev, conversationId: conversationData.id}));
          setMessages([{...initialPrompt, conversationId: conversationData.id}]);
          setNavigateParam(conversationData.id);
        } else {
          setErrorCreating(true);
        };
      };

      handleConversationCreate();
    };
  },[languageData.voiceName]);

  useEffect(()=> {
    // save prompt msg
    if(
      !conversationId &&
      messages.length === 1 &&
      messages[0].role === "user"
    ) {
      const handleMessageCreate = async () => {
        const msgData = await createMessage.mutateAsync();
        if(msgData) {
          setIsCreated(prev => ({...prev, message: true}));
        } else {
          setErrorCreating(true);
        }
      };
      handleMessageCreate();
      setMessages([]);
    };
  },[messages]);

  useEffect(() => {
    // save language data
    if(!conversationId && languageData.conversationId) {
      const handleLanguageDataCreate = async () => {
        const langData = await createLangData.mutateAsync();
        if(langData) {
          setIsCreated(prev => ({...prev, languageData: true}));
        } else {
          setErrorCreating(true);
        }
      };
      handleLanguageDataCreate();

      //reset
      setLanguageData({
        languageName: "",
        languageCode: "",
        countryCode: "",
        voiceName: "",
        ssmlGender: "",
      })
    };

  },[languageData.conversationId])

  useEffect(() => {
    // save settings
    if(!conversationId && settings.conversationId) {
      const handleSettingsCreate = async () => {
        const settings = await createSettings.mutateAsync();
        if(settings) {
          setIsCreated(prev => ({...prev, settings: true}));
        } else {
          setErrorCreating(true);
        }
      };
      handleSettingsCreate();
      setSettings({
        cefrLevel: "C2",
        ttsEnabled: true
      })
    };

  },[settings.conversationId]);

  useEffect(() => {
    if(
      isCreated.conversation &&
      isCreated.languageData &&
      isCreated.message &&
      isCreated.settings &&
      navigateParam &&
      !conversationId
    ) {
      resetState()
      navigate(`/c/${navigateParam}`);
    }
  },[isCreated.conversation, isCreated.languageData, isCreated.message, isCreated.settings, navigateParam, conversationId]);

  // useEffect(() => {
  //   console.log(languageData, messages, settings)
  // },[languageData, messages, settings])

  // useEffect(() => {

  //   // so that when user switches from a saved conversation to new conversation 
  //   if(!conversationId) {

  //     setIsCreated({
  //       conversation: false,
  //       languageData: false,
  //       settings: false,
  //       message: false,
  //     });
  //   }
  // },[conversationId])

  return {
    errorCreating
  };

};

// export const useInitCreateConversation = ({ 
//   conversationId,
//   setIsNewConversation,
//   isExistingConversation,
//   setIsExistingConversation,
//   messages,
//   setMessages,
//   languageData,
//   setLanguageData,
//   settings,
//   setSettings,
//   resetState
// } : UseCreateNewConversationProps) => {
//   const navigate = useNavigate();
  

//   const initialPrompt = {
//     role: "user",
//     content: getGptPrompt(languageData, settings.cefrLevel)
//   };

//   const [ errorCreating, setErrorCreating ] = useState(false);

//   const createConversation = useCreateConversation();

//   const createLangData = useCreateLanguageData(languageData);

//   const createMessage = useCreateMessage(messages[0]);

//   const createSettings = useCreateSettings(settings);

//   const [navigateParam, setNavigateParam] = useState<number | null>(null);

//   const [ isCreated, setIsCreated ] = useState({
//     conversation: false,
//     languageData: false,
//     settings: false,
//     message: false,
//   });

//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     if(conversationId && languageData.voiceName) {
//         // create conversation after user selects language & voice
//       const handleConversationCreate = async () => {
//         const conversationData = await createConversation.mutateAsync();
//         if(conversationData) {
//           setIsCreated(prev => ({...prev, conversation: true}));
//           // if conversation is created, insert convo id as foreign key into children tables
//           setLanguageData(prev => ({...prev, conversationId: conversationData.id}));
//           setSettings(prev => ({...prev, conversationId: conversationData.id}));
//           setMessages([{...initialPrompt, conversationId: conversationData.id}]);
//           setNavigateParam(conversationData.id);
//         } else {
//           setErrorCreating(true);
//         };
//       };

//       handleConversationCreate();
//     };
//   },[languageData.voiceName, conversationId]);

//   useEffect(()=> {
//     // save prompt msg
//     if(
//       conversationId &&
//       messages.length === 1 &&
//       messages[0].role === "user"
//     ) {
//       const handleMessageCreate = async () => {
//         const msgData = await createMessage.mutateAsync();
//         if(msgData) {
//           setIsCreated(prev => ({...prev, message: true}));
//         } else {
//           setErrorCreating(true);
//         }
//       };
//       handleMessageCreate();
//     };
//   },[messages, conversationId]);

//   useEffect(() => {
//     // save language data
//     if(conversationId && languageData.conversationId) {
//       const handleLanguageDataCreate = async () => {
//         const langData = await createLangData.mutateAsync();
//         if(langData) {
//           setIsCreated(prev => ({...prev, languageData: true}));
//         } else {
//           setErrorCreating(true);
//         }
//       };
//       handleLanguageDataCreate();
//     };

//   },[languageData.conversationId, conversationId])

//   useEffect(() => {
//     // save settings
//     if(conversationId && settings.conversationId) {
//       const handleSettingsCreate = async () => {
//         const settings = await createSettings.mutateAsync();
//         if(settings) {
//           setIsCreated(prev => ({...prev, settings: true}));
//         } else {
//           setErrorCreating(true);
//         }
//       };
//       handleSettingsCreate();
//     };

//   },[settings.conversationId, conversationId]);

//   useEffect(() => {
//     if(
//       isCreated.conversation &&
//       isCreated.languageData &&
//       isCreated.message &&
//       isCreated.settings &&
//       navigateParam &&
//       conversationId
//     ) {
//       setIsNewConversation(false);
//       setIsExistingConversation(true);
//       navigate(`/c/${navigateParam}`);
//     }
//   },[isCreated.conversation, isCreated.languageData, isCreated.message, isCreated.settings, navigateParam, conversationId]);

//   useEffect(() => {
//     console.log(languageData, messages, settings)
//   },[languageData, messages, settings])

//   return {
//     errorCreating
//   };

// };