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

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> login([FromBody] Doctors loginRequest)
        {
            var doctor = await _hpDbcontext.Doctors
                .FirstOrDefaultAsync(d => d.username == loginRequest.username && d.password == loginRequest.password);

            if (doctor == null)
                return NotFound("Invalid username or password.");

            return Ok(doctor);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateDoctor([FromBody] Doctors updateRequest)
        {

            if (updateRequest.id == 0)
            {
                return BadRequest("Invalid doctor ID");
            }

            var doctor = await _hpDbcontext.Doctors.FindAsync(updateRequest.id);

            if (doctor == null)
            {
                return NotFound();
            }


            doctor.id = updateRequest.id;
            doctor.firstName = updateRequest.firstName;
            doctor.lastName = updateRequest.lastName;
            doctor.specialityid = updateRequest.specialityid;
            doctor.dob = updateRequest.dob;
            doctor.nicNo = updateRequest.nicNo;
            doctor.mobileNo = updateRequest.mobileNo;
            doctor.email = updateRequest.email;
            doctor.address = updateRequest.address;
            doctor.username = updateRequest.username;
            doctor.password = updateRequest.password;

            await _hpDbcontext.SaveChangesAsync();

            return Ok(doctor);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _hpDbcontext.Doctors.FindAsync(id);

            if (doctor == null)
                return NotFound("doctor not found.");

            _hpDbcontext.Doctors.Remove(doctor);
            await _hpDbcontext.SaveChangesAsync();

            return Ok();
        }
    }
}
