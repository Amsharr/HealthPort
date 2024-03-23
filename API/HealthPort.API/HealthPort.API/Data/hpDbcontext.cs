using HealthPort.API.Models;
using Microsoft.EntityFrameworkCore;

namespace HealthPort.API.Data
{
    public class hpDbcontext : DbContext
    {
        public hpDbcontext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Patients> Patients { get; set; }
        public DbSet<Doctors> Doctors { get; set; }
        public DbSet<Appointments> Appointments { get; set; }
        public DbSet<Specialites> Specialites { get; set; }
    }
}
