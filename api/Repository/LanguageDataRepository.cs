using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.LanguageData;
using api.Interface;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{

    public class LanguageDataRepository : ILanguageDataRepository
    {
        // public async Task<> CreateAsync(LanguageData)
        // {
        //     return NotImplementedException();
        // }
        private readonly ApplicationDBContext _context;

        public LanguageDataRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<LanguageData> CreateAsync(LanguageData languageData)
        {
            await _context.LanguageDatas.AddAsync(languageData);
            await _context.SaveChangesAsync();

            return languageData;
        }

        public async Task<LanguageData?> GetByIdAsync(int id)
        {
            return await _context.LanguageDatas.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<LanguageData?> UpdateAsync(int id, UpdateLanguageDataRequestDto languageDataRequestDto)
        {

            var existingLanguageData = await _context.LanguageDatas.FirstOrDefaultAsync(x => x.Id == id);

            if(existingLanguageData == null) return null;

            existingLanguageData.LanguageCode = languageDataRequestDto.LanguageCode;
            existingLanguageData.CountryCode = languageDataRequestDto.CountryCode;
            existingLanguageData.VoiceName = languageDataRequestDto.VoiceName;
            existingLanguageData.LanguageName = languageDataRequestDto.LanguageName;
            existingLanguageData.SsmlGender = languageDataRequestDto.SsmlGender;

            await _context.SaveChangesAsync();
            
            return existingLanguageData; 
        }

        public async Task<LanguageData> DeleteAsync(LanguageData languageData)
        {
            _context.LanguageDatas.Remove(languageData);
            await _context.SaveChangesAsync();
            return languageData;
        }
    }
}