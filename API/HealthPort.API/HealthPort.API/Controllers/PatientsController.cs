using HealthPort.API.Data;
using HealthPort.API.DTO;
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

            foreach (var patient in patients)
            {
                patient.fullName = $"{patient.firstName} {patient.lastName}";
            }

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

            patient.fullName = $"{patient.firstName} {patient.lastName}";

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
            patient.bloodtype = updateRequest.bloodtype;
            patient.gender = updateRequest.gender;
            patient.height = updateRequest.height;
            patient.weigth = updateRequest.weigth;
            patient.nationality = updateRequest.nationality;    


            await _hpDbcontext.SaveChangesAsync();

            return Ok(patient); 
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _hpDbcontext.Patients.FindAsync(id);

            if (patient == null)
                return NotFound("Patient not found.");

            _hpDbcontext.Patients.Remove(patient);
            await _hpDbcontext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [Route("search")]
        public async Task<IActionResult> SearchDoctors([FromBody] SearchDto filter)
        {
            var query = _hpDbcontext.Patients.AsQueryable();

            if (filter.id.HasValue)
            {
                query = query.Where(d => d.id == filter.id);
            }
            if (!string.IsNullOrEmpty(filter.firstName))
            {
                query = query.Where(d => d.firstName.Contains(filter.firstName));
            }
            if (!string.IsNullOrEmpty(filter.lastName))
            {
                query = query.Where(d => d.lastName.Contains(filter.lastName));
            }
            if (!string.IsNullOrEmpty(filter.nicNo))
            {
                query = query.Where(d => d.nicNo == filter.nicNo);
            }
            if (!string.IsNullOrEmpty(filter.mobileNo))
            {
                query = query.Where(d => d.mobileNo == filter.mobileNo);
            }
            if (!string.IsNullOrEmpty(filter.email))
            {
                query = query.Where(d => d.email == filter.email);
            }
            if (!string.IsNullOrEmpty(filter.username))
            {
                query = query.Where(d => d.username == filter.username);
            }

            var patients = await query.ToListAsync();

            return Ok(patients);
        }

        [HttpGet]
        [Route("getPatientsByDid")]
        public async Task<IActionResult> getPatientsByDoctorId(int doctorId)
        {
            var appointments = await _hpDbcontext.Appointments.Where(x => x.doctorid == doctorId).ToListAsync();

            List<Patients> patients = new List<Patients>();

            foreach (var appointment in appointments)
            {
                patients = _hpDbcontext.Patients.Where(x => x.id == appointment.patientId).ToList();
            }

            return Ok(patients);
        }

        [HttpGet]
        [Route("byId/{patientId}")]
        public async Task<IActionResult> GetAllPatientById(int patientId)
        {
            var patients = await _hpDbcontext.Patients.Where(x => x.id == patientId).ToListAsync();

            foreach (var patient in patients)
            {
                patient.fullName = $"{patient.firstName} {patient.lastName}";
            }

            return Ok(patients);
        }

    }
}
