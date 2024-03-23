using HealthPort.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthPort.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpecialitiesController : Controller
    {
        private readonly hpDbcontext _hpDbcontext;

        public SpecialitiesController(hpDbcontext hpDbcontext)
        {
            _hpDbcontext = hpDbcontext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSpecialites()
        {
            var specialites = await _hpDbcontext.Specialites.ToListAsync();

            return Ok(specialites);
        }
    }
}
