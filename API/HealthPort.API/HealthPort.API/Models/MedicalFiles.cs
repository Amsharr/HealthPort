﻿namespace HealthPort.API.Models
{
    public class MedicalFiles
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public byte[] Content { get; set; }

    }
}
