using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Conversation
{
    public class ConversationDto
    {
        public int Id { get; set; }
        public List<Message> Messages { get; set; }

        //type workaround due to conflit with a namespace also called LanguageData
        public api.Models.LanguageData LanguageData { get; set; }
        public Settings Settings { get; set; }

    }
}