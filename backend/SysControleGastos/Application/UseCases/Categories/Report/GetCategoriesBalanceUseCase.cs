using SysControleGastos.Application.Interfaces;
using SysControleGastos.Communication.Responses;
using SysControleGastos.Domain.Enums;
using SysControleGastos.Infrastructure.Persistence;

namespace SysControleGastos.Application.UseCases.Reports.GetCategoriesBalance;

public class GetCategoriesBalanceUseCase : IGetCategoriesBalanceUseCase
{
    private readonly SCGContext _context;

    public GetCategoriesBalanceUseCase(SCGContext context)
    {
        _context = context;
    }

    public ResponseCategoriesBalanceReportJson Execute()
    {
        var categories = _context.Categories.ToList();
        var transactions = _context.Transactions.ToList();

        var categoriesBalance = categories.Select(category =>
        {
            var categoryTransactions = transactions
                .Where(t => t.CategoryId == category.Id);

            var totalReceitas = categoryTransactions
                .Where(t => t.TransactionType == TransactionType.RECEITA)
                .Sum(t => t.Amount);

            var totalExpense = categoryTransactions
                .Where(t => t.TransactionType == TransactionType.DESPESA)
                .Sum(t => t.Amount);

            return new ResponseCategoryBalanceJson
            {
                CategoryId = category.Id,
                CategoryDescription = category.Description,
                TotalIncome  = totalReceitas,
                TotalExpense = totalExpense
            };
        }).ToList();

        return new ResponseCategoriesBalanceReportJson
        {
            Categories = categoriesBalance,
            TotalIncomeOverall = categoriesBalance.Sum(c => c.TotalIncome ),
            TotalExpenseOverall  = categoriesBalance.Sum(c => c.TotalExpense)
        };
    }
}
