using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DoAnMonHoc_Backend.Migrations
{
    public partial class themHinhPublicId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HinhPublicId",
                table: "Ratings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HinhPublicId",
                table: "Phones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HinhPublicId",
                table: "Images",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HinhPublicId",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HinhPublicId",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "HinhPublicId",
                table: "Phones");

            migrationBuilder.DropColumn(
                name: "HinhPublicId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "HinhPublicId",
                table: "Comments");
        }
    }
}
