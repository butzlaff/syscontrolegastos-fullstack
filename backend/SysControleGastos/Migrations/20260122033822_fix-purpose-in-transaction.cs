using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SysControleGastos.Migrations
{
    /// <inheritdoc />
    public partial class fixpurposeintransaction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CategoryPurpose",
                table: "Transacions",
                newName: "TransactionType");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TransactionType",
                table: "Transacions",
                newName: "CategoryPurpose");
        }
    }
}
