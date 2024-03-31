using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Conversation;
using api.Dtos.NativeLanguage;
using api.Models;

namespace api.Mappers
{
    public static class NativeLanguageMappers
    {
        public static NativeLanguage ToNativeLanguageFromCreateDto(this CreateNativeLanguageDto createNativeLanguageDto, AppUser appUser)
        {
            return new NativeLanguage
            {
                LanguageName = createNativeLanguageDto.LanguageName,
                LanguageCode = createNativeLanguageDto.LanguageCode,
                AppUserId = appUser.Id

            };
        }

        public static NativeLanguageDto ToNativeLanguageDtoFromNativeLanguage(this NativeLanguage nativeLanguage)
        {
            return new NativeLanguageDto
            {
                Id = nativeLanguage.Id,
                LanguageName = nativeLanguage.LanguageName,
                LanguageCode = nativeLanguage.LanguageCode,

            };
        }
    }
}