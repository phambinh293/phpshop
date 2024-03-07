using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DoAnMonHoc_Backend.Migrations
{
    public partial class add_hinh_cho_product : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileHinh",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HinhPublicId",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileHinh",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "HinhPublicId",
                table: "Products");
        }
    }
}
