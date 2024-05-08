using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthPort.API.Migrations
{
    /// <inheritdoc />
    public partial class file_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicalFiles_Nurses_nurseId",
                table: "MedicalFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalFiles_Patients_patientId",
                table: "MedicalFiles");

            migrationBuilder.DropIndex(
                name: "IX_MedicalFiles_nurseId",
                table: "MedicalFiles");

            migrationBuilder.DropIndex(
                name: "IX_MedicalFiles_patientId",
                table: "MedicalFiles");

            migrationBuilder.DropColumn(
                name: "dateUploaded",
                table: "MedicalFiles");

            migrationBuilder.DropColumn(
                name: "description",
                table: "MedicalFiles");

            migrationBuilder.DropColumn(
                name: "nurseId",
                table: "MedicalFiles");

            migrationBuilder.DropColumn(
                name: "patientId",
                table: "MedicalFiles");

            migrationBuilder.DropColumn(
                name: "patietnName",
                table: "MedicalFiles");

            migrationBuilder.DropColumn(
                name: "reportType",
                table: "MedicalFiles");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "MedicalFiles",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "uploadedBy",
                table: "MedicalFiles",
                newName: "FileName");

            migrationBuilder.RenameColumn(
                name: "file",
                table: "MedicalFiles",
                newName: "Content");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "MedicalFiles",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "FileName",
                table: "MedicalFiles",
                newName: "uploadedBy");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "MedicalFiles",
                newName: "file");

            migrationBuilder.AddColumn<DateOnly>(
                name: "dateUploaded",
                table: "MedicalFiles",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "MedicalFiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "nurseId",
                table: "MedicalFiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "patientId",
                table: "MedicalFiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "patietnName",
                table: "MedicalFiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "reportType",
                table: "MedicalFiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MedicalFiles_nurseId",
                table: "MedicalFiles",
                column: "nurseId");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalFiles_patientId",
                table: "MedicalFiles",
                column: "patientId");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalFiles_Nurses_nurseId",
                table: "MedicalFiles",
                column: "nurseId",
                principalTable: "Nurses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalFiles_Patients_patientId",
                table: "MedicalFiles",
                column: "patientId",
                principalTable: "Patients",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
