using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.LanguageData;
using api.Models;

namespace api.Interface
{
    public interface ILanguageDataRepository
    {
        // Task<LanguageData> CreateAsync()

        Task<LanguageData> CreateAsync(LanguageData languageData);

        Task<LanguageData?> GetByIdAsync(int id);

        Task<LanguageData?> UpdateAsync(int id, UpdateLanguageDataRequestDto languageDataRequestDto);

        Task<LanguageData> DeleteAsync(LanguageData languageData);

    }
}