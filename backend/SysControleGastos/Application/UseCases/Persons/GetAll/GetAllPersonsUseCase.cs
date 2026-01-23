using SysControleGastos.Communication.Responses;
using SysControleGastos.Infrastructure.Persistence;

namespace SysControleGastos.Application.UseCases.Persons.GetAll;

public class GetAllPersonsUseCase
{
    private readonly SCGContext _context;

    public GetAllPersonsUseCase(SCGContext context)
    {
        _context = context;
    }

    public ResponsePersonsJson Execute()
    {
        var persons = _context.Persons.ToList();
        
        return new ResponsePersonsJson
        {
            Persons = persons.Select(p => new ResponsePersonJson
            {
                Id = p.Id,
                Name = p.Name,
                Age = p.Age
            }).ToList()
        };
    }
}
