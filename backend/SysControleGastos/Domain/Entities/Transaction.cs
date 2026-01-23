using SysControleGastos.Domain.Enums;

namespace SysControleGastos.Domain.Entities;

public class Transaction
{
    public Guid Id { get; set; } = Guid.NewGuid();
    // Valor da transação positivo
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public Guid PersonId { get; set; }
    public Person? Person { get; set; }
    public Guid CategoryId { get; set; }
    public Category? Category { get; set; }
    public TransactionType TransactionType { get; set; }
}
