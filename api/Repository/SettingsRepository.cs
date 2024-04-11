using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Setting;
using api.Dtos.Settings;
using api.Interface;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class SettingsRepository : ISettingsRepository
    {
        private readonly ApplicationDBContext _context;
        public SettingsRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Settings?> GetByConversationIdAsync(int conversationId, AppUser appUser)
        {
            var settings = await _context.Settings.FirstOrDefaultAsync(x => x.ConversationId == conversationId && x.AppUserId == appUser.Id);

            if(settings == null) return null;

            return settings;
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

        public async Task<Settings?> UpdateAsync(int id, UpdateSettingsDto updateSettingsDto, AppUser appUser)
        {
            var settings = _context.Settings.FirstOrDefault(x => x.Id == id && x.AppUserId == appUser.Id);

            if(settings == null) return null;
            settings.CefrLevel = updateSettingsDto.CefrLevel;
            settings.TtsEnabled = updateSettingsDto.TtsEnabled;

            await _context.SaveChangesAsync();

            return settings;

        }

        public async Task<Settings?> DeleteAsync(int id, AppUser appUser)
        {
            var settings = _context.Settings.FirstOrDefault(x => x.Id == id && x.AppUserId == appUser.Id);

            if(settings == null) return null;
            _context.Settings.Remove(settings);

            await _context.SaveChangesAsync();

            return settings;
        }

    }
}