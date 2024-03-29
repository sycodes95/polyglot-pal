using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Conversation;
using api.Dtos.Message;
using api.Models;

namespace api.Mappers
{
    public static class MessageMappers
    {
        public static Message CreateMessageDtoToMessage(this CreateMessageDto createMessageDto)
        {
            return new Message
            {
                Content = createMessageDto.Content,
                Role = createMessageDto.Role,
                ConversationId = createMessageDto.ConversationId
            };
        }

    }
}