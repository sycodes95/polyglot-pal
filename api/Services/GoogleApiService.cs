using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Threading.Tasks;
using api.Dtos.Google;
using api.Interface;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Speech.V1;
using Microsoft.Identity.Client.Platforms.Features.DesktopOs.Kerberos;
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

        public async Task<GoogleTTSVoices?> GetGoogleTTSVoicesAsync()
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://texttospeech.googleapis.com/v1/voices?key={_config["GoogleAPI:GC_API_KEY"]}");

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

        public async Task<string?> GetSpeechToTextAsync(CreateSpeechToTextDto createSTTDto)
        {
            //string base64Audio, string languageCode, int sampleRateHertz
            try
            {
                // var speechClient = await SpeechClient.CreateAsync();
                Console.WriteLine($"Credentials: {_config["GoogleCredentials"]}");

                var speechClient = new SpeechClientBuilder
                {
                    CredentialsPath = _config["GCServiceAccountPath"]
                }.Build();
    
                var recognitionConfig = new RecognitionConfig
                {
                    Encoding = RecognitionConfig.Types.AudioEncoding.Mp3,
                    SampleRateHertz = createSTTDto.sampleRateHertz,
                    LanguageCode = createSTTDto.languageCode
                };
    
                var audio = RecognitionAudio.FromBytes(Convert.FromBase64String(createSTTDto.base64Audio));
    
                var response = await speechClient.RecognizeAsync(recognitionConfig, audio);
    
                if(response.Results.Count < 1)
                {
                    return null;
                }
    
                return response.Results[0].Alternatives[0].Transcript;
                    
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error processing audio: {e.Message}");
                return null;
            }

        }



    }
}