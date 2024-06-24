using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ComicReader.Migrations
{
    /// <inheritdoc />
    public partial class Init3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chapter_Comics_ComicId",
                table: "Chapter");

            migrationBuilder.DropForeignKey(
                name: "FK_Page_Chapter_ChapterId",
                table: "Page");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Page",
                table: "Page");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Chapter",
                table: "Chapter");

            migrationBuilder.RenameTable(
                name: "Page",
                newName: "Pages");

            migrationBuilder.RenameTable(
                name: "Chapter",
                newName: "Chapters");

            migrationBuilder.RenameIndex(
                name: "IX_Page_ChapterId",
                table: "Pages",
                newName: "IX_Pages_ChapterId");

            migrationBuilder.RenameIndex(
                name: "IX_Chapter_ComicId",
                table: "Chapters",
                newName: "IX_Chapters_ComicId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Pages",
                table: "Pages",
                column: "PageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Chapters",
                table: "Chapters",
                column: "ChapterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Chapters_Comics_ComicId",
                table: "Chapters",
                column: "ComicId",
                principalTable: "Comics",
                principalColumn: "ComicId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pages_Chapters_ChapterId",
                table: "Pages",
                column: "ChapterId",
                principalTable: "Chapters",
                principalColumn: "ChapterId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chapters_Comics_ComicId",
                table: "Chapters");

            migrationBuilder.DropForeignKey(
                name: "FK_Pages_Chapters_ChapterId",
                table: "Pages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Pages",
                table: "Pages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Chapters",
                table: "Chapters");

            migrationBuilder.RenameTable(
                name: "Pages",
                newName: "Page");

            migrationBuilder.RenameTable(
                name: "Chapters",
                newName: "Chapter");

            migrationBuilder.RenameIndex(
                name: "IX_Pages_ChapterId",
                table: "Page",
                newName: "IX_Page_ChapterId");

            migrationBuilder.RenameIndex(
                name: "IX_Chapters_ComicId",
                table: "Chapter",
                newName: "IX_Chapter_ComicId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Page",
                table: "Page",
                column: "PageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Chapter",
                table: "Chapter",
                column: "ChapterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Chapter_Comics_ComicId",
                table: "Chapter",
                column: "ComicId",
                principalTable: "Comics",
                principalColumn: "ComicId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Page_Chapter_ChapterId",
                table: "Page",
                column: "ChapterId",
                principalTable: "Chapter",
                principalColumn: "ChapterId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
