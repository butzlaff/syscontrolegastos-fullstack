using SysControleGastos.Communication.Requests;
using SysControleGastos.Communication.Responses;
using SysControleGastos.Domain.Entities;
using SysControleGastos.Domain.Enums;
using SysControleGastos.Exception;
using SysControleGastos.Infrastructure.Persistence;

namespace SysControleGastos.Application.UseCases.Categories.Register;

public class RegisterCategoryUseCase
{
    private readonly SCGContext _context;

    public RegisterCategoryUseCase(SCGContext context)
    {
        _context = context;
    }

    public ResponseCategoryJson Execute(RequestCategoryJson request)
    {
        Validate(request);

        var dbContext = _context;

        Category category = new()
        {
            Description = request.Description,
            Purpose = (CategoryPurpose)request.Purpose
        };
        dbContext.Categories.Add(category);
        dbContext.SaveChanges();

        return new ResponseCategoryJson()
        {
            Id = category.Id,
            Description = category.Description,
            Purpose = (CategoryPurpose)category.Purpose
        };
    }

    private void Validate(RequestCategoryJson request)
    {
        var validator = new RegisterCategoryValidator();

        var validationResult = validator.Validate(request);

        if (!validationResult.IsValid)
        {
            var errorMessages = validationResult.Errors.Select(error => error.ErrorMessage).ToList();

            throw new ErrorOnValidateException(errorMessages);
        }
    }
}
