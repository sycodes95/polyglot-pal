using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Message
{
    public class CreateMessageDto
    {
        public string Content { get; set; }
        public string Role { get; set; }
        //fk
        public int ConversationId { get; set; }
    }
}