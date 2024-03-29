using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Setting;
using api.Interface;
using api.Models;

namespace api.Repository
{
    public class SettingRepository : ISettingsRepository
    {
        private readonly ApplicationDBContext _context;
        public SettingRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Settings> CreateAsync(CreateSettingsDto createSettingsDto, AppUser appUser) 
        {
            var settings = new Settings
            {
                CefrLevel = createSettingsDto.CefrLevel,
                TtsEnabled = createSettingsDto.TtsEnabled,
                ConversationId = createSettingsDto.ConversationId,
                AppUserId = appUser.Id
            };

            await _context.Settings.AddAsync(settings);
            await _context.SaveChangesAsync();

            return settings;
        }
    }
}