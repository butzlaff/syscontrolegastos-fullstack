using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace SysControleGastos.Infrastructure.Persistence
{
    public class SCGContextFactory : IDesignTimeDbContextFactory<SCGContext>
    {
        public SCGContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<SCGContext>();

            var dbPath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "Infrastructure",
                "Database",
                "syscontrol.db"
            );

            optionsBuilder.UseSqlite($"Data Source={dbPath}");

            return new SCGContext(optionsBuilder.Options);
        }
    }
}
