using HealthPort.API.Data;
using HealthPort.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthPort.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NursesController : Controller
    {
        private readonly hpDbcontext _hpDbcontext;

        public NursesController(hpDbcontext hpDbcontext)
        {
            _hpDbcontext = hpDbcontext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDoctors()
        {
            var nurses = await _hpDbcontext.Nurses.ToListAsync();

            return Ok(nurses);
        }

        [HttpPost]
        public async Task<IActionResult> AddNurse([FromBody] Nurses nursesRequest)
        {
            await _hpDbcontext.Nurses.AddAsync(nursesRequest);
            await _hpDbcontext.SaveChangesAsync();

            return Ok(nursesRequest);
        }
    }
}
