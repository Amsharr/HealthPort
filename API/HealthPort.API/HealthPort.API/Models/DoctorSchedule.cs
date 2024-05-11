using System.Numerics;

namespace HealthPort.API.Models
{
    public class DoctorSchedule
    {
        public int id { get; set; }
        public int doctorId { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public Doctors Doctor { get; set; }

    }
}
