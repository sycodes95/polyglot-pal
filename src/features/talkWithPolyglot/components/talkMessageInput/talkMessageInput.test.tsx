import { render, screen, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event'
import TalkMessageInput from './talkMessageInput';
import { vi } from 'vitest'
test('user\'s message is sent after submitted from input', async () => {

  const className = ''
  
  const selectedLanguageData = {
    languageCode: 'KR',
    countryCode: 'KR',
    voiceName: 'Voice Name',
    languageName: 'Korean',
    ssmlGender: 'MALE',
  };
   
  const setInput = vi.fn()
  const handleMessageSend = vi.fn()
  const setUserVoiceBase64 = vi.fn()

  render(<TalkMessageInput 
    className={className}
    selectedLanguageData={selectedLanguageData}
    input=''
    setInput={setInput} 
    handleMessageSend={handleMessageSend}
    setUserVoiceBase64={setUserVoiceBase64}
  />)
	
  const input = screen.getByRole('textbox')
	const form = screen.getByRole('form')
  await user.type(input, 'Hello Noob');
  fireEvent.submit(form);

  //Assertion that user typed 10 characters
  expect(setInput).toHaveBeenCalledTimes(10);
	//Assertion that handleMessageSend function has been called
  expect(handleMessageSend).toHaveBeenCalled()
		
  

});