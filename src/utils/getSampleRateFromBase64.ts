export const getSampleRateFromBase64 = async (base64: string): Promise<number> => {
  try {
    const audioBuffer = atob(base64);
    const arrayBuffer = new ArrayBuffer(audioBuffer.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < audioBuffer.length; i++) {
      uint8Array[i] = audioBuffer.charCodeAt(i);
    }

    const AudioContextClass = window.AudioContext ;
    const audioContext = new AudioContextClass();
    const decodedData = await audioContext.decodeAudioData(arrayBuffer);
    console.log(decodedData);
    return decodedData.sampleRate;

  } catch (error) {
    console.error("Error decoding audio data", error);
    return 0
  }
}
