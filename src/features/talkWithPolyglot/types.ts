export type Message = {
  content: string;
  role: string;
}

export type Voice = {
  languageCodes: string[] 
  name: string,
  ssmlGender: string,
  naturalSampleRateHertz: number
}