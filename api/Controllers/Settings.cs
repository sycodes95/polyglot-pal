using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Setting;
using api.Extensions;
using api.Interface;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class Settings : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        private readonly ISettingsRepository _settingsRepository;

        public Settings(UserManager<AppUser> userManager, ISettingsRepository settingsRepository)
        {
            _userManager = userManager;
            _settingsRepository = settingsRepository;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateSettingsDto createSettingsDto)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var settings = await _settingsRepository.CreateAsync(createSettingsDto, appUser);

            return CreatedAtAction("Created language data", new { id = settings.Id}, settings.SettingsToSettingsDto());

        }
    }
}