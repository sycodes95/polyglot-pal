using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.LanguageData;
using api.Interface;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{   
    [Route("api/language-data")]
    [ApiController]
    public class LanguageDataController : ControllerBase
    {
        private readonly ILanguageDataRepository _languageDataRepo;
        private readonly UserManager<AppUser> _userManager;

        public LanguageDataController(
            ILanguageDataRepository languageDataRepo,
            UserManager<AppUser> userManager
            )
        {
            _languageDataRepo = languageDataRepo;
            _userManager = userManager;
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            var languageData = await _languageDataRepo.GetByIdAsync(id);
            if(languageData == null) return NotFound("Language Data Not Found");
            return Ok(languageData);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(CreateLanguageDataDto createLanguageDataDto)
        {
            var languageData = createLanguageDataDto.ToLanguageDataFromCreateDTO();
            await _languageDataRepo.CreateAsync(createLanguageDataDto.ToLanguageDataFromCreateDTO());
            return CreatedAtAction(nameof(GetById), new { id = languageData.Id}, languageData);
        } 

        [HttpPut]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateLanguageDataRequestDto updateLanguageDataRequestDto )
        {

            if(!ModelState.IsValid) return BadRequest(ModelState);

            var languageDataModel = await _languageDataRepo.UpdateAsync(id, updateLanguageDataRequestDto);

            if(languageDataModel == null) return NotFound("Language data to update was not found by id");

            return Ok(languageDataModel);
        } 

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {

            if(!ModelState.IsValid) return BadRequest(ModelState);

            var languageData = await _languageDataRepo.GetByIdAsync(id);

            if(languageData == null) return NotFound("Language data not found");

            await _languageDataRepo.DeleteAsync(languageData);

            return NoContent();
            
        } 

        


    }
}