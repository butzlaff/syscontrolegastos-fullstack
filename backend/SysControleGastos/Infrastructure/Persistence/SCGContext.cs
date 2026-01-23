using Microsoft.EntityFrameworkCore;
using SysControleGastos.Domain.Entities;

namespace SysControleGastos.Infrastructure.Persistence;

public class SCGContext(DbContextOptions<SCGContext> options) : DbContext(options)
{
    public DbSet<Person> Persons { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Person>()
            .HasMany(p => p.Transactions)
            .WithOne(t => t.Person)
            .HasForeignKey(t => t.PersonId)
            .OnDelete(DeleteBehavior.Cascade);
    }

}
