using Microsoft.AspNetCore.Mvc;
using SysControleGastos.Application.UseCases.Persons.Delete;
using SysControleGastos.Application.UseCases.Persons.GetAll;
using SysControleGastos.Application.UseCases.Persons.Register;
using SysControleGastos.Application.UseCases.Reports.GetPersonsBalance;
using SysControleGastos.Communication.Requests;
using SysControleGastos.Communication.Responses;

namespace SysControleGastos.Controllers;
[Route("api/[controller]")]
[ApiController]
public class PersonsController : ControllerBase
{
    private readonly RegisterPersonUseCase _useCaseRegister;
    private readonly DeletePersonUseCase _useCaseDelete;
    private readonly GetAllPersonsUseCase _getAllPersonsUseCase;
    private readonly GetPersonsBalanceUseCase _getPersonsBalanceUseCase;

    public PersonsController(RegisterPersonUseCase registerPersonUseCase, DeletePersonUseCase deletePersonUseCase, GetAllPersonsUseCase getAllPersonsUseCase, GetPersonsBalanceUseCase getPersonsBalanceUseCase)
    {
        _useCaseRegister = registerPersonUseCase;
        _useCaseDelete = deletePersonUseCase;
        _getAllPersonsUseCase = getAllPersonsUseCase;
        _getAllPersonsUseCase = getAllPersonsUseCase;
        _getPersonsBalanceUseCase = getPersonsBalanceUseCase;

    }

    [HttpPost]
    [ProducesResponseType(typeof(ResponsePersonJson), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    public IActionResult Register([FromBody] RequestPersonJson request)
    {
        var result = _useCaseRegister.Execute(request);

        return Created(string.Empty, result);
    }

    [HttpDelete]
    [Route("{personId}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    public IActionResult Delete([FromRoute] Guid personId)
    {
        _useCaseDelete.Execute(personId);

        return NoContent();
    }

    [HttpGet]
    [ProducesResponseType(typeof(ResponsePersonsJson), StatusCodes.Status200OK)]
    public IActionResult GetAll()
    {
        ResponsePersonsJson persons = _getAllPersonsUseCase.Execute();

        return Ok(persons);
    }

    [HttpGet]
    [Route("balance")]
    [ProducesResponseType(typeof(ResponsePersonsBalanceReportJson), StatusCodes.Status200OK)]
    public IActionResult GetPersonsBalanceUseCase()
    {
        var res = _getPersonsBalanceUseCase.Execute();

        return Ok(res);
    }
}
