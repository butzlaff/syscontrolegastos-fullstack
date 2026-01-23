using SysControleGastos.Domain.Entities;
using SysControleGastos.Domain.Enums;

namespace SysControleGastos.Communication.Requests;

public class RequestTransactionJson
{
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public Guid PersonId { get; set; }
    public Guid CategoryId { get; set; }
    public TransactionType TransactionType { get; set; }
}
