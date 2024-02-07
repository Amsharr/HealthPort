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
    }
}
