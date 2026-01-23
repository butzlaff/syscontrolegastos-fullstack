using SysControleGastos.Application.Interfaces;
using SysControleGastos.Communication.Requests;
using SysControleGastos.Communication.Responses;
using SysControleGastos.Domain.Entities;
using SysControleGastos.Exception;
using SysControleGastos.Infrastructure.Persistence;

namespace SysControleGastos.Application.UseCases.Persons.Register;

public class RegisterPersonUseCase : IPersonRegisterRepository
{
    private readonly SCGContext _context;

    public RegisterPersonUseCase(SCGContext context)
    {
        _context = context;
    }

    public ResponsePersonJson Execute(RequestPersonJson request)
    {
        Validate(request);

        var dbContext = _context;

        Person person = new()
        {
            Name = request.Name,
            Age = request.Age
        };

        dbContext.Persons.Add(person);

        dbContext.SaveChanges();

        return new ResponsePersonJson()
        {
            Id = person.Id,
            Name = person.Name,
            Age = person.Age
        };
    }

    private void Validate(RequestPersonJson request)
    {
        var validator = new RegisterPersonValidator();

        var validationResult = validator.Validate(request);

        if (!validationResult.IsValid)
        {
            var errorMessages = validationResult.Errors.Select(error => error.ErrorMessage).ToList();

            throw new ErrorOnValidateException(errorMessages);
        }
    }
}
