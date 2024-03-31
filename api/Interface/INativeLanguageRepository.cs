using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.NativeLanguage;
using api.Models;

namespace api.Interface
{
    public interface INativeLanguageRepository
    {
        Task<NativeLanguage> CreateAsync(NativeLanguage nativeLanguage);

        Task<NativeLanguage?> GetByUserAsync(AppUser appUser);

        Task<NativeLanguage?> UpdateAsync(UpdateNativeLanguageRequestDto updateDto, AppUser appUser);

        Task<NativeLanguage?> DeleteAsync(AppUser appUser);
    }
}