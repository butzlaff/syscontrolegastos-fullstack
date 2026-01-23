
using SysControleGastos.Communication.Requests;
using SysControleGastos.Communication.Responses;

namespace SysControleGastos.Application.Interfaces;

public interface IPersonRegisterRepository
{
    ResponsePersonJson Execute(RequestPersonJson person);
}
