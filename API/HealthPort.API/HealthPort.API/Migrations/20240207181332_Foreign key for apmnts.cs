using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthPort.API.Migrations
{
    /// <inheritdoc />
    public partial class Foreignkeyforapmnts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Appointments_doctorid",
                table: "Appointments",
                column: "doctorid");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_patientId",
                table: "Appointments",
                column: "patientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Doctors_doctorid",
                table: "Appointments",
                column: "doctorid",
                principalTable: "Doctors",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Patients_patientId",
                table: "Appointments",
                column: "patientId",
                principalTable: "Patients",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Doctors_doctorid",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Patients_patientId",
                table: "Appointments");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_doctorid",
                table: "Appointments");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_patientId",
                table: "Appointments");
        }
    }
}
