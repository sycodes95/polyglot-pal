using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Message;
using api.Interface;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class MessageRepository : IMessageRepository
    {

        private readonly ApplicationDBContext _context;
        public MessageRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        
        public async Task<Message> CreateMessageAsync(CreateMessageDto createMessageDto, AppUser appUser)
        {
            var message = createMessageDto.CreateMessageDtoToMessage();

            message.AppUserId = appUser.Id;

            await _context.Messages.AddAsync(message);

            await _context.SaveChangesAsync();

            return message;

        }

        public async Task<Message?> UpdateMessageAsync(int id, AppUser appUser, UpdateMessageRequestDto updateMessageDto)
        {
            var message = await _context.Messages.FirstOrDefaultAsync(x => x.Id == id && x.AppUserId == appUser.Id);

            if(message == null) return null;

            message.Role = updateMessageDto.Role;
            message.Content = updateMessageDto.Content;

            await _context.SaveChangesAsync();

            return message;

        }

        public async Task<Message?> DeleteMessageAsync(int id, AppUser appUser)
        {
            var message = await _context.Messages.FirstOrDefaultAsync(x => x.Id == id && x.AppUserId == appUser.Id);

            if(message == null) return null;

            _context.Messages.Remove(message);

            await _context.SaveChangesAsync();

            return message;
            
        }

        


    }
}