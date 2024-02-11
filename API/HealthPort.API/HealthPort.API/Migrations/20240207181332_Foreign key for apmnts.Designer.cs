﻿// <auto-generated />
using System;
using HealthPort.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HealthPort.API.Migrations
{
    [DbContext(typeof(hpDbcontext))]
    [Migration("20240207181332_Foreign key for apmnts")]
    partial class Foreignkeyforapmnts
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("HealthPort.API.Models.Appointments", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<DateOnly>("date")
                        .HasColumnType("date");

                    b.Property<int>("doctorid")
                        .HasColumnType("int");

                    b.Property<int>("patientId")
                        .HasColumnType("int");

                    b.Property<string>("paymentStatus")
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeOnly>("time")
                        .HasColumnType("time");

                    b.HasKey("id");

                    b.HasIndex("doctorid");

                    b.HasIndex("patientId");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("HealthPort.API.Models.Doctors", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("dob")
                        .HasColumnType("date");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("firstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("lastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("mobileNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("nicNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("speciality")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Doctors");
                });

            modelBuilder.Entity("HealthPort.API.Models.Patients", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("dob")
                        .HasColumnType("date");

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("firstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("lastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("mobileNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("nicNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("HealthPort.API.Models.Appointments", b =>
                {
                    b.HasOne("HealthPort.API.Models.Doctors", "Doctors")
                        .WithMany()
                        .HasForeignKey("doctorid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HealthPort.API.Models.Patients", "Patients")
                        .WithMany()
                        .HasForeignKey("patientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Doctors");

                    b.Navigation("Patients");
                });
#pragma warning restore 612, 618
        }
    }
}