using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Setting
{
    public class CreateSettingsDto
    {
        public string CefrLevel { get; set; } = string.Empty;
        public bool TtsEnabled { get; set; }
        public int ConversationId { get; set; }
    }
}