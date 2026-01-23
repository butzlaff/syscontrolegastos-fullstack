namespace SysControleGastos.Communication.Responses;

public class ResponseCategoryBalanceJson
{
    public Guid CategoryId { get; set; }
    public string CategoryDescription { get; set; } = string.Empty;

    public decimal TotalIncome  { get; set; }
    public decimal TotalExpense { get; set; }

    public decimal Balance => TotalIncome  - TotalExpense;
}
