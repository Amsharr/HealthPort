using HealthPort.API.Data;
using HealthPort.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthPort.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : Controller
    {
        private readonly hpDbcontext _hpDbcontext;

        public AppointmentsController(hpDbcontext hpDbcontext)
        {
            _hpDbcontext = hpDbcontext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAppointments()
        {
            var appointments = await _hpDbcontext.Appointments.ToListAsync();

            return Ok(appointments);
        }

        [HttpPost]
        public async Task<IActionResult> AddAppointments([FromBody] Appointments appointmentRequest)
        {
            await _hpDbcontext.Appointments.AddAsync(appointmentRequest);
            await _hpDbcontext.SaveChangesAsync();

            return Ok(appointmentRequest);
        }
    }
}
