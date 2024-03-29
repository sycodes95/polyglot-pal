using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Settings
    {
        public int Id { get; set; }
        public string CefrLevel { get; set; } = string.Empty;
        public bool TtsEnabled { get; set; }
        
        //fk
        public string AppUserId { get; set; }
        public int ConversationId { get; set; }

    }
}