using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DoAnMonHoc_Backend.Migrations
{
    public partial class init77 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishLists_Products_ProductId",
                table: "WishLists");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "WishLists",
                newName: "PhoneId");

            migrationBuilder.RenameIndex(
                name: "IX_WishLists_ProductId",
                table: "WishLists",
                newName: "IX_WishLists_PhoneId");

            migrationBuilder.AddForeignKey(
                name: "FK_WishLists_Phones_PhoneId",
                table: "WishLists",
                column: "PhoneId",
                principalTable: "Phones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishLists_Phones_PhoneId",
                table: "WishLists");

            migrationBuilder.RenameColumn(
                name: "PhoneId",
                table: "WishLists",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_WishLists_PhoneId",
                table: "WishLists",
                newName: "IX_WishLists_ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_WishLists_Products_ProductId",
                table: "WishLists",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
