using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.OpenAI
{
    public class CreateGPTResponseDto
    {
        public List<Message> Messages { get; set; }

        public string Input { get; set; } = string.Empty;
    }

    public class Message
    {
        public string role { get; set; } = string.Empty;

        public string content { get; set; } = string.Empty;
    }
}