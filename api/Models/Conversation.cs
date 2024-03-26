using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Conversation
    {
        public int Id { get; set; } 
        //fk
        public string AppUserId { get; set; }
        //nav props
        public AppUser AppUser { get; set; }
        public List<Message> Messages { get; set; }
        public ConversationOption ConversationOption { get; set; }
        public ConversationLanguageData ConversationLanguageData { get; set; }
    }
}