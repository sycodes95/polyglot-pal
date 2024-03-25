using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ConversationOption
    {
        public int Id { get; set; }
        public string CeftLevel { get; set; }
        public bool TtsEnabled { get; set; }
        
        //fk
        public int ConversationId { get; set; }

    }
}