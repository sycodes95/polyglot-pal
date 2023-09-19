export const getAudioDuration = (base64) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(`data:audio/wav;base64,${base64}`);
    audio.onloadedmetadata = () => {
      resolve(audio.duration);
    };
    audio.onerror = (e) => {
      reject("Failed to load audio");
    };
  });
}