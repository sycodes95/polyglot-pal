import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event'
import TalkSetupOptions from '../talkSetupOptions';
import { vi } from 'vitest'
import { ClassNames } from '@emotion/react';
import { LanguageOption } from '../../../types';
import { PalVoiceData } from '../../../../../pages/talkWithPolyglot';

import { TalkSetupOptionsProps } from '../talkSetupOptions';

const setup = () => {

  const languageOptions: LanguageOption[] = [
    {
      languageCode: 'KR',
      countryCode: 'KR',
      voiceName: 'KR-Wavenet-female',
      languageName: 'Korean',
      ssmlGender: 'FEMALE'
    },
    {
      languageCode: 'EN',
      countryCode: 'USA',
      voiceName: 'USA-Wavenet-male',
      languageName: 'English',
      ssmlGender: 'MALE'
    },
  ];

  const palVoiceDataContext: TalkSetupOptionsProps['palVoiceDataContext'] = {
    palVoiceData: {
      element: null,
      messageIndex: -1,
      isLoading: false
    },
    setPalVoiceData: vi.fn()
  }

  const conversationContext: TalkSetupOptionsProps['conversationContext'] = {
    conversation: {
      messages: [],
      selectedLanguageData: null,
      cefrLevel: 'C2',
      ttsEnabled: true
    },
    setConversation: vi.fn()
  }
  render(<TalkSetupOptions
    className={''}
    languageOptions={languageOptions}
    palVoiceDataContext={palVoiceDataContext}
    conversationContext={conversationContext}
  />)

  return {
    palVoiceDataContext,
    conversationContext
  }

}

test('Language options populate the popover after popover is triggered', async ()=> {

  setup();
  
  const languageSelectButton = screen.getByTestId('language-select-button');

  await user.click(languageSelectButton);

  const languageOptionItems = screen.getAllByTestId('language-option-item');

  //Assert there are exactly 2 options when user clicks on language select
  expect(languageOptionItems).toHaveLength(2)

});


