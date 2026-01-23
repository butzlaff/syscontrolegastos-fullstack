using SysControleGastos.Communication.Responses;

namespace SysControleGastos.Application.Interfaces;

public interface IGetPersonsBalanceUseCase
{
    ResponsePersonsBalanceReportJson Execute();
}