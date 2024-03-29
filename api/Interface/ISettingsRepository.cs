using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Setting;
using api.Models;

namespace api.Interface
{
    public interface ISettingsRepository
    {
        Task<Settings> CreateAsync(CreateSettingsDto createSettingsDto, AppUser appUser);
    }
}