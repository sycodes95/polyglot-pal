using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Setting;
using api.Dtos.Settings;
using api.Models;

namespace api.Interface
{
    public interface ISettingsRepository
    {

        Task<Settings?> GetByConversationIdAsync(int conversationId, AppUser appUser);
        Task<Settings> CreateAsync(CreateSettingsDto createSettingsDto, AppUser appUser);

        Task<Settings?> UpdateAsync(int id, UpdateSettingsDto updateSettingsDto, AppUser appUser);

        Task<Settings?> DeleteAsync(int id, AppUser appUser);
    }
}