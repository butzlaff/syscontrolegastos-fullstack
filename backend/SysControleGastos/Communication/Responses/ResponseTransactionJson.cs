using SysControleGastos.Domain.Enums;

namespace SysControleGastos.Communication.Responses;

public class ResponseTransactionJson
{
    public Guid Id { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public Guid PersonId { get; set; }
    public Guid CategoryId { get; set; }
    public TransactionType TransactionType { get; set; }
}
