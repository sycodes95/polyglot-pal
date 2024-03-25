using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Role { get; set; }
        
        //fk
        public int ConversationId { get; set; }
    }
}