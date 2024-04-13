export const getLangNameFromCode = (langCode: string) => {
  const [language, country] = langCode.split("-");
  if(country) {
    return language.toLowerCase();
  } 
  return null;
};