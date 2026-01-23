using SysControleGastos.Application.Interfaces;
using SysControleGastos.Communication.Requests;
using SysControleGastos.Communication.Responses;
using SysControleGastos.Domain.Enums ;
using SysControleGastos.Infrastructure.Persistence;
using System.Collections.Generic;

namespace SysControleGastos.Application.UseCases.Categories.GetAll;

public class GetAllCategoryUseCase : IGetAllCatetegoriesRepository
{
    private readonly SCGContext _context;

    public GetAllCategoryUseCase(SCGContext context)
    {
        _context = context;
    }

    public IList<ResponseCategoryJson> Execute()
    {

        var categories = _context.Categories
         .Select(c => new ResponseCategoryJson
         {
             Id = c.Id,
             Description = c.Description,
             Purpose = c.Purpose
         })
         .ToList();

        return categories;

    }
}
