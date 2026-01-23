namespace SysControleGastos.Communication.Responses;


public class ResponsePersonBalanceJson
{
    public Guid PersonId { get; set; }
    public string PersonName { get; set; } = string.Empty;

    public decimal TotalIncome { get; set; }
    public decimal TotalExpense { get; set; }
    public decimal Balance => TotalIncome - TotalExpense;
}