# Details

Date : 2024-04-18 21:32:57

Directory c:\\Users\\sycod\\source\\repos\\polyglot-pal

Total : 218 files,  38549 codes, 371 comments, 2075 blanks, all 40995 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [api/Controllers/AccountController.cs](/api/Controllers/AccountController.cs) | C# | 89 | 0 | 19 | 108 |
| [api/Controllers/ConversationController.cs](/api/Controllers/ConversationController.cs) | C# | 77 | 0 | 19 | 96 |
| [api/Controllers/GoogleApiController.cs](/api/Controllers/GoogleApiController.cs) | C# | 56 | 0 | 21 | 77 |
| [api/Controllers/LanguageDataController.cs](/api/Controllers/LanguageDataController.cs) | C# | 73 | 9 | 32 | 114 |
| [api/Controllers/MessageController.cs](/api/Controllers/MessageController.cs) | C# | 71 | 0 | 20 | 91 |
| [api/Controllers/NativeLanguageController.cs](/api/Controllers/NativeLanguageController.cs) | C# | 71 | 0 | 28 | 99 |
| [api/Controllers/OpenAIApiController.cs](/api/Controllers/OpenAIApiController.cs) | C# | 29 | 0 | 11 | 40 |
| [api/Controllers/SettingsController.cs](/api/Controllers/SettingsController.cs) | C# | 71 | 1 | 24 | 96 |
| [api/Data/ApplicationDBContext.cs](/api/Data/ApplicationDBContext.cs) | C# | 42 | 0 | 6 | 48 |
| [api/Dtos/Account/LoginDto.cs](/api/Dtos/Account/LoginDto.cs) | C# | 15 | 0 | 2 | 17 |
| [api/Dtos/Account/NewUserDto.cs](/api/Dtos/Account/NewUserDto.cs) | C# | 13 | 0 | 3 | 16 |
| [api/Dtos/Account/RegisterDto.cs](/api/Dtos/Account/RegisterDto.cs) | C# | 18 | 0 | 3 | 21 |
| [api/Dtos/Conversation/AllConversationDto.cs](/api/Dtos/Conversation/AllConversationDto.cs) | C# | 18 | 0 | 1 | 19 |
| [api/Dtos/Conversation/ConversationDto.cs](/api/Dtos/Conversation/ConversationDto.cs) | C# | 16 | 2 | 6 | 24 |
| [api/Dtos/Conversation/CreateConversationDto.cs](/api/Dtos/Conversation/CreateConversationDto.cs) | C# | 11 | 0 | 2 | 13 |
| [api/Dtos/Google/CreateSpeechToTextDto.cs](/api/Dtos/Google/CreateSpeechToTextDto.cs) | C# | 13 | 0 | 4 | 17 |
| [api/Dtos/Google/CreateTextToSpeechDto.cs](/api/Dtos/Google/CreateTextToSpeechDto.cs) | C# | 18 | 0 | 7 | 25 |
| [api/Dtos/Google/GetTranslationDto.cs](/api/Dtos/Google/GetTranslationDto.cs) | C# | 12 | 0 | 1 | 13 |
| [api/Dtos/Google/GoogleTTSVoice.cs](/api/Dtos/Google/GoogleTTSVoice.cs) | C# | 18 | 0 | 2 | 20 |
| [api/Dtos/LanguageData/CreateLanguageDataDto.cs](/api/Dtos/LanguageData/CreateLanguageDataDto.cs) | C# | 16 | 1 | 2 | 19 |
| [api/Dtos/LanguageData/LanguageDataDto.cs](/api/Dtos/LanguageData/LanguageDataDto.cs) | C# | 17 | 0 | 1 | 18 |
| [api/Dtos/LanguageData/UpdateLanguageDataRequestDto.cs](/api/Dtos/LanguageData/UpdateLanguageDataRequestDto.cs) | C# | 15 | 0 | 2 | 17 |
| [api/Dtos/Message/CreateMessageDto.cs](/api/Dtos/Message/CreateMessageDto.cs) | C# | 13 | 1 | 1 | 15 |
| [api/Dtos/Message/GptMessageDto.cs](/api/Dtos/Message/GptMessageDto.cs) | C# | 12 | 0 | 1 | 13 |
| [api/Dtos/Message/MessageDto.cs](/api/Dtos/Message/MessageDto.cs) | C# | 14 | 0 | 1 | 15 |
| [api/Dtos/Message/UpdateMessageRequestDto.cs](/api/Dtos/Message/UpdateMessageRequestDto.cs) | C# | 12 | 0 | 2 | 14 |
| [api/Dtos/NativeLanguage/CreateNativeLanguageDto.cs](/api/Dtos/NativeLanguage/CreateNativeLanguageDto.cs) | C# | 12 | 0 | 1 | 13 |
| [api/Dtos/NativeLanguage/DeleteNativeLanguageDto.cs](/api/Dtos/NativeLanguage/DeleteNativeLanguageDto.cs) | C# | 10 | 0 | 2 | 12 |
| [api/Dtos/NativeLanguage/NativeLanguageDto.cs](/api/Dtos/NativeLanguage/NativeLanguageDto.cs) | C# | 13 | 0 | 1 | 14 |
| [api/Dtos/NativeLanguage/UpdateNativeLanguageRequestDto.cs](/api/Dtos/NativeLanguage/UpdateNativeLanguageRequestDto.cs) | C# | 13 | 0 | 1 | 14 |
| [api/Dtos/OpenAI/CreateGPTResponseDto.cs](/api/Dtos/OpenAI/CreateGPTResponseDto.cs) | C# | 17 | 0 | 4 | 21 |
| [api/Dtos/OpenAI/GPTResponseRequestDto.cs](/api/Dtos/OpenAI/GPTResponseRequestDto.cs) | C# | 29 | 0 | 3 | 32 |
| [api/Dtos/Settings/CreateSettingsDto.cs](/api/Dtos/Settings/CreateSettingsDto.cs) | C# | 13 | 0 | 1 | 14 |
| [api/Dtos/Settings/SettingsDto.cs](/api/Dtos/Settings/SettingsDto.cs) | C# | 14 | 0 | 1 | 15 |
| [api/Dtos/Settings/UpdateSettingsDto.cs](/api/Dtos/Settings/UpdateSettingsDto.cs) | C# | 13 | 0 | 1 | 14 |
| [api/Extensions/ClaimsExtensions.cs](/api/Extensions/ClaimsExtensions.cs) | C# | 15 | 0 | 1 | 16 |
| [api/Helpers/AppUserHelpers.cs](/api/Helpers/AppUserHelpers.cs) | C# | 11 | 0 | 1 | 12 |
| [api/Interface/IConversationRepository.cs](/api/Interface/IConversationRepository.cs) | C# | 16 | 0 | 4 | 20 |
| [api/Interface/IGoogleApiService.cs](/api/Interface/IGoogleApiService.cs) | C# | 15 | 0 | 2 | 17 |
| [api/Interface/ILanguageDataRepository.cs](/api/Interface/ILanguageDataRepository.cs) | C# | 17 | 1 | 7 | 25 |
| [api/Interface/IMessageRepository.cs](/api/Interface/IMessageRepository.cs) | C# | 17 | 0 | 5 | 22 |
| [api/Interface/INativeLanguageRepository.cs](/api/Interface/INativeLanguageRepository.cs) | C# | 16 | 0 | 4 | 20 |
| [api/Interface/IOpenApiService.cs](/api/Interface/IOpenApiService.cs) | C# | 13 | 0 | 1 | 14 |
| [api/Interface/ISettingsRepository.cs](/api/Interface/ISettingsRepository.cs) | C# | 17 | 0 | 4 | 21 |
| [api/Interface/ITokenService.cs](/api/Interface/ITokenService.cs) | C# | 12 | 0 | 1 | 13 |
| [api/Mappers/ConversationMappers.cs](/api/Mappers/ConversationMappers.cs) | C# | 31 | 0 | 7 | 38 |
| [api/Mappers/LanguageDataMappers.cs](/api/Mappers/LanguageDataMappers.cs) | C# | 37 | 0 | 4 | 41 |
| [api/Mappers/MessageMappers.cs](/api/Mappers/MessageMappers.cs) | C# | 32 | 0 | 5 | 37 |
| [api/Mappers/NativeLanguageMappers.cs](/api/Mappers/NativeLanguageMappers.cs) | C# | 31 | 0 | 4 | 35 |
| [api/Mappers/SettingsMappers.cs](/api/Mappers/SettingsMappers.cs) | C# | 24 | 0 | 2 | 26 |
| [api/Migrations/20240415103151_InitialCreate.Designer.cs](/api/Migrations/20240415103151_InitialCreate.Designer.cs) | C# | 378 | 2 | 126 | 506 |
| [api/Migrations/20240415103151_InitialCreate.cs](/api/Migrations/20240415103151_InitialCreate.cs) | C# | 345 | 3 | 40 | 388 |
| [api/Migrations/ApplicationDBContextModelSnapshot.cs](/api/Migrations/ApplicationDBContextModelSnapshot.cs) | C# | 376 | 1 | 126 | 503 |
| [api/Models/AppUser.cs](/api/Models/AppUser.cs) | C# | 11 | 0 | 1 | 12 |
| [api/Models/Conversation.cs](/api/Models/Conversation.cs) | C# | 17 | 2 | 2 | 21 |
| [api/Models/LanguageData.cs](/api/Models/LanguageData.cs) | C# | 18 | 1 | 4 | 23 |
| [api/Models/Message.cs](/api/Models/Message.cs) | C# | 15 | 1 | 1 | 17 |
| [api/Models/NativeLanguage.cs](/api/Models/NativeLanguage.cs) | C# | 15 | 2 | 1 | 18 |
| [api/Models/Settings.cs](/api/Models/Settings.cs) | C# | 15 | 1 | 1 | 17 |
| [api/Program.cs](/api/Program.cs) | C# | 107 | 3 | 17 | 127 |
| [api/Properties/launchSettings.json](/api/Properties/launchSettings.json) | JSON | 41 | 0 | 1 | 42 |
| [api/Repository/ConversationRepository.cs](/api/Repository/ConversationRepository.cs) | C# | 53 | 0 | 12 | 65 |
| [api/Repository/LanguageDataRepository.cs](/api/Repository/LanguageDataRepository.cs) | C# | 52 | 4 | 14 | 70 |
| [api/Repository/MessageRepository.cs](/api/Repository/MessageRepository.cs) | C# | 61 | 0 | 31 | 92 |
| [api/Repository/NativeLanguageRepository.cs](/api/Repository/NativeLanguageRepository.cs) | C# | 49 | 0 | 16 | 65 |
| [api/Repository/SettingsRepository.cs](/api/Repository/SettingsRepository.cs) | C# | 57 | 0 | 17 | 74 |
| [api/Services/GoogleApiService.cs](/api/Services/GoogleApiService.cs) | C# | 127 | 2 | 43 | 172 |
| [api/Services/OpenApiService.cs](/api/Services/OpenApiService.cs) | C# | 65 | 0 | 24 | 89 |
| [api/Services/TokenService.cs](/api/Services/TokenService.cs) | C# | 43 | 0 | 8 | 51 |
| [api/api.csproj](/api/api.csproj) | XML | 30 | 0 | 4 | 34 |
| [frontend/.eslintrc.cjs](/frontend/.eslintrc.cjs) | JavaScript | 18 | 0 | 1 | 19 |
| [frontend/README.md](/frontend/README.md) | Markdown | 65 | 0 | 48 | 113 |
| [frontend/components.json](/frontend/components.json) | JSON | 16 | 0 | 0 | 16 |
| [frontend/cypress.config.ts](/frontend/cypress.config.ts) | TypeScript | 7 | 1 | 2 | 10 |
| [frontend/cypress/e2e/spec.cy.ts](/frontend/cypress/e2e/spec.cy.ts) | TypeScript | 5 | 0 | 0 | 5 |
| [frontend/cypress/fixtures/example.json](/frontend/cypress/fixtures/example.json) | JSON | 5 | 0 | 1 | 6 |
| [frontend/cypress/support/commands.ts](/frontend/cypress/support/commands.ts) | TypeScript | 0 | 37 | 0 | 37 |
| [frontend/cypress/support/e2e.ts](/frontend/cypress/support/e2e.ts) | TypeScript | 1 | 17 | 2 | 20 |
| [frontend/index.html](/frontend/index.html) | HTML | 14 | 0 | 1 | 15 |
| [frontend/package-lock.json](/frontend/package-lock.json) | JSON | 28,831 | 0 | 1 | 28,832 |
| [frontend/package.json](/frontend/package.json) | JSON | 105 | 0 | 1 | 106 |
| [frontend/postcss.config.js](/frontend/postcss.config.js) | JavaScript | 6 | 0 | 1 | 7 |
| [frontend/public/vite.svg](/frontend/public/vite.svg) | XML | 1 | 0 | 0 | 1 |
| [frontend/src/App.css](/frontend/src/App.css) | CSS | 76 | 0 | 26 | 102 |
| [frontend/src/App.tsx](/frontend/src/App.tsx) | TypeScript JSX | 11 | 0 | 5 | 16 |
| [frontend/src/assets/react.svg](/frontend/src/assets/react.svg) | XML | 1 | 0 | 0 | 1 |
| [frontend/src/components/Footer/Footer.tsx](/frontend/src/components/Footer/Footer.tsx) | TypeScript JSX | 16 | 0 | 1 | 17 |
| [frontend/src/components/Layout/AuthLayout.tsx](/frontend/src/components/Layout/AuthLayout.tsx) | TypeScript JSX | 10 | 0 | 1 | 11 |
| [frontend/src/components/Layout/ContentLayout.tsx](/frontend/src/components/Layout/ContentLayout.tsx) | TypeScript JSX | 9 | 0 | 2 | 11 |
| [frontend/src/components/Layout/MainLayout.tsx](/frontend/src/components/Layout/MainLayout.tsx) | TypeScript JSX | 197 | 1 | 44 | 242 |
| [frontend/src/components/Layout/index.ts](/frontend/src/components/Layout/index.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [frontend/src/components/atropos/atroposEffect.tsx](/frontend/src/components/atropos/atroposEffect.tsx) | TypeScript JSX | 32 | 0 | 2 | 34 |
| [frontend/src/components/countryFlag/countryFlag.tsx](/frontend/src/components/countryFlag/countryFlag.tsx) | TypeScript JSX | 15 | 9 | 7 | 31 |
| [frontend/src/components/loadSpinners/ ovalSpinnerBlackGray.tsx](/frontend/src/components/loadSpinners/%20ovalSpinnerBlackGray.tsx) | TypeScript JSX | 19 | 0 | 2 | 21 |
| [frontend/src/components/mobileSideBar/mobileSideBar.tsx](/frontend/src/components/mobileSideBar/mobileSideBar.tsx) | TypeScript JSX | 0 | 0 | 1 | 1 |
| [frontend/src/components/sidebar/sidebar.tsx](/frontend/src/components/sidebar/sidebar.tsx) | TypeScript JSX | 199 | 1 | 36 | 236 |
| [frontend/src/components/talkSetupOptionContainer/talkSetupOptionContainer.tsx](/frontend/src/components/talkSetupOptionContainer/talkSetupOptionContainer.tsx) | TypeScript JSX | 17 | 0 | 4 | 21 |
| [frontend/src/components/themeProvider/theme-provider.tsx](/frontend/src/components/themeProvider/theme-provider.tsx) | TypeScript JSX | 57 | 0 | 17 | 74 |
| [frontend/src/components/ui/DeletePopover.tsx](/frontend/src/components/ui/DeletePopover.tsx) | TypeScript JSX | 13 | 0 | 1 | 14 |
| [frontend/src/components/ui/button.tsx](/frontend/src/components/ui/button.tsx) | TypeScript JSX | 51 | 0 | 6 | 57 |
| [frontend/src/components/ui/command.tsx](/frontend/src/components/ui/command.tsx) | TypeScript JSX | 136 | 0 | 18 | 154 |
| [frontend/src/components/ui/dialog.tsx](/frontend/src/components/ui/dialog.tsx) | TypeScript JSX | 110 | 0 | 12 | 122 |
| [frontend/src/components/ui/dropdown-menu.tsx](/frontend/src/components/ui/dropdown-menu.tsx) | TypeScript JSX | 181 | 0 | 18 | 199 |
| [frontend/src/components/ui/form.tsx](/frontend/src/components/ui/form.tsx) | TypeScript JSX | 152 | 0 | 25 | 177 |
| [frontend/src/components/ui/input.tsx](/frontend/src/components/ui/input.tsx) | TypeScript JSX | 21 | 0 | 5 | 26 |
| [frontend/src/components/ui/label.tsx](/frontend/src/components/ui/label.tsx) | TypeScript JSX | 20 | 0 | 5 | 25 |
| [frontend/src/components/ui/popover.tsx](/frontend/src/components/ui/popover.tsx) | TypeScript JSX | 24 | 0 | 5 | 29 |
| [frontend/src/components/ui/select.tsx](/frontend/src/components/ui/select.tsx) | TypeScript JSX | 108 | 0 | 12 | 120 |
| [frontend/src/components/ui/switch.tsx](/frontend/src/components/ui/switch.tsx) | TypeScript JSX | 24 | 0 | 5 | 29 |
| [frontend/src/components/ui/toast.tsx](/frontend/src/components/ui/toast.tsx) | TypeScript JSX | 115 | 0 | 13 | 128 |
| [frontend/src/components/ui/toaster.tsx](/frontend/src/components/ui/toaster.tsx) | TypeScript JSX | 31 | 0 | 3 | 34 |
| [frontend/src/components/ui/tooltip.tsx](/frontend/src/components/ui/tooltip.tsx) | TypeScript JSX | 22 | 0 | 7 | 29 |
| [frontend/src/components/ui/use-toast.ts](/frontend/src/components/ui/use-toast.ts) | TypeScript | 159 | 3 | 31 | 193 |
| [frontend/src/config.ts](/frontend/src/config.ts) | TypeScript | 3 | 0 | 0 | 3 |
| [frontend/src/constants/cefrLevels.ts](/frontend/src/constants/cefrLevels.ts) | TypeScript | 8 | 0 | 2 | 10 |
| [frontend/src/constants/languageNameAndCodes.ts](/frontend/src/constants/languageNameAndCodes.ts) | TypeScript | 109 | 0 | 1 | 110 |
| [frontend/src/declarations.d.ts](/frontend/src/declarations.d.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [frontend/src/features/auth/components/FormErrorBox.tsx](/frontend/src/features/auth/components/FormErrorBox.tsx) | TypeScript JSX | 10 | 0 | 2 | 12 |
| [frontend/src/features/auth/components/Layout.tsx](/frontend/src/features/auth/components/Layout.tsx) | TypeScript JSX | 11 | 0 | 1 | 12 |
| [frontend/src/features/auth/components/LoginForm.tsx](/frontend/src/features/auth/components/LoginForm.tsx) | TypeScript JSX | 114 | 2 | 18 | 134 |
| [frontend/src/features/auth/components/RegisterForm.tsx](/frontend/src/features/auth/components/RegisterForm.tsx) | TypeScript JSX | 168 | 2 | 22 | 192 |
| [frontend/src/features/auth/components/RegisterPwChecker.tsx](/frontend/src/features/auth/components/RegisterPwChecker.tsx) | TypeScript JSX | 51 | 1 | 14 | 66 |
| [frontend/src/features/auth/routes/Login.tsx](/frontend/src/features/auth/routes/Login.tsx) | TypeScript JSX | 9 | 0 | 2 | 11 |
| [frontend/src/features/auth/routes/Register.tsx](/frontend/src/features/auth/routes/Register.tsx) | TypeScript JSX | 9 | 0 | 1 | 10 |
| [frontend/src/features/auth/routes/index.tsx](/frontend/src/features/auth/routes/index.tsx) | TypeScript JSX | 2 | 0 | 1 | 3 |
| [frontend/src/features/chat/api/conversation/createConversation.ts](/frontend/src/features/chat/api/conversation/createConversation.ts) | TypeScript | 27 | 0 | 6 | 33 |
| [frontend/src/features/chat/api/conversation/deleteConversation.ts](/frontend/src/features/chat/api/conversation/deleteConversation.ts) | TypeScript | 18 | 0 | 3 | 21 |
| [frontend/src/features/chat/api/conversation/getAllConversations.ts](/frontend/src/features/chat/api/conversation/getAllConversations.ts) | TypeScript | 21 | 1 | 5 | 27 |
| [frontend/src/features/chat/api/conversation/getConversationById.ts](/frontend/src/features/chat/api/conversation/getConversationById.ts) | TypeScript | 23 | 1 | 6 | 30 |
| [frontend/src/features/chat/api/google/getTtsVoiceBase64.ts](/frontend/src/features/chat/api/google/getTtsVoiceBase64.ts) | TypeScript | 49 | 0 | 13 | 62 |
| [frontend/src/features/chat/api/google/getVoiceDatas.ts](/frontend/src/features/chat/api/google/getVoiceDatas.ts) | TypeScript | 21 | 0 | 4 | 25 |
| [frontend/src/features/chat/api/language-data/createLanguageData.ts](/frontend/src/features/chat/api/language-data/createLanguageData.ts) | TypeScript | 27 | 0 | 5 | 32 |
| [frontend/src/features/chat/api/language-data/getLanguageData.ts](/frontend/src/features/chat/api/language-data/getLanguageData.ts) | TypeScript | 23 | 0 | 5 | 28 |
| [frontend/src/features/chat/api/language-data/updateLanguageData.ts](/frontend/src/features/chat/api/language-data/updateLanguageData.ts) | TypeScript | 28 | 9 | 1 | 38 |
| [frontend/src/features/chat/api/message/createMessage.ts](/frontend/src/features/chat/api/message/createMessage.ts) | TypeScript | 25 | 0 | 4 | 29 |
| [frontend/src/features/chat/api/message/deleteAllMessages.ts](/frontend/src/features/chat/api/message/deleteAllMessages.ts) | TypeScript | 21 | 4 | 4 | 29 |
| [frontend/src/features/chat/api/message/getAllMessages.ts](/frontend/src/features/chat/api/message/getAllMessages.ts) | TypeScript | 22 | 0 | 4 | 26 |
| [frontend/src/features/chat/api/native-language/createNativeLanguage.ts](/frontend/src/features/chat/api/native-language/createNativeLanguage.ts) | TypeScript | 21 | 0 | 6 | 27 |
| [frontend/src/features/chat/api/native-language/getNativeLanguage.ts](/frontend/src/features/chat/api/native-language/getNativeLanguage.ts) | TypeScript | 22 | 1 | 4 | 27 |
| [frontend/src/features/chat/api/native-language/updateNativeLanguage.ts](/frontend/src/features/chat/api/native-language/updateNativeLanguage.ts) | TypeScript | 21 | 0 | 6 | 27 |
| [frontend/src/features/chat/api/openAI/createGPTResponse.ts](/frontend/src/features/chat/api/openAI/createGPTResponse.ts) | TypeScript | 24 | 0 | 4 | 28 |
| [frontend/src/features/chat/api/settings/createSettings.ts](/frontend/src/features/chat/api/settings/createSettings.ts) | TypeScript | 25 | 0 | 4 | 29 |
| [frontend/src/features/chat/api/settings/getSettings.ts](/frontend/src/features/chat/api/settings/getSettings.ts) | TypeScript | 21 | 0 | 3 | 24 |
| [frontend/src/features/chat/api/settings/updateSettings.ts](/frontend/src/features/chat/api/settings/updateSettings.ts) | TypeScript | 21 | 0 | 8 | 29 |
| [frontend/src/features/chat/components/Conversation.tsx](/frontend/src/features/chat/components/Conversation.tsx) | TypeScript JSX | 50 | 2 | 11 | 63 |
| [frontend/src/features/chat/components/ConversationList.tsx](/frontend/src/features/chat/components/ConversationList.tsx) | TypeScript JSX | 67 | 0 | 14 | 81 |
| [frontend/src/features/chat/components/LanguageDataSelect.tsx](/frontend/src/features/chat/components/LanguageDataSelect.tsx) | TypeScript JSX | 124 | 22 | 20 | 166 |
| [frontend/src/features/chat/components/Messages.tsx](/frontend/src/features/chat/components/Messages.tsx) | TypeScript JSX | 57 | 0 | 9 | 66 |
| [frontend/src/features/chat/components/NativeLanguageSelect.tsx](/frontend/src/features/chat/components/NativeLanguageSelect.tsx) | TypeScript JSX | 119 | 4 | 16 | 139 |
| [frontend/src/features/chat/components/NewConversation.tsx](/frontend/src/features/chat/components/NewConversation.tsx) | TypeScript JSX | 17 | 0 | 2 | 19 |
| [frontend/src/features/chat/components/OptionsLayout.tsx](/frontend/src/features/chat/components/OptionsLayout.tsx) | TypeScript JSX | 11 | 0 | 1 | 12 |
| [frontend/src/features/chat/components/SettingsBar.tsx](/frontend/src/features/chat/components/SettingsBar.tsx) | TypeScript JSX | 52 | 3 | 12 | 67 |
| [frontend/src/features/chat/components/Sidebar.tsx](/frontend/src/features/chat/components/Sidebar.tsx) | TypeScript JSX | 11 | 0 | 1 | 12 |
| [frontend/src/features/chat/components/VoiceAndTextInput.tsx](/frontend/src/features/chat/components/VoiceAndTextInput.tsx) | TypeScript JSX | 142 | 7 | 26 | 175 |
| [frontend/src/features/chat/constants/nativeLanguageOptions.ts](/frontend/src/features/chat/constants/nativeLanguageOptions.ts) | TypeScript | 114 | 0 | 2 | 116 |
| [frontend/src/features/chat/index.ts](/frontend/src/features/chat/index.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [frontend/src/features/chat/routes/Chat.tsx](/frontend/src/features/chat/routes/Chat.tsx) | TypeScript JSX | 21 | 0 | 4 | 25 |
| [frontend/src/features/chat/routes/index.tsx](/frontend/src/features/chat/routes/index.tsx) | TypeScript JSX | 10 | 0 | 2 | 12 |
| [frontend/src/features/chat/types/Conversation.ts](/frontend/src/features/chat/types/Conversation.ts) | TypeScript | 3 | 0 | 1 | 4 |
| [frontend/src/features/chat/types/Message.ts](/frontend/src/features/chat/types/Message.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [frontend/src/features/chat/types/NativeLanguage.ts](/frontend/src/features/chat/types/NativeLanguage.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [frontend/src/features/chat/types/types.ts](/frontend/src/features/chat/types/types.ts) | TypeScript | 43 | 0 | 9 | 52 |
| [frontend/src/features/chat/utils/getGptPrompt.ts](/frontend/src/features/chat/utils/getGptPrompt.ts) | TypeScript | 19 | 1 | 2 | 22 |
| [frontend/src/features/chat/utils/getLangNameFromCode.ts](/frontend/src/features/chat/utils/getLangNameFromCode.ts) | TypeScript | 7 | 0 | 0 | 7 |
| [frontend/src/features/landingPage/landingPageHeader.tsx](/frontend/src/features/landingPage/landingPageHeader.tsx) | TypeScript JSX | 25 | 0 | 8 | 33 |
| [frontend/src/features/landingPage/signUpButton.tsx](/frontend/src/features/landingPage/signUpButton.tsx) | TypeScript JSX | 13 | 0 | 3 | 16 |
| [frontend/src/features/misc/index.ts](/frontend/src/features/misc/index.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [frontend/src/features/misc/routes/Landing.tsx](/frontend/src/features/misc/routes/Landing.tsx) | TypeScript JSX | 120 | 1 | 25 | 146 |
| [frontend/src/features/misc/routes/index.tsx](/frontend/src/features/misc/routes/index.tsx) | TypeScript JSX | 1 | 0 | 0 | 1 |
| [frontend/src/features/talkWithPolyglot/components/palSpeechIndicator/palSpeechIndicator.tsx](/frontend/src/features/talkWithPolyglot/components/palSpeechIndicator/palSpeechIndicator.tsx) | TypeScript JSX | 27 | 0 | 9 | 36 |
| [frontend/src/features/talkWithPolyglot/components/talkMessageInput/talkMessageInput.test.tsx](/frontend/src/features/talkWithPolyglot/components/talkMessageInput/talkMessageInput.test.tsx) | TypeScript JSX | 40 | 2 | 14 | 56 |
| [frontend/src/features/talkWithPolyglot/components/talkMessageInput/talkMessageInput.tsx](/frontend/src/features/talkWithPolyglot/components/talkMessageInput/talkMessageInput.tsx) | TypeScript JSX | 145 | 1 | 27 | 173 |
| [frontend/src/features/talkWithPolyglot/components/talkMessages/messageOptions/messageOptions.tsx](/frontend/src/features/talkWithPolyglot/components/talkMessages/messageOptions/messageOptions.tsx) | TypeScript JSX | 6 | 0 | 4 | 10 |
| [frontend/src/features/talkWithPolyglot/components/talkMessages/message/message.tsx](/frontend/src/features/talkWithPolyglot/components/talkMessages/message/message.tsx) | TypeScript JSX | 101 | 0 | 6 | 107 |
| [frontend/src/features/talkWithPolyglot/components/talkMessages/talkMessages.tsx](/frontend/src/features/talkWithPolyglot/components/talkMessages/talkMessages.tsx) | TypeScript JSX | 192 | 2 | 49 | 243 |
| [frontend/src/features/talkWithPolyglot/components/talkSetupOptions/__tests__/talkSetupOptions.test.tsx](/frontend/src/features/talkWithPolyglot/components/talkSetupOptions/__tests__/talkSetupOptions.test.tsx) | TypeScript JSX | 60 | 1 | 17 | 78 |
| [frontend/src/features/talkWithPolyglot/components/talkSetupOptions/selectALanguage.tsx](/frontend/src/features/talkWithPolyglot/components/talkSetupOptions/selectALanguage.tsx) | TypeScript JSX | 75 | 0 | 7 | 82 |
| [frontend/src/features/talkWithPolyglot/components/talkSetupOptions/talkSetupOptions.tsx](/frontend/src/features/talkWithPolyglot/components/talkSetupOptions/talkSetupOptions.tsx) | TypeScript JSX | 208 | 3 | 31 | 242 |
| [frontend/src/features/talkWithPolyglot/constants.ts](/frontend/src/features/talkWithPolyglot/constants.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [frontend/src/features/talkWithPolyglot/hooks/useLanguageOptions.tsx](/frontend/src/features/talkWithPolyglot/hooks/useLanguageOptions.tsx) | TypeScript JSX | 19 | 0 | 5 | 24 |
| [frontend/src/features/talkWithPolyglot/services/getGPTMessageResponse.ts](/frontend/src/features/talkWithPolyglot/services/getGPTMessageResponse.ts) | TypeScript | 29 | 0 | 4 | 33 |
| [frontend/src/features/talkWithPolyglot/services/getGPTPrompt.ts](/frontend/src/features/talkWithPolyglot/services/getGPTPrompt.ts) | TypeScript | 10 | 1 | 2 | 13 |
| [frontend/src/features/talkWithPolyglot/types.ts](/frontend/src/features/talkWithPolyglot/types.ts) | TypeScript | 17 | 0 | 2 | 19 |
| [frontend/src/features/talkWithPolyglot/util/pausePalVoice.ts](/frontend/src/features/talkWithPolyglot/util/pausePalVoice.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [frontend/src/hooks/useAuth.tsx](/frontend/src/hooks/useAuth.tsx) | TypeScript JSX | 107 | 0 | 27 | 134 |
| [frontend/src/hooks/useConversation.tsx](/frontend/src/hooks/useConversation.tsx) | TypeScript JSX | 169 | 8 | 37 | 214 |
| [frontend/src/hooks/useInitNewConversation.tsx](/frontend/src/hooks/useInitNewConversation.tsx) | TypeScript JSX | 135 | 145 | 51 | 331 |
| [frontend/src/hooks/useLanguageData.tsx](/frontend/src/hooks/useLanguageData.tsx) | TypeScript JSX | 72 | 1 | 17 | 90 |
| [frontend/src/hooks/useMessages.tsx](/frontend/src/hooks/useMessages.tsx) | TypeScript JSX | 61 | 3 | 16 | 80 |
| [frontend/src/hooks/useSettings.tsx](/frontend/src/hooks/useSettings.tsx) | TypeScript JSX | 45 | 0 | 11 | 56 |
| [frontend/src/hooks/useTts.tsx](/frontend/src/hooks/useTts.tsx) | TypeScript JSX | 32 | 1 | 11 | 44 |
| [frontend/src/index.css](/frontend/src/index.css) | CSS | 70 | 1 | 29 | 100 |
| [frontend/src/lib/utils.ts](/frontend/src/lib/utils.ts) | TypeScript | 5 | 0 | 2 | 7 |
| [frontend/src/main.tsx](/frontend/src/main.tsx) | TypeScript JSX | 7 | 7 | 4 | 18 |
| [frontend/src/pages/__tests__/talkWithPolyglot.tsx](/frontend/src/pages/__tests__/talkWithPolyglot.tsx) | TypeScript JSX | 5 | 0 | 1 | 6 |
| [frontend/src/pages/landingPage.tsx](/frontend/src/pages/landingPage.tsx) | TypeScript JSX | 112 | 0 | 23 | 135 |
| [frontend/src/pages/talkWithPolyglot.tsx](/frontend/src/pages/talkWithPolyglot.tsx) | TypeScript JSX | 346 | 18 | 124 | 488 |
| [frontend/src/providers/app.tsx](/frontend/src/providers/app.tsx) | TypeScript JSX | 22 | 0 | 5 | 27 |
| [frontend/src/routes/index.tsx](/frontend/src/routes/index.tsx) | TypeScript JSX | 10 | 1 | 5 | 16 |
| [frontend/src/routes/protected.tsx](/frontend/src/routes/protected.tsx) | TypeScript JSX | 22 | 0 | 2 | 24 |
| [frontend/src/routes/public.tsx](/frontend/src/routes/public.tsx) | TypeScript JSX | 38 | 0 | 5 | 43 |
| [frontend/src/services/AuthService.ts](/frontend/src/services/AuthService.ts) | TypeScript | 60 | 1 | 14 | 75 |
| [frontend/src/test/setup.ts](/frontend/src/test/setup.ts) | TypeScript | 1 | 0 | 0 | 1 |
| [frontend/src/types/User.ts](/frontend/src/types/User.ts) | TypeScript | 9 | 0 | 2 | 11 |
| [frontend/src/types/react-speech-recognition/index.d.ts](/frontend/src/types/react-speech-recognition/index.d.ts) | TypeScript | 38 | 4 | 7 | 49 |
| [frontend/src/types/types.ts](/frontend/src/types/types.ts) | TypeScript | 0 | 0 | 1 | 1 |
| [frontend/src/utils/base64ToBlob.ts](/frontend/src/utils/base64ToBlob.ts) | TypeScript | 16 | 0 | 2 | 18 |
| [frontend/src/utils/combineLangAndCountryCode.ts](/frontend/src/utils/combineLangAndCountryCode.ts) | TypeScript | 3 | 0 | 0 | 3 |
| [frontend/src/utils/formatGCTTSVoiceOptions.ts](/frontend/src/utils/formatGCTTSVoiceOptions.ts) | TypeScript | 27 | 0 | 7 | 34 |
| [frontend/src/utils/getAudioDuration.ts](/frontend/src/utils/getAudioDuration.ts) | TypeScript | 11 | 0 | 0 | 11 |
| [frontend/src/utils/getBase64FromBlob.ts](/frontend/src/utils/getBase64FromBlob.ts) | TypeScript | 9 | 0 | 0 | 9 |
| [frontend/src/utils/getErrorStatusMessage.ts](/frontend/src/utils/getErrorStatusMessage.ts) | TypeScript | 5 | 0 | 1 | 6 |
| [frontend/src/utils/getSampleRateFromBase64.ts](/frontend/src/utils/getSampleRateFromBase64.ts) | TypeScript | 17 | 0 | 4 | 21 |
| [frontend/src/vite-env.d.ts](/frontend/src/vite-env.d.ts) | TypeScript | 0 | 1 | 1 | 2 |
| [frontend/tailwind.config.js](/frontend/tailwind.config.js) | JavaScript | 79 | 1 | 0 | 80 |
| [frontend/tsconfig.json](/frontend/tsconfig.json) | JSON with Comments | 30 | 2 | 3 | 35 |
| [frontend/tsconfig.node.json](/frontend/tsconfig.node.json) | JSON | 10 | 0 | 1 | 11 |
| [frontend/vite.config.ts](/frontend/vite.config.ts) | TypeScript | 17 | 0 | 3 | 20 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)