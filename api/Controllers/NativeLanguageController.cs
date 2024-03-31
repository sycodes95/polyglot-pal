using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.NativeLanguage;
using api.Extensions;
using api.Interface;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/native-language")]
    public class NativeLanguageController : ControllerBase
    {
        private readonly INativeLanguageRepository _nativeLanguageRepo;
        private readonly UserManager<AppUser> _userManager;

        public NativeLanguageController(UserManager<AppUser> userManager, INativeLanguageRepository nativeLanguageRepo)
        {
            _nativeLanguageRepo = nativeLanguageRepo;
            _userManager = userManager; 
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetByUser()
        {
            var username = User.GetUsername();

            var appUser = await _userManager.FindByNameAsync(username);

            var nativeLanguage = await _nativeLanguageRepo.GetByUserAsync(appUser);

            if(nativeLanguage == null) return NotFound();

            return Ok(nativeLanguage.ToNativeLanguageDtoFromNativeLanguage());

        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateNativeLanguageDto createNativeLanguageDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var nativeLanguage = await _nativeLanguageRepo.GetByUserAsync(appUser);

            if(nativeLanguage != null) return BadRequest("Native language already exists for this user");

            var nativeLanguageModel = createNativeLanguageDto.ToNativeLanguageFromCreateDto(appUser);

            await _nativeLanguageRepo.CreateAsync(nativeLanguageModel);

            return Created(string.Empty, nativeLanguageModel.ToNativeLanguageDtoFromNativeLanguage());

        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] UpdateNativeLanguageRequestDto updateDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();

            var appUser = await _userManager.FindByNameAsync(username);

            var nativeLanguage = await _nativeLanguageRepo.UpdateAsync(updateDto, appUser);

            if(nativeLanguage == null) return BadRequest("Native language to update does not exist");

            return Ok(nativeLanguage.ToNativeLanguageDtoFromNativeLanguage());
        }
        
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete()
        {

            var username = User.GetUsername();

            var appUser = await _userManager.FindByNameAsync(username);

            var nativeLanguage = await _nativeLanguageRepo.DeleteAsync(appUser);

            if(nativeLanguage == null) return BadRequest("Native language to delete does not exist");

            return NoContent();
        }
    }
}