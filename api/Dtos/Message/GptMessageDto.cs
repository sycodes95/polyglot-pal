using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Message
{
    public class GptMessageDto
    {
        public string Content { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}