using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DoAnMonHoc_Backend.Migrations
{
    public partial class xoaHinhRating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileHinh",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "HinhPublicId",
                table: "Ratings");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileHinh",
                table: "Ratings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HinhPublicId",
                table: "Ratings",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
