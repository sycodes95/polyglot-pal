using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ConversationLanguageData
    {
        public int Id { get; set; }
        public string LanguageCode { get; set; }
        public string CountryCode { get; set; }
        public string VoiceName { get; set; }
        public string LanguageName { get; set; }
        public string SsmlGender { get; set; }

        // fk
        public int ConversationId { get; set; }

    }
}