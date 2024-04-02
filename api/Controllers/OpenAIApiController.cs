using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/open-ai")]
    public class OpenAIApiController: ControllerBase
    {
        
        public OpenAIApiController()
        {

        }

        [HttpPost]
        public async Task<IActionResult> CreateGPTResponse()
        {
            
        }


    }
}