using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Google;
using api.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/google-api")]
    public class GoogleApiController : ControllerBase
    {
        private readonly IGoogleApiService _googleApiService;
        public GoogleApiController(IGoogleApiService googleApiService)
        {
            _googleApiService = googleApiService;
        }

        [HttpGet("voice-data")]
        public async Task<IActionResult> GetVoiceData()
        {
            var voices = await _googleApiService.GetGoogleTTSVoicesAsync();

            if(voices == null) return BadRequest("Error getting TTS voices from google");

            return Ok(voices);
        }

        [HttpPost("speech-to-text")]
        public async Task<IActionResult> CreateSpeechToText([FromBody] CreateSpeechToTextDto createSpeechToTextDto)
        {
            var transcript = await _googleApiService.GetSpeechToTextAsync(createSpeechToTextDto);

            if(transcript == null) return BadRequest("Error creating transcript from audio");

            return Ok(transcript);


        }

        [HttpPost("text-to-speech")]
        public async Task<IActionResult> CreateTextToSpeech([FromBody] CreateTextToSpeechDto createTextToSpeechDto)
        {   
            var base64Audio = await _googleApiService.GetTextToSpeechAsync(createTextToSpeechDto);

            if(base64Audio == null) return BadRequest("Error converting text to speech");

            return Ok(base64Audio);

        }

    }
}