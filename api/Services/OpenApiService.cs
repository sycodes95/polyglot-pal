using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using api.Dtos.OpenAI;
using api.Interface;
using Newtonsoft.Json;

namespace api.Services
{
    public class OpenApiService: IOpenApiService
    {
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;

        public OpenApiService(IConfiguration config, HttpClient httpClient)
        {
            _config = config;
            _httpClient = httpClient;
        }

        public async Task<string?> CreateGPTResponseAsync(CreateGPTResponseDto createGPTResponseDto)
        {

            try
            {

                var apiKey = _config["OpenAIApiKey"];

                var requestUri = "https://api.openai.com/v1/chat/completions";

                createGPTResponseDto.Messages.Add(new Message { role = "user", content = createGPTResponseDto.Input });

                var request = new
                {
                    messages = createGPTResponseDto.Messages,
                    model = "gpt-3.5-turbo",
                    temperature = 1,
                    max_tokens = 1000,
                    top_p = 1,
                    frequency_penalty = 0,
                    presence_penalty = 0,
                };

                var json = System.Text.Json.JsonSerializer.Serialize(request);

                var content = new StringContent(json, Encoding.UTF8, "application/json");

                _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", apiKey);

                var response = await _httpClient.PostAsync(requestUri, content);

                if(response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();

                    var gptResponses = JsonConvert.DeserializeObject<GPTResponseRequestDto>(responseString);

                    var assistantMessage = gptResponses?.choices[0].message.content;

                    if(assistantMessage == null) return null;

                    return assistantMessage;
                }

                return null;

            }
            catch (Exception e)
            {
                Console.WriteLine(e);

                return null;
                
            }

            
        }
    }
}