using SysControleGastos.Communication.Requests;
using SysControleGastos.Communication.Responses;

namespace SysControleGastos.Application.Interfaces;

public interface ITransactionRegisterRepository
{
    abstract ResponseTransactionJson Execute(RequestTransactionJson request);
    abstract void Validate(RequestTransactionJson request);
}
