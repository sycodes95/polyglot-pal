using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Conversation;
using api.Interface;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ConversationRepository : IConversationRepository
    {
        private readonly ApplicationDBContext _context;
        public ConversationRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Conversation> CreateAsync(Conversation conversation)
        {
            await _context.Conversations.AddAsync(conversation);
            await _context.SaveChangesAsync();
            return conversation;
        }

        public async Task<Conversation?> GetByIdAsync(int id)
        {
            return await _context.Conversations
            .Include(c => c.Messages)
            .Include(c => c.ConversationLanguageData)
            .Include(c => c.ConversationOption)
            .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Conversation?> DeleteAsync(int id)
        {
            var conversation = await GetByIdAsync(id);

            if(conversation == null) return null;

            _context.Conversations.Remove(conversation);

            await _context.SaveChangesAsync();

            return conversation;
        }

    }
}