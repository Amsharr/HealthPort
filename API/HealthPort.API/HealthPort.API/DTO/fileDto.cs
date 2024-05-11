using HealthPort.API.Models;

namespace HealthPort.API.DTO
{
    public class fileDto
    {
        public int id { get; set; }
        public int patientId { get; set; }
        public string? patietnName { get; set; }
        public string reportType { get; set; }
        public IFormFile? file { get; set; }
        public string? description { get; set; }
        public DateOnly dateUploaded { get; set; }
        public int nurseId { get; set; }
        public string? uploadedBy { get; set; }

        public Patients Patient { get; set; }
        public Nurses Nurse { get; set; }
    }
}
