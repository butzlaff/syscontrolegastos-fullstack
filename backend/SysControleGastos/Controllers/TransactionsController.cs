using Microsoft.AspNetCore.Mvc;
using SysControleGastos.Application.UseCases.Transactions.GetAll;
using SysControleGastos.Application.UseCases.Transactions.Register;
using SysControleGastos.Communication.Requests;
using SysControleGastos.Communication.Responses;

namespace SysControleGastos.Controllers;
[Route("api/[controller]")]
[ApiController]
public class TransactionsController : ControllerBase
{
    private readonly RegisterTransactionUseCase _registerTransactionUse;
    private readonly GetAllTransactionUseCase _getAllTransactionUseCase;

    public TransactionsController(RegisterTransactionUseCase registerTransactionUseCase, GetAllTransactionUseCase getAllTransactionUseCase)
    {
        _registerTransactionUse = registerTransactionUseCase;
        _getAllTransactionUseCase = getAllTransactionUseCase;
    }


    [HttpPost]
    [ProducesResponseType(typeof(ResponseTransactionJson), StatusCodes.Status201Created)]
    public IActionResult Register(RequestTransactionJson request)
    {
        var result = _registerTransactionUse.Execute(request);

        return Created(string.Empty, result);
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<ResponseTransactionDetailsJson>), StatusCodes.Status200OK)]
    public IActionResult GetAllTransactions()
    {
        var result = _getAllTransactionUseCase.Execute();

        return Ok(result);
    }
}
