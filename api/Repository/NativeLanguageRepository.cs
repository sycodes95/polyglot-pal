using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.NativeLanguage;
using api.Interface;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class NativeLanguageRepository: INativeLanguageRepository
    {
        private readonly ApplicationDBContext _context;
        public NativeLanguageRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<NativeLanguage?> GetByUserAsync(AppUser appUser)
        {
            var nativeLanguage = await _context.NativeLanguages.FirstOrDefaultAsync(x => x.AppUserId == appUser.Id);
            if(nativeLanguage == null) return null;
            return nativeLanguage;
        }

        public async Task<NativeLanguage> CreateAsync(NativeLanguage nativeLanguage)
        {

            await _context.NativeLanguages.AddAsync(nativeLanguage);
            await _context.SaveChangesAsync();
            return nativeLanguage;
        }

        public async Task<NativeLanguage?> UpdateAsync(UpdateNativeLanguageRequestDto updateDto, AppUser appUser)
        {
            var nativeLanguage = await GetByUserAsync(appUser);

            if(nativeLanguage == null) return null;
            
            nativeLanguage.LanguageName = updateDto.LanguageName;
            nativeLanguage.LanguageCode = updateDto.LanguageCode;

            await _context.SaveChangesAsync();

            return nativeLanguage;
        }

        public async Task<NativeLanguage?> DeleteAsync(AppUser appUser)
        {
            var nativeLanguage = await GetByUserAsync(appUser);

            if(nativeLanguage == null) return null;

            _context.NativeLanguages.Remove(nativeLanguage);

            await _context.SaveChangesAsync();

            return nativeLanguage;
        }


    }
}