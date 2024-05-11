using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthPort.API.Migrations
{
    /// <inheritdoc />
    public partial class updated_pat_doc_app : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "bloodtype",
                table: "Patients",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "gender",
                table: "Patients",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "height",
                table: "Patients",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "nationality",
                table: "Patients",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "weigth",
                table: "Patients",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "fee",
                table: "Doctors",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "amountPayable",
                table: "Appointments",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "bloodtype",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "gender",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "height",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "nationality",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "weigth",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "fee",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "amountPayable",
                table: "Appointments");
        }
    }
}
