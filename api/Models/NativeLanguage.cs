using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class NativeLanguage
    {
        public int Id { get; set; }
        public string LanguageName { get; set; }
        public string LanguageCode { get; set; }
        //fk
        public string AppUserId { get; set; }
        //nav props
        public AppUser AppUser { get; set; }
    }
}