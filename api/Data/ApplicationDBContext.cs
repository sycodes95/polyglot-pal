using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {   
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
        }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<LanguageData> LanguageDatas { get; set; }
        public DbSet<Settings> Settings { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<NativeLanguage> NativeLanguages { get; set; }
    }
}