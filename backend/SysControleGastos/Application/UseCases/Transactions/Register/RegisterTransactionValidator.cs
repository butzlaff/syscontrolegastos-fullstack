using FluentValidation;
using SysControleGastos.Communication.Requests;
using SysControleGastos.Exception;

namespace SysControleGastos.Application.UseCases.Transactions.Register;

public class RegisterTransactionValidator : AbstractValidator<RequestTransactionJson>
{
    public RegisterTransactionValidator()
    {
        {
            RuleFor(x => x.Description).NotEmpty().WithMessage(ResourceErrorMessage.DESCRIPTION_EMPTY);

            RuleFor(x => x.Amount).GreaterThan(0).WithMessage(ResourceErrorMessage.VALUE_MUST_BE_POSITIVE);

            RuleFor(x => x.PersonId).NotEmpty().WithMessage(ResourceErrorMessage.PERSON_ID_EMPTY);

            RuleFor(x => x.CategoryId).NotEmpty().WithMessage(ResourceErrorMessage.CATEGORY_ID_EMPTY);

            RuleFor(x => x.TransactionType)
                .IsInEnum()
                .WithMessage(ResourceErrorMessage.PURPOSE_EMPTY);

            RuleFor(x => x.Date).NotEmpty().WithMessage(ResourceErrorMessage.DATE_EMPTY);
        }
    }
}
