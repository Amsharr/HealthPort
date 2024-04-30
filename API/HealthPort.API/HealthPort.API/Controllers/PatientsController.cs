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
        public async Task<IActionResult> login([FromBody] Patients loginRequest)
        {
            var patient = await _hpDbcontext.Patients
                .FirstOrDefaultAsync(p => p.username == loginRequest.username && p.password == loginRequest.password);

            if (patient == null)
                return NotFound("Invalid username or password.");

            return Ok(patient);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdatePatient([FromBody] Patients updateRequest)
        {
            
            if (updateRequest.id == 0)
            {
                return BadRequest("Invalid patient ID");
            }

            var patient = await _hpDbcontext.Patients.FindAsync(updateRequest.id);

            if (patient == null)
            {
                return NotFound();
            }


            patient.id = updateRequest.id;
            patient.firstName = updateRequest.firstName;
            patient.lastName = updateRequest.lastName;
            patient.dob = updateRequest.dob;
            patient.nicNo = updateRequest.nicNo;
            patient.mobileNo = updateRequest.mobileNo;
            patient.email = updateRequest.email;
            patient.address = updateRequest.address;
            patient.username = updateRequest.username;
            patient.password = updateRequest.password;

            await _hpDbcontext.SaveChangesAsync();

            return Ok(patient); 
        }


    }
}
