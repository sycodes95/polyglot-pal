using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.LanguageData
{
    public class UpdateLanguageDataRequestDto
    {
        public string LanguageCode { get; set; } = string.Empty;
        public string CountryCode { get; set; } = string.Empty;
        public string VoiceName { get; set; } = string.Empty;
        public string LanguageName { get; set; } = string.Empty;
        public string SsmlGender { get; set; } = string.Empty;

    }
}