using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthPort.API.Migrations
{
    /// <inheritdoc />
    public partial class new_change_to_nurse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "doctorId",
                table: "Nurses",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "doctorId",
                table: "Nurses");
        }
    }
}
