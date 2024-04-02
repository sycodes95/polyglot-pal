using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Google
{
    public class GetTranslationDto
    {
        public string text { get; set; } = string.Empty;
        public string targetLanguage { get; set; } = string.Empty;
    }
}