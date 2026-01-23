namespace SysControleGastos.Communication.Responses;

public class ResponseCategoriesBalanceReportJson
{
    public List<ResponseCategoryBalanceJson> Categories { get; set; } = [];

    public decimal TotalIncomeOverall { get; set; }
    public decimal TotalExpenseOverall  { get; set; }

    public decimal BalanceOverall  => TotalIncomeOverall - TotalExpenseOverall ;
}
