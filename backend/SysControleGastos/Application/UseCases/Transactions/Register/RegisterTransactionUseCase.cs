using SysControleGastos.Communication.Requests;
using SysControleGastos.Communication.Responses;
using SysControleGastos.Domain.Entities;
using SysControleGastos.Exception;
using SysControleGastos.Infrastructure.Persistence;
using SysControleGastos.Domain.Enums;

namespace SysControleGastos.Application.UseCases.Transactions.Register;

public class RegisterTransactionUseCase
{
    private readonly SCGContext _context;

    public RegisterTransactionUseCase(SCGContext context)
    {
        _context = context;
    }

    public ResponseTransactionJson Execute(RequestTransactionJson request)
    {
        Validate(request);

        var errorsMessages = new List<string>();

        var person = _context.Persons.Find(request.PersonId);
        if (person == null)
        {
            errorsMessages.Add("Pessoa não encontrada");
        }

        var category = _context.Categories.Find(request.CategoryId);
        if (category == null)
        {
            errorsMessages.Add("Categoria não encontrada");
        }

        if (errorsMessages.Count > 0)
        {
            throw new ErrorOnValidateException(errorsMessages);
        }

        // menor de idade só pode despesa
        if (person!.Age < 18 && request.TransactionType == TransactionType.RECEITA)
        {
            errorsMessages.Add("Pessoas menores de idade não podem registrar receitas");
        }

        // 🔒 Regra: categoria compatível com tipo da transação
        bool categoryIsValid =
            category!.Purpose == CategoryPurpose.Ambas ||
            (category.Purpose == CategoryPurpose.Despesa && request.TransactionType == TransactionType.DESPESA) ||
            (category.Purpose == CategoryPurpose.Receita && request.TransactionType == TransactionType.RECEITA);

        if (!categoryIsValid)
        {
            errorsMessages.Add("Categoria incompatível com o tipo da transação");
        }

        if (errorsMessages.Count > 0)
        {
            throw new ErrorOnValidateException(errorsMessages);
        }

        var transaction = new Transaction
        {
            Amount = request.Amount,
            Date = request.Date,
            Description = request.Description,
            PersonId = request.PersonId,
            CategoryId = request.CategoryId,
            TransactionType = request.TransactionType,
            Person = person,
            Category = category
        };

        _context.Transactions.Add(transaction);
        _context.SaveChanges();

        return new ResponseTransactionJson
        {
            Id = transaction.Id,
            Amount = transaction.Amount,
            Date = transaction.Date,
            Description = transaction.Description,
            PersonId = transaction.PersonId,
            CategoryId = transaction.CategoryId,
            TransactionType = transaction.TransactionType
        };
    }


    private void Validate(RequestTransactionJson request)
    {
        var validator = new RegisterTransactionValidator();

        var validationResult = validator.Validate(request);

        if (!validationResult.IsValid)
        {
            var errorMessages = validationResult.Errors.Select(error => error.ErrorMessage).ToList();

            throw new ErrorOnValidateException(errorMessages);
        }
    }
}
