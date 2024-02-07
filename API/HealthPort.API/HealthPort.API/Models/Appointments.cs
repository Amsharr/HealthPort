namespace HealthPort.API.Models
{
    public class Appointments
    {
        public int id { get; set; }
        public int doctorid { get; set; }
        public DateOnly date { get; set; }
        public TimeOnly time { get; set; }
        public int patientId { get; set; }
        public string paymentStatus { get; set;}
    }
}
