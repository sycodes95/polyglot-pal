using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Google
{
    public class CreateSpeechToTextDto
    {
        public string base64Audio { get; set; } = string.Empty;

        public string languageCode { get; set; } = string.Empty;

        public int sampleRateHertz { get; set; }

    }
}