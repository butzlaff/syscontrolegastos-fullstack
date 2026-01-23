using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SysControleGastos.Migrations
{
    /// <inheritdoc />
    public partial class FixTransactionsTableName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transacions_Categories_CategoryId",
                table: "Transacions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transacions_Persons_PersonId",
                table: "Transacions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Transacions",
                table: "Transacions");

            migrationBuilder.RenameTable(
                name: "Transacions",
                newName: "Transactions");

            migrationBuilder.RenameIndex(
                name: "IX_Transacions_PersonId",
                table: "Transactions",
                newName: "IX_Transactions_PersonId");

            migrationBuilder.RenameIndex(
                name: "IX_Transacions_CategoryId",
                table: "Transactions",
                newName: "IX_Transactions_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Transactions",
                table: "Transactions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Categories_CategoryId",
                table: "Transactions",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Persons_PersonId",
                table: "Transactions",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Categories_CategoryId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Persons_PersonId",
                table: "Transactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Transactions",
                table: "Transactions");

            migrationBuilder.RenameTable(
                name: "Transactions",
                newName: "Transacions");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_PersonId",
                table: "Transacions",
                newName: "IX_Transacions_PersonId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_CategoryId",
                table: "Transacions",
                newName: "IX_Transacions_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Transacions",
                table: "Transacions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transacions_Categories_CategoryId",
                table: "Transacions",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transacions_Persons_PersonId",
                table: "Transacions",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
