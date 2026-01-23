using System.Net;

namespace SysControleGastos.Exception;

public class NotFoundException : SisControlException
{
    public NotFoundException(string message) : base(message)
    {
    }

    public override IList<string> GetErrorMessages()
    {
        return [Message];
    }

    public override HttpStatusCode GetStatusCode()
    {
        return HttpStatusCode.NotFound;
    }
}