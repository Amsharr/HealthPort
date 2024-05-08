using HealthPort.API.Data;
using HealthPort.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

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
            var doctor = _hpDbcontext.Doctors.Where(x => x.id == appointmentRequest.doctorid).FirstOrDefault();
            var payment = _hpDbcontext.Payments.Where(x => x.id == appointmentRequest.paymentid).FirstOrDefault();

            appointmentRequest.paymentStatus = payment.description;
            appointmentRequest.doctorName = doctor.fullName;

            await _hpDbcontext.Appointments.AddAsync(appointmentRequest);
            await _hpDbcontext.SaveChangesAsync();

            return Ok(appointmentRequest);
        }

        [HttpGet]
        [Route("getTimes/{doctorId}/{date}")]
        public ActionResult<List<TimeOnly>> GetAvailableTimes(int doctorId, DateOnly date)
        {
            
            var existingAppointments = _hpDbcontext.Appointments
                .Where(a => a.doctorid == doctorId && a.date == date)
                .ToList();

            
            List<TimeOnly> timeSlots = GenerateTimeSlots(date, existingAppointments , doctorId);

            
            foreach (var appointment in existingAppointments)
            {
                timeSlots.Remove(appointment.time);
            }

            return timeSlots;
        }

        private List<TimeOnly> GenerateTimeSlots(DateOnly date, List<Appointments> existingAppointments, int doctorId)
        {
            List<TimeOnly> timeSlots = new List<TimeOnly>();

            int dayOfWeek = (int)date.DayOfWeek;

            var doctorSchedule = _hpDbcontext.DoctorSchedule.FirstOrDefault(s => s.doctorId == doctorId && (int)s.DayOfWeek == dayOfWeek);

            if (doctorSchedule != null)
            {
                
                TimeOnly currentTime = doctorSchedule.StartTime;
                TimeOnly endTime = doctorSchedule.EndTime;

                while (currentTime < endTime)
                {
                    
                    if (!existingAppointments.Any(a => a.time == currentTime))
                    {
                        timeSlots.Add(currentTime);
                    }

                    
                    currentTime = currentTime.Add(TimeSpan.FromMinutes(15));
                }
            }

            return timeSlots;
        }

        [HttpGet]
        [Route("getAppointmentByPid/{patientId}")]
        public async Task<IActionResult> GetAllAppointmentsByPatientId(int patientId)
        {
            var appointments = await _hpDbcontext.Appointments.Where(x => x.patientId == patientId).ToListAsync();

            return Ok(appointments);
        }


        [HttpGet]
        [Route("getAppointmentByDid/{doctorId}")]
        public async Task<IActionResult> GetAllAppointmentsByDoctorId(int doctorId)
        {
            var appointments = await _hpDbcontext.Appointments.Where(x => x.doctorid == doctorId).ToListAsync();

            return Ok(appointments);
        }

        [HttpDelete]
        [Route("delete/{appointmentId}")]
        public async Task<IActionResult> DeleteAppointment(int appointmentId)
        {
            var appintment = await _hpDbcontext.Appointments.FindAsync(appointmentId);

            if (appintment == null)
                return NotFound("appintment not found.");

            _hpDbcontext.Appointments.Remove(appintment);
            await _hpDbcontext.SaveChangesAsync();

            return Ok();
        }
    }

}
