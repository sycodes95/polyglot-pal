using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.LanguageData
{
    public class LanguageDataDto
    {
        public int Id { get; set; }
        public string LanguageName { get; set; } = string.Empty;
        public string LanguageCode { get; set; } = string.Empty;
        public string CountryCode { get; set; } = string.Empty;
        public string VoiceName { get; set; } = string.Empty;
        public string SsmlGender { get; set; } = string.Empty;
        public int ConversationId { get; set; }
    }
}