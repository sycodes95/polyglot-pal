using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers;
using api.Dtos.Setting;
using api.Dtos.Settings;
using api.Models;

namespace api.Mappers
{
    public static class SettingsMappers
    {
        public static SettingsDto SettingsToSettingsDto(this api.Models.Settings settings)
        {
            return new SettingsDto
            {
                Id = settings.Id,
                CefrLevel = settings.CefrLevel,
                TtsEnabled = settings.TtsEnabled,
                ConversationId = settings.ConversationId,
            };
        }

    }
}