using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Google;

namespace api.Interface
{
    public interface IGoogleApiService
    {
        Task<GoogleTTSVoices?> GetGoogleTTSVoicesAsync();

        Task<string?> GetSpeechToTextAsync(CreateSpeechToTextDto createSTTDto);
        Task<string?> GetTextToSpeechAsync(CreateTextToSpeechDto createTextToSpeechDto);
        Task<string?> GetTranslationAsync(GetTranslationDto getTranslationDto);
    }
}