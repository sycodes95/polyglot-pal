using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Conversation;
using api.Models;

namespace api.Mappers
{
    public static class ConversationMappers
    {
        public static ConversationDto FromConversationToDto(this Conversation conversation)
        {
            return new ConversationDto
            {
                Id = conversation.Id,
                AppUserId = conversation.AppUserId,
            };

        }
    }
}