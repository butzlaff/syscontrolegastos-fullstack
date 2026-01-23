using FluentValidation;
using SysControleGastos.Communication.Requests;
using SysControleGastos.Exception;

namespace SysControleGastos.Application.UseCases.Categories.Register;

public class RegisterCategoryValidator: AbstractValidator<RequestCategoryJson>
{
    public RegisterCategoryValidator()
    {
        RuleFor(x => x.Description)
            .NotEmpty().WithMessage(ResourceErrorMessage.DESCRIPTION_EMPTY);
            
        RuleFor(x => x.Purpose)
            .NotNull().WithMessage(ResourceErrorMessage.PURPOSE_EMPTY);
    }
}
