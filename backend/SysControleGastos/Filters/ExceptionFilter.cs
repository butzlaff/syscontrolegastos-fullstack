using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SysControleGastos.Exception;
using SysControleGastos.Communication.Responses;

namespace SysControleGastos.Filters;


public class ExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        if (context.Exception is SisControlException)
        {
            var errorException = (SisControlException)context.Exception;

            context.HttpContext.Response.StatusCode = (int)errorException.GetStatusCode();

            var responseJson = new ResponseErrorsJson(errorException.GetErrorMessages());

            context.Result = new ObjectResult(responseJson);
        }
        else
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;

            var responseJson = new ResponseErrorsJson(new List<string> { ResourceErrorMessage.UNKNOW_ERROR });

            context.Result = new ObjectResult(responseJson);
        }
    }
}
