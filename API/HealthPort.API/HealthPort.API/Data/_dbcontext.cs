using HealthPort.API.Models;
using Microsoft.EntityFrameworkCore;

namespace HealthPort.API.Data
{
    public class _dbcontext : DbContext
    {
        public _dbcontext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Patients> Patients { get; set; }
        public DbSet<Doctors> Doctors { get; set; }
        public DbSet<Appointments> Appointments { get; set; }
    }
}
