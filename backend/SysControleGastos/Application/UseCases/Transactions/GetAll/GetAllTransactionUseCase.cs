using Microsoft.EntityFrameworkCore;
using SysControleGastos.Communication.Requests;
using SysControleGastos.Communication.Responses;
using SysControleGastos.Domain.Enums;
using SysControleGastos.Exception;
using SysControleGastos.Infrastructure.Persistence;

namespace SysControleGastos.Application.UseCases.Transactions.GetAll;

public class GetAllTransactionUseCase
{
    private readonly SCGContext _context;

    public GetAllTransactionUseCase(SCGContext context)
    {
        _context = context;
    }

    public List<ResponseTransactionDetailsJson> Execute()
    {
        var result = _context.Transactions
            .Include(t => t.Person)
            .Include(t => t.Category)
            .Select(t => new ResponseTransactionDetailsJson
            {
                Id = t.Id,
                Amount = t.Amount,
                Date = t.Date,
                Description = t.Description,

                TransactionType = t.TransactionType,

                PersonId = t.PersonId,
                PersonName = t.Person!.Name,

                CategoryId = t.CategoryId,
                CategoryName = t.Category!.Description
            })
            .ToList();

        return result;
    }

}
