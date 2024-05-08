using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthPort.API.Migrations
{
    /// <inheritdoc />
    public partial class added_fk_for_files : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
