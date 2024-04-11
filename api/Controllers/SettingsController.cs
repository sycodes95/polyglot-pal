using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Setting;
using api.Dtos.Settings;
using api.Extensions;
using api.Interface;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/settings")]
    [ApiController]
    public class Settings : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        private readonly ISettingsRepository _settingsRepository;

        public Settings(UserManager<AppUser> userManager, ISettingsRepository settingsRepository)
        {
            _userManager = userManager;
            _settingsRepository = settingsRepository;
        }

        [HttpGet("{conversationId:int}")]
        [Authorize]
        public async Task<IActionResult> GetByConversationId(int conversationId)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var settings = await _settingsRepository.GetByConversationIdAsync(conversationId, appUser);

            if(settings == null) return StatusCode(404, "Settings not found");

            return Ok(settings.SettingsToSettingsDto());
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateSettingsDto createSettingsDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var settings = await _settingsRepository.CreateAsync(createSettingsDto, appUser);

            // return CreatedAtAction("Created language data", new { id = settings.Id }, settings.SettingsToSettingsDto());
            
            return Ok(settings.SettingsToSettingsDto());
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateSettingsDto updateSettingsDto )
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var settings = await _settingsRepository.UpdateAsync(id, updateSettingsDto, appUser);

            if(settings == null) return NotFound();

            return Ok(settings.SettingsToSettingsDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var settings = await _settingsRepository.DeleteAsync(id, appUser);

            if(settings == null) return NotFound("Settings to delete not found");

            return NoContent();
        }
    }
}