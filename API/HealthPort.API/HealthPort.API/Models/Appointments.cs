using System.ComponentModel.DataAnnotations.Schema;

namespace HealthPort.API.Models
{
    public class Appointments
    {
        public int id { get; set; }
        public int specialityid { get; set; }
        public string patientName { get; set; }
        public int patientId { get; set; }
        public int doctorid { get; set; }
        public string? doctorName { get; set; }
        public DateOnly date { get; set; }
        public TimeOnly time { get; set; }
        public string paymentMethod { get; set; }
        public int paymentid { get; set; }

        public string? paymentStatus { get; set; }

        public int status { get; set; }

        public Specialites speciality { get; set; }
        public Patients patient { get; set; }  
        public Doctors doctor { get; set; }
        public Payments payment { get; set; }

    }
}
