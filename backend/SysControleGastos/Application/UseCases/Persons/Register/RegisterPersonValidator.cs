using FluentValidation;
using SysControleGastos.Communication.Requests;
using SysControleGastos.Exception;

namespace SysControleGastos.Application.UseCases.Persons.Register;

public class RegisterPersonValidator : AbstractValidator<RequestPersonJson>
{
    public RegisterPersonValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage(ResourceErrorMessage.NAME_EMPTY);
            
        RuleFor(x => x.Age).GreaterThan(0).WithMessage(ResourceErrorMessage.AGE_GREATER_ZERO);
    }
}
