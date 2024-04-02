using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.OpenAI;

namespace api.Interface
{
    public interface IOpenApiService
    {
        Task<string?> CreateGPTResponseAsync(CreateGPTResponseDto createGPTResponseDto);
    }
}