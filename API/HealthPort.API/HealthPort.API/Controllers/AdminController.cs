using HealthPort.API.Data;
using HealthPort.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthPort.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private readonly hpDbcontext _hpDbcontext;
        public AdminController(hpDbcontext hpDbcontext)
        {
            _hpDbcontext = hpDbcontext;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> login([FromBody] Admin loginRequest)
        {
            var admin = await _hpDbcontext.Admin
                .FirstOrDefaultAsync(a => a.username == loginRequest.username && a.password == loginRequest.password);

            if (admin == null)
                return NotFound("Invalid username or password.");

            return Ok(admin);
        }
    }
}
