using HealthPort.API.Data;
using HealthPort.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthPort.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorsController : Controller
    {
        private readonly hpDbcontext _hpDbcontext;

        public DoctorsController(hpDbcontext hpDbcontext) 
        {
            _hpDbcontext = hpDbcontext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDoctors()
        {
            var doctors = await _hpDbcontext.Doctors.ToListAsync();

            return Ok(doctors);
        }

        [HttpPost]
        public async Task<IActionResult> AddDoctor([FromBody] Doctors doctorsRequest)
        {
            await _hpDbcontext.Doctors.AddAsync(doctorsRequest);
            await _hpDbcontext.SaveChangesAsync();

            return Ok(doctorsRequest);
        }
    }
}
