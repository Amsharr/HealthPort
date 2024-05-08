using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthPort.API.Migrations
{
    /// <inheritdoc />
    public partial class added_some_fields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "doctorName",
                table: "Appointments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "paymentStatus",
                table: "Appointments",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "doctorName",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "paymentStatus",
                table: "Appointments");
        }
    }
}
