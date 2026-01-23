namespace SysControleGastos.Domain.Entities;

public class Person
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; } 
    public int Age { get; set; }

   public ICollection<Transaction> Transactions { get; set; } = [];
}
