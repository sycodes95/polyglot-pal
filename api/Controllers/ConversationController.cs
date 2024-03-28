using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Conversation;
using api.Extensions;
using api.Interface;
using api.Mappers;
using api.Models;
using api.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/conversation")]
    [ApiController]
    public class ConversationController : ControllerBase
    {
        private readonly IConversationRepository _conversationRepo;

        private readonly UserManager<AppUser> _userManager;


        public ConversationController(
            IConversationRepository conversationRepo,
            UserManager<AppUser> userManager 
            )
        {
            _conversationRepo = conversationRepo;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var conversations = await _conversationRepo.GetAllAsync(appUser);

            
            return Ok(conversations);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {

            if(!ModelState.IsValid) return BadRequest(ModelState);

            var conversation = await _conversationRepo.GetByIdAsync(id);

            if(conversation == null) return NotFound("Conversation does not exist");

            return Ok(conversation);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create()
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if(appUser == null) return NotFound();
            var conversation = new Conversation
            {
                AppUserId = appUser.Id
            };

            await _conversationRepo.CreateAsync(conversation);

            return Ok();
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {

            if(!ModelState.IsValid) return BadRequest(ModelState);

            var conversationToDelete = await _conversationRepo.DeleteAsync(id);

            if(conversationToDelete == null) return NotFound("Conversation does not exist");

            return NoContent();
        }
    }
}