using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.LanguageData;
using api.Models;

namespace api.Mappers
{
    public static class LanguageDataMappers
    {
        public static LanguageData ToLanguageDataFromCreateDTO(this CreateLanguageDataDto languageDataDto)
        {
            return new LanguageData
            {
                LanguageCode = languageDataDto.LanguageCode,
                CountryCode = languageDataDto.CountryCode,
                VoiceName = languageDataDto.VoiceName,
                LanguageName = languageDataDto.LanguageName,
                SsmlGender = languageDataDto.SsmlGender,
                ConversationId = languageDataDto.ConversationId

            };
        }

        public static LanguageDataDto ToLanguageDataDtoFromLanguageData(this LanguageData languageData)
        {
            return new LanguageDataDto
            {
                Id = languageData.Id,
                LanguageCode = languageData.LanguageCode,
                CountryCode = languageData.CountryCode,
                VoiceName = languageData.VoiceName,
                LanguageName = languageData.LanguageName,
                SsmlGender = languageData.SsmlGender,
                ConversationId = languageData.ConversationId

            };
        }
    }
}