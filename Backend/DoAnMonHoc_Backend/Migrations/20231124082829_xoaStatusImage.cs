using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DoAnMonHoc_Backend.Migrations
{
    public partial class xoaStatusImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Images");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Images",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
