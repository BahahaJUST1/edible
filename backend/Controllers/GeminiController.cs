using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeminiController : ControllerBase
    {
        private readonly GeminiService _geminiService;

        public GeminiController(GeminiService geminiService)
        {
            _geminiService = geminiService;
        }

        [HttpPost("question")]
        public async Task<IActionResult> AskQuestion([FromBody] AnalyzeRequest request)
        {
            var answer = await _geminiService.AskQuestionAsync(request.Prompt);
            // create an anonymous object to return the answer (ex: { "answer": "The answer to your question is..." })
            return Ok(new { Answer = answer });
        }

        [HttpPost("analyze-image")]
        public async Task<IActionResult> AnalyzeImage([FromBody] AnalyzeRequest request)
        {
            Console.WriteLine("Received image analysis request with prompt: " + request);
            var result = await _geminiService.AnalyzeImageAsync(request.Base64Image, request.Prompt);
            // create an anonymous object to return the result (ex: { "result": "The analysis of the image is..." })
            return Ok(new { Result = result });
        }
    }

    // the body sent from the front to the back, it contains the base64 image and the prompt for the question
    public class AnalyzeRequest
    {
        public string Base64Image { get; set; } = string.Empty;
        public string Prompt { get; set; } = string.Empty;
    }
}