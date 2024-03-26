using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.LanguageData
{
    public class UpdateLanguageDataRequestDto
    {
        public string LanguageCode { get; set; }
        public string CountryCode { get; set; }
        public string VoiceName { get; set; }
        public string LanguageName { get; set; }
        public string SsmlGender { get; set; }

    }
}