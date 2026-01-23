using Microsoft.EntityFrameworkCore;
using SysControleGastos.Exception;
using SysControleGastos.Infrastructure.Persistence;

namespace SysControleGastos.Application.UseCases.Persons.Delete;

public class DeletePersonUseCase
{
    private readonly SCGContext _context;

    public DeletePersonUseCase(SCGContext context)
    {
        _context = context;
    }

    public void Execute(Guid personId)
    {
        var dbContext = _context;

        var person = dbContext.
            Persons
            .Include(p => p.Transactions)
            .FirstOrDefault(p => p.Id == personId) ?? throw new NotFoundException(ResourceErrorMessage.PERSON_NOT_FOUND);

        dbContext.Persons.Remove(person);

        dbContext.SaveChanges();
    }
}
