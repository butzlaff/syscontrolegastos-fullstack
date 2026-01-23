using System.Net;

namespace SysControleGastos.Exception;

public class ErrorOnValidateException : SisControlException
{
    private readonly IList<string> _erros;
    public ErrorOnValidateException(IList<string> messages) : base(string.Empty)
    {
        _erros = messages;
    }

    public override IList<string> GetErrorMessages()
    {
        return _erros;
    }

    public override HttpStatusCode GetStatusCode()
    {
        return HttpStatusCode.BadRequest;
    }
}
