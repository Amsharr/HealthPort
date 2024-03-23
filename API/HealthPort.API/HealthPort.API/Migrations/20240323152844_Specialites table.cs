using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthPort.API.Migrations
{
    /// <inheritdoc />
    public partial class Specialitestable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "speciality",
                table: "Doctors",
                newName: "specialityid");

            migrationBuilder.AddColumn<int>(
                name: "specialitesid",
                table: "Doctors",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Specialites",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Specialites", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_specialitesid",
                table: "Doctors",
                column: "specialitesid");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Specialites_specialitesid",
                table: "Doctors",
                column: "specialitesid",
                principalTable: "Specialites",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Specialites_specialitesid",
                table: "Doctors");

            migrationBuilder.DropTable(
                name: "Specialites");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_specialitesid",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "specialitesid",
                table: "Doctors");

            migrationBuilder.RenameColumn(
                name: "specialityid",
                table: "Doctors",
                newName: "speciality");
        }
    }
}
