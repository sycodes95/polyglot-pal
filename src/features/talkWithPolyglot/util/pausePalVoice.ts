import { PalVoiceData } from "../../../pages/talkWithPolyglot"

export const pausePalVoice = (palVoiceData: PalVoiceData ) => {
  palVoiceData.element?.pause()
}