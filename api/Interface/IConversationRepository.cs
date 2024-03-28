using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Conversation;
using api.Models;

namespace api.Interface
{
    public interface IConversationRepository
    {
        Task<Conversation> CreateAsync(Conversation conversation);

        Task<Conversation?> GetByIdAsync(int id);

        Task<Conversation?> DeleteAsync(int id);

        Task<List<Conversation>> GetAllAsync(AppUser appUser);
    }
}