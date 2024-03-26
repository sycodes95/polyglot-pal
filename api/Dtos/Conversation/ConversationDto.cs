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
        public string AppUserId { get; set; }
        public List<Message> Messages { get; set; }
        public ConversationLanguageData ConversationLanguageData { get; set; }
        public ConversationOption ConversationOption { get; set; }
    }
}