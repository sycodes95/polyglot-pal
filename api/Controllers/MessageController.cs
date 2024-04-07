using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Message;
using api.Extensions;
using api.Interface;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/message")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMessageRepository _messageRepo;
        public MessageController(UserManager<AppUser> userManager, IMessageRepository messageRepo)
        {
            _userManager = userManager;
            _messageRepo = messageRepo;
        }

        [HttpGet("{conversationId:int}")]
        [Authorize]
        public async Task<IActionResult> GetMessagesByConversationId([FromRoute] int conversationId)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var messages = await _messageRepo.GetMessagesByConversationIdAsync(conversationId, appUser);

            if(messages == null) return StatusCode(404, "Messages not found");

            var messagesDto = messages.Select(m => m.MessageToMessageDto()).ToList();
            return Ok(messages);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateMessageDto createMessageDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var message = await _messageRepo.CreateMessageAsync(createMessageDto, appUser);

            return Ok(message);
            
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateMessageRequestDto updateMessageDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var message = await _messageRepo.UpdateMessageAsync(id, appUser, updateMessageDto);

            if(message == null) return NotFound("Message to update was not found");
            return Ok(message);
            
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            var message = await _messageRepo.DeleteMessageAsync(id, appUser);

            if(message == null) return NotFound("Message not found");

            return NoContent();
        }   




    }
}