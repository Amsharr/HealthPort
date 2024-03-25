using HealthPort.API.Models;
using Microsoft.EntityFrameworkCore;

namespace HealthPort.API.Data
{
    public class hpDbcontext : DbContext
    {

        public hpDbcontext(DbContextOptions options) :  base(options) 
        {
        }

        public DbSet<Patients> Patients { get; set; }
        public DbSet<Doctors> Doctors { get; set; }
        public DbSet<Specialites> Specialites { get; set; }
        public DbSet<Nurses> Nurses { get; set; }
        public DbSet<Payments> Payments { get; set; }
        public DbSet<Appointments> Appointments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Doctors>()
                .HasOne(d => d.speciality)
                .WithMany()
                .HasForeignKey(d => d.specialityid);

            modelBuilder.Entity<Appointments>()
                .HasOne(d => d.speciality)
                .WithMany()
                .HasForeignKey(d => d.specialityid)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Appointments>()
                .HasOne(d => d.patient)
                .WithMany()
                .HasForeignKey(d => d.patientId);

            modelBuilder.Entity<Appointments>()
                .HasOne(d => d.doctor)
                .WithMany()
                .HasForeignKey(d => d.doctorid);

            modelBuilder.Entity<Appointments>()
                .HasOne(d => d.payment)
                .WithMany()
                .HasForeignKey(d => d.paymentid);
        }
    }
}
