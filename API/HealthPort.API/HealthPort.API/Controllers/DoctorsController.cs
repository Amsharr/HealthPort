using HealthPort.API.Data;
using HealthPort.API.DTO;
using HealthPort.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

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

        [HttpGet]
        [Route("getDoctorBySpeciality/{specialityId}")]
        public async Task<IActionResult> GetAllDoctorsBySpecialityId(int specialityId)
        {
            var doctors = await _hpDbcontext.Doctors.Where(x => x.specialityid == specialityId).ToListAsync();

            return Ok(doctors);
        }

        [HttpPost]
        public async Task<IActionResult> AddDoctor([FromBody] Doctors doctorsRequest)
        {
            doctorsRequest.fullName = $"{doctorsRequest.firstName} {doctorsRequest.lastName}";
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
            doctor.fee = updateRequest.fee;

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

        [HttpPost]
        [Route("search")]
        public async Task<IActionResult> SearchDoctors([FromBody] SearchDto filter)
        {
            var query = _hpDbcontext.Doctors.AsQueryable();

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
            if (filter.specialityid.HasValue)
            {
                query = query.Where(d => d.specialityid == filter.specialityid);
            }

            var doctors = await query.ToListAsync();

            return Ok(doctors);
        }

        [HttpGet]
        [Route("getSchedule/{doctorId}")]
        public async Task<IActionResult> getScheduleByDoctorId(int doctorId)
        {
            var schedule = await _hpDbcontext.DoctorSchedule.Where(x => x.doctorId == doctorId).ToListAsync();

            return Ok(schedule);
        }

        [HttpPut]
        [Route("updateSchedule")]
        public async Task<IActionResult> updateDoctorSchedule([FromBody] DoctorSchedule updateRequest) 
        {

            if (updateRequest.id == 0)
            {
                return BadRequest("Invalid schedule ID");
            }

            var schedule = await _hpDbcontext.DoctorSchedule.FindAsync(updateRequest.id);

            if (schedule == null)
            {
                return NotFound();
            }


            schedule.id = updateRequest.id;
            schedule.doctorId = updateRequest.doctorId;
            schedule.StartTime = updateRequest.StartTime;
            schedule.EndTime = updateRequest.EndTime;
            schedule.DayOfWeek = updateRequest.DayOfWeek;   


            await _hpDbcontext.SaveChangesAsync();

            return Ok(schedule);
        }

        [HttpPost]
        [Route("addSchedule")]
        public async Task<IActionResult> addSchedule([FromBody] DoctorSchedule schedule)
        {

            await _hpDbcontext.DoctorSchedule.AddAsync(schedule);
            await _hpDbcontext.SaveChangesAsync();

            return Ok(schedule);
        }

        [HttpDelete]
        [Route("deleteSchedule/{scheduleId}")]
        public async Task<IActionResult> DeleteSchedule(int scheduleId)
        {
            var schedule = await _hpDbcontext.DoctorSchedule.FindAsync(scheduleId);

            if (schedule == null)
                return NotFound("doctor not found.");

            _hpDbcontext.DoctorSchedule.Remove(schedule);
            await _hpDbcontext.SaveChangesAsync();

            return Ok();
        }


    }
}
