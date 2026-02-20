using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public FoodController(IWebHostEnvironment env)
        {
            _env = env;
        }

        private List<FoodItem> ParseJsonFoodData()
        {
            var filePath = Path.Combine(_env.ContentRootPath, "Data", "food.json");
            var json = System.IO.File.ReadAllText(filePath);

            return JsonSerializer.Deserialize<List<FoodItem>>(json, new JsonSerializerOptions
            {
               PropertyNameCaseInsensitive = true 
            });
        }

        [HttpGet()]
        public IActionResult GetAllFood()
        {
            return Ok(ParseJsonFoodData());
        }

        [HttpGet("deadly")]
        public IActionResult GetDeadlyFood()
        {
            return Ok(ParseJsonFoodData().Where(food => food.Level == 2));
        }

        [HttpGet("dangerous")]
        public IActionResult GetDangerousFood()
        {
            return Ok(ParseJsonFoodData().Where(food => food.Level == 1));
        }
    }
}