using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Message;
using api.Models;

namespace api.Interface
{
    public interface IMessageRepository
    {
        Task<Message> CreateMessageAsync(CreateMessageDto createMessageDto, AppUser appUser);

        Task<Message?> UpdateMessageAsync(int id, AppUser appUser, UpdateMessageRequestDto updateMessageDto);

        Task<Message?> DeleteMessageAsync(int id, AppUser appUser);
    }
}