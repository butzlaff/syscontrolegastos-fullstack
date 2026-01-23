namespace SysControleGastos.Communication.Responses;

public class ResponsePersonsBalanceReportJson
{
    public List<ResponsePersonBalanceJson> Persons { get; set; } = [];

    public decimal TotalIncomeOverall { get; set; }
    public decimal TotalExpenseOverall { get; set; }
    public decimal BalanceOverall => TotalIncomeOverall - TotalExpenseOverall;
}
