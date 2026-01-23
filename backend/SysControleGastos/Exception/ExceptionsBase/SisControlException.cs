using System.Net;

namespace SysControleGastos.Exception;

public abstract class SisControlException : SystemException
{
    public SisControlException(string message) : base(message)
    {

    }

    public abstract HttpStatusCode GetStatusCode();
    public abstract IList<string> GetErrorMessages();
}
