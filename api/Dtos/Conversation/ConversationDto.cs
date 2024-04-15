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
        public DateTime CreatedAt { get; set; } = DateTime.Now; 

        // public string AppUserId { get; set; }

        //type workaround due to conflict with a namespace also called languageData
        
    }
}

