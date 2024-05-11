namespace HealthPort.API.Models
{
    public class Patients
    {
        public int id {  get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string? gender { get; set; } 
        public string? nationality { get; set; }
        public DateOnly dob {  get; set; }
        public string nicNo { get; set; }
        public string mobileNo { get; set; }
        public string email { get; set; }
        public string address { get; set; }
        public string username { get; set; }
        public string password { get; set; }      
        public string? fullName { get; set; }

        public string? height { get; set; }
        public string? weigth { get; set; }
        public string? bloodtype { get; set; }

    }
}
