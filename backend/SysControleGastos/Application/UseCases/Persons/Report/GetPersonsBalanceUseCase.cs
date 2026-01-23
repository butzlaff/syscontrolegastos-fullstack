using Microsoft.EntityFrameworkCore;
using SysControleGastos.Application.Interfaces;
using SysControleGastos.Communication.Responses;
using SysControleGastos.Domain.Enums;
using SysControleGastos.Infrastructure.Persistence;

namespace SysControleGastos.Application.UseCases.Reports.GetPersonsBalance;

public class GetPersonsBalanceUseCase : IGetPersonsBalanceUseCase
{
    private readonly SCGContext _context;

    public GetPersonsBalanceUseCase(SCGContext context)
    {
        _context = context;
    }

    public ResponsePersonsBalanceReportJson Execute()
    {
        var persons = _context.Persons
            .Include(p => p.Transactions)
            .ToList();

        var personsBalance = persons.Select(p =>
        {
            var totalIncome = p.Transactions
                .Where(t => t.TransactionType == TransactionType.RECEITA)
                .Sum(t => t.Amount);

            var totalExpense = p.Transactions
                .Where(t => t.TransactionType == TransactionType.DESPESA)
                .Sum(t => t.Amount);

            return new ResponsePersonBalanceJson
            {
                PersonId = p.Id,
                PersonName = p.Name,
                TotalIncome = totalIncome,
                TotalExpense = totalExpense
            };
        }).ToList();

        return new ResponsePersonsBalanceReportJson
        {
            Persons = personsBalance,
            TotalIncomeOverall = personsBalance.Sum(p => p.TotalIncome),
            TotalExpenseOverall = personsBalance.Sum(p => p.TotalExpense)
        };
    }

}
