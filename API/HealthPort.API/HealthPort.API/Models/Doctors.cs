﻿using System.ComponentModel.DataAnnotations.Schema;

namespace HealthPort.API.Models
{
    public class Doctors
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public int specialityid { get; set; }
        public DateOnly dob { get; set; }
        public string nicNo { get; set; }
        public string mobileNo { get; set; }
        public string email { get; set; }
        public string address { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string? fullName { get; set; }
        public int? fee { get; set; }

        //navigation property
        public Specialites speciality { get; set; }
    }
}
