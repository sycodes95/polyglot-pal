using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Threading.Tasks;
using api.Dtos.Google;
using api.Interface;
using Newtonsoft.Json;


namespace api.Services
{
    public class GoogleApiService : IGoogleApiService
    {
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;

        public GoogleApiService(IConfiguration config, HttpClient httpClient)
        {
            _config = config;
            _httpClient = httpClient;
        }

        public async Task<GoogleTTSVoices?> GetGoogleTTSVoices()
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://texttospeech.googleapis.com/v1/voices?key={_config["GC_API_KEY"]}");

                if(result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();

                    var voices = JsonConvert.DeserializeObject<GoogleTTSVoices>(content);

                    return voices;
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