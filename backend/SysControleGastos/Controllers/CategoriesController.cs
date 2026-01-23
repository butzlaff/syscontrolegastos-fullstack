using Microsoft.AspNetCore.Mvc;
using SysControleGastos.Application.UseCases.Categories.GetAll;
using SysControleGastos.Application.UseCases.Categories.Register;
using SysControleGastos.Application.UseCases.Reports.GetCategoriesBalance;
using SysControleGastos.Communication.Requests;
using SysControleGastos.Communication.Responses;
using SysControleGastos.Exception;

namespace SysControleGastos.Controllers;
[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly RegisterCategoryUseCase _registerUseCase;
    private readonly GetAllCategoryUseCase _getAllUseCase;
    private readonly GetCategoriesBalanceUseCase _getCategoriesBalanceUseCase;

    public CategoriesController(RegisterCategoryUseCase registerUseCase, GetAllCategoryUseCase getAllUseCase
        , GetCategoriesBalanceUseCase getCategoriesBalanceUseCase)
    {
        _registerUseCase = registerUseCase;
        _getAllUseCase = getAllUseCase;
        _getCategoriesBalanceUseCase = getCategoriesBalanceUseCase;
    }

    [HttpPost]
    [ProducesResponseType(typeof(ResponseCategoryJson), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ErrorOnValidateException), StatusCodes.Status400BadRequest)]
    public IActionResult CreateCategory([FromBody] RequestCategoryJson request)
    {

        var result = _registerUseCase.Execute(request);

        return Created(string.Empty, result);
    }

    [HttpGet]
    [ProducesResponseType(typeof(IList<ResponseCategoryJson>), StatusCodes.Status200OK)]
    public IActionResult GetAllCategories()
    {
        var result = _getAllUseCase.Execute();

        return Ok(result);
    }

    [HttpGet("balance")]
    [ProducesResponseType(typeof(ResponseCategoriesBalanceReportJson), StatusCodes.Status200OK)]
    public IActionResult GetCategoriesBalance()
    {
        var result = _getCategoriesBalanceUseCase.Execute();
        return Ok(result);
    }
}
