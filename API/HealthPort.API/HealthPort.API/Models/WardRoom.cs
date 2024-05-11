using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace HealthPort.API.Models
{
    public class WardRoom
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string roomNumber { get; set; }

        // Foreign Key for Doctor
        public int? doctorId { get; set; }
        [ForeignKey("doctorId")]
        public Doctors Doctor { get; set; }

        // Foreign Key for Patient
        public int? patientId { get; set; }
        [ForeignKey("patientId")]
        public Patients Patient { get; set; }
    }
}
