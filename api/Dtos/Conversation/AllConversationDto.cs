using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.LanguageData;
using api.Dtos.Message;
using api.Dtos.Settings;

namespace api.Dtos.Conversation
{
    public class AllConversationDto
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now; 
        public List<MessageDto> Messages { get; set; }
        public LanguageDataDto LanguageData { get; set; }
        public SettingsDto Settings { get; set; }
    }
}