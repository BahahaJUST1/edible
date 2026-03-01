using Google.GenAI;

namespace Backend.Services
{
    public class GeminiService
    {
        private readonly string _apiKey;

        public GeminiService(IConfiguration config)
        {
            _apiKey = config["GEMINI_API_KEY"]!;
        }

        // format of the Gemini response :
        /*
            {
                "candidates": [{
                    "content": {
                        "parts": [{
                            "text": "The response to the prompt is here"
                        }]
                    }
                }]
            }
        */

        public async Task<string?> AskQuestionAsync(string question)
        {
            var client = new Client(apiKey: _apiKey);
            var response = await client.Models.GenerateContentAsync(
                model: "gemini-2.5-flash-lite",
                contents: question
            );

            return response?.Candidates?[0]?.Content?.Parts?[0].Text;
        }

        public async Task<string> AnalyzeImageAsync(string base64Image, string prompt)
        {
            return "...";
        }
    }
}
