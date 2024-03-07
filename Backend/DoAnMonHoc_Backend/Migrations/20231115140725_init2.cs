using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DoAnMonHoc_Backend.Migrations
{
    public partial class init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Phones_Images_ImageId",
                table: "Phones");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Images_ImageId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ImageId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Phones_ImageId",
                table: "Phones");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Phones");

            migrationBuilder.RenameColumn(
                name: "Sold",
                table: "Products",
                newName: "SoldQuantity");

            migrationBuilder.RenameColumn(
                name: "ImageId",
                table: "Products",
                newName: "AverageRating");

            migrationBuilder.RenameColumn(
                name: "IssuePaid",
                table: "Invoices",
                newName: "IssueDate");

            migrationBuilder.RenameColumn(
                name: "LimitMoney",
                table: "Coupons",
                newName: "RequiredTotal");

            migrationBuilder.RenameColumn(
                name: "Expiry",
                table: "Coupons",
                newName: "StartDate");

            migrationBuilder.RenameColumn(
                name: "DateStart",
                table: "Coupons",
                newName: "EndDate");

            migrationBuilder.RenameColumn(
                name: "CommentDetail",
                table: "Comments",
                newName: "FileHinh");

            migrationBuilder.AddColumn<string>(
                name: "FileHinh",
                table: "Phones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "InvoiceDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Images",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Coupons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CommentId",
                table: "Comments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileHinh",
                table: "Brands",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileHinh",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProductTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ratings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileHinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Star = table.Column<int>(type: "int", nullable: false),
                    NgayDang = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ratings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ratings_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Ratings_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductTypeDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PhoneId = table.Column<int>(type: "int", nullable: false),
                    ProductTypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductTypeDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductTypeDetails_Phones_PhoneId",
                        column: x => x.PhoneId,
                        principalTable: "Phones",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductTypeDetails_ProductTypes_ProductTypeId",
                        column: x => x.ProductTypeId,
                        principalTable: "ProductTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_ProductId",
                table: "Images",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_CommentId",
                table: "Comments",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductTypeDetails_PhoneId",
                table: "ProductTypeDetails",
                column: "PhoneId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductTypeDetails_ProductTypeId",
                table: "ProductTypeDetails",
                column: "ProductTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_ProductId",
                table: "Ratings",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_UserId",
                table: "Ratings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Comments_CommentId",
                table: "Comments",
                column: "CommentId",
                principalTable: "Comments",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Products_ProductId",
                table: "Images",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Comments_CommentId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Products_ProductId",
                table: "Images");

            migrationBuilder.DropTable(
                name: "ProductTypeDetails");

            migrationBuilder.DropTable(
                name: "Ratings");

            migrationBuilder.DropTable(
                name: "ProductTypes");

            migrationBuilder.DropIndex(
                name: "IX_Images_ProductId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Comments_CommentId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "FileHinh",
                table: "Phones");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "InvoiceDetails");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "CommentId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "FileHinh",
                table: "Brands");

            migrationBuilder.DropColumn(
                name: "FileHinh",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "SoldQuantity",
                table: "Products",
                newName: "Sold");

            migrationBuilder.RenameColumn(
                name: "AverageRating",
                table: "Products",
                newName: "ImageId");

            migrationBuilder.RenameColumn(
                name: "IssueDate",
                table: "Invoices",
                newName: "IssuePaid");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Coupons",
                newName: "Expiry");

            migrationBuilder.RenameColumn(
                name: "RequiredTotal",
                table: "Coupons",
                newName: "LimitMoney");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "Coupons",
                newName: "DateStart");

            migrationBuilder.RenameColumn(
                name: "FileHinh",
                table: "Comments",
                newName: "CommentDetail");

            migrationBuilder.AddColumn<int>(
                name: "ImageId",
                table: "Phones",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Products_ImageId",
                table: "Products",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Phones_ImageId",
                table: "Phones",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Phones_Images_ImageId",
                table: "Phones",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Images_ImageId",
                table: "Products",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
