using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Google
{
    public class CreateTextToSpeechDto
    {
        public string Input { get; set; } = string.Empty;

        public VoiceData Voice { get; set; }

    }

    public class VoiceData
    {
        public string languageCode { get; set; } = string.Empty;

        public string name { get; set; } = string.Empty;

        public string ssmlGender { get; set; } = string.Empty;

    }
}