using System.ComponentModel.DataAnnotations.Schema;

namespace HealthPort.API.Models
{
    public class Appointments
    {
        public int id { get; set; }

        [ForeignKey("Doctors")]
        public int doctorid { get; set; }
        public Doctors Doctors { get; set; }

        [ForeignKey("Patients")]
        public int patientId { get; set; }
        public Patients Patients { get; set; }

        public DateOnly date { get; set; }
        public TimeOnly time { get; set; }       
        public string paymentStatus { get; set;}
    }
}
