export const blobToBase64 = (blob: Blob, callback: (base64: string) => void): void => {
  const reader = new FileReader();
  reader.onload = function() {
    const dataUrl = reader.result as string;
    const base64 = dataUrl.split(',')[1];
    callback(base64);
  };
  reader.readAsDataURL(blob);
}