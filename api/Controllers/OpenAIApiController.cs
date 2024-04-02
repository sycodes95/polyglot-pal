using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.OpenAI;
using api.Interface;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/open-ai")]
    public class OpenAIApiController: ControllerBase
    {

        private readonly IOpenApiService _openApiService;
        
        public OpenAIApiController(IOpenApiService openApiService)
        {
            _openApiService = openApiService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateGPTResponse([FromBody] CreateGPTResponseDto createGPTResponseDto)
        {

            if(!ModelState.IsValid) return BadRequest(ModelState);
            
            var gptResponseContent = await _openApiService.CreateGPTResponseAsync(createGPTResponseDto);

            if(gptResponseContent == null) return BadRequest("Error getting response from open ai");

            return Created(string.Empty, gptResponseContent);

        }


    }
}