using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DoAnMonHoc_Backend.Migrations
{
    public partial class addNgayDangXoaHinhComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileHinh",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "HinhPublicId",
                table: "Comments");

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayDang",
                table: "Comments",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NgayDang",
                table: "Comments");

            migrationBuilder.AddColumn<string>(
                name: "FileHinh",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HinhPublicId",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
