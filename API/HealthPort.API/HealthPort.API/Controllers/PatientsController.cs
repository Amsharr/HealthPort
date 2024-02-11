using HealthPort.API.Data;
using HealthPort.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthPort.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : Controller
    {
        private readonly hpDbcontext _hpDbcontext;

        public PatientsController(hpDbcontext hpDbcontext)
        {
            _hpDbcontext = hpDbcontext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPatients()
        {
          var patients = await _hpDbcontext.Patients.ToListAsync();

          return Ok(patients);
        }

        [HttpPost]
        public async Task<IActionResult> AddPatient([FromBody] Patients patientRequest)
        {
            await _hpDbcontext.Patients.AddAsync(patientRequest);
            await _hpDbcontext.SaveChangesAsync();

            return Ok(patientRequest);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> login([FromBody] patLogin loginRequest)
        {
            var patient = await _hpDbcontext.Patients
                .FirstOrDefaultAsync(p => p.username == loginRequest.username && p.password == loginRequest.password);

            if (patient == null)
                return NotFound("Invalid username or password.");

            return Ok(patient);
        }

    }
}
