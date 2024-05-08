using HealthPort.API.Data;
using HealthPort.API.DTO;
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
        public async Task<IActionResult> GetAllNurses()
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

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> login([FromBody] Nurses loginRequest)
        {
            var nurse = await _hpDbcontext.Nurses.FirstOrDefaultAsync(d => d.username == loginRequest.username && d.password == loginRequest.password);

            if (nurse == null)
                return NotFound("Invalid username or password.");

            return Ok(nurse);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateNurse([FromBody] Nurses updateRequest)
        {

            if (updateRequest.id == 0)
            {
                return BadRequest("Invalid nurse ID");
            }

            var nurse = await _hpDbcontext.Nurses.FindAsync(updateRequest.id);

            if (nurse == null)
            {
                return NotFound();
            }


            nurse.id = updateRequest.id;
            nurse.firstName = updateRequest.firstName;
            nurse.lastName = updateRequest.lastName;
            nurse.dob = updateRequest.dob;
            nurse.nicNo = updateRequest.nicNo;
            nurse.mobileNo = updateRequest.mobileNo;
            nurse.email = updateRequest.email;
            nurse.address = updateRequest.address;
            nurse.username = updateRequest.username;
            nurse.password = updateRequest.password;

            await _hpDbcontext.SaveChangesAsync();

            return Ok(nurse);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteNurse(int id)
        {
            var nurse = await _hpDbcontext.Nurses.FindAsync(id);

            if (nurse == null)
                return NotFound("doctor not found.");

            _hpDbcontext.Nurses.Remove(nurse);
            await _hpDbcontext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [Route("search")]
        public async Task<IActionResult> SearchNurses([FromBody] SearchDto filter)
        {
            var query = _hpDbcontext.Nurses.AsQueryable();

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

            var nurses = await query.ToListAsync();

            return Ok(nurses);
        }

        [HttpGet]
        [Route("getPatients/{nurseId}")]
        public async Task<IActionResult> getPatientsByNurseId(int nurseId)
        {

            var patients = await (from appointment in _hpDbcontext.Appointments
                                  join nurse in _hpDbcontext.Nurses on appointment.doctorid equals nurse.doctorId
                                  join patient in _hpDbcontext.Patients on appointment.patientId equals patient.id
                                  where nurse.id == nurseId
                                  select patient).ToListAsync();

            return Ok(patients);
        }
    }
}
