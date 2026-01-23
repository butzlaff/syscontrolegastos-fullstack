using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SysControleGastos.Migrations
{
    /// <inheritdoc />
    public partial class addpurposeintransactions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryPurpose",
                table: "Transacions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "Purpose",
                table: "Categories",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryPurpose",
                table: "Transacions");

            migrationBuilder.AlterColumn<string>(
                name: "Purpose",
                table: "Categories",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");
        }
    }
}
