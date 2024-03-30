using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.LanguageData;
using api.Dtos.Message;
using api.Dtos.Settings;
using api.Models;

namespace api.Dtos.Conversation
{
    public class ConversationDto
    {
        public int Id { get; set; }
        // public string AppUserId { get; set; }

        //type workaround due to conflict with a namespace also called languageData
        public List<MessageDto> Messages { get; set; }
        public LanguageDataDto LanguageData { get; set; }
        public SettingsDto Settings { get; set; }

    }
}

