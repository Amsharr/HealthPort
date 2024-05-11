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

        [HttpPost]
        [Route("addWard")]
        public async Task<IActionResult> addWardRoom([FromBody] WardRoom wardRoom)
        {
            await _hpDbcontext.WardRoom.AddAsync(wardRoom);
            await _hpDbcontext.SaveChangesAsync();

            return Ok(wardRoom);
        }

        [HttpGet]
        [Route("getWards")]
        public async Task<IActionResult> getAllWardRooms()
        {
            var wards = await _hpDbcontext.WardRoom.ToListAsync();

            return Ok(wards);
        }

        [HttpPut]
        [Route("updateWard")]
        public async Task<IActionResult> updateWard([FromBody] WardRoom updateRequest)
        {
            if (updateRequest.id == 0)
            {
                return BadRequest("Invalid ward ID");
            }

            var ward = await _hpDbcontext.WardRoom.FindAsync(updateRequest.id);

            if (ward == null)
            {
                return NotFound();
            }


            ward.id = updateRequest.id;
            ward.roomNumber = updateRequest.roomNumber;
            ward.patientId = updateRequest.patientId;
            ward.doctorId = updateRequest.doctorId;

            await _hpDbcontext.SaveChangesAsync();

            return Ok(ward);
        }

        [HttpDelete]
        [Route("deleteWard/{wardId}")]
        public async Task<IActionResult> updateWard(int wardId)
        {
            var ward = await _hpDbcontext.WardRoom.FindAsync(wardId);

            if (ward == null)
                return NotFound("doctor not found.");

            _hpDbcontext.WardRoom.Remove(ward);
            await _hpDbcontext.SaveChangesAsync();

            return Ok();
        }
    }
}
