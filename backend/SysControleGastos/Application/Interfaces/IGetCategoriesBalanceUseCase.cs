using SysControleGastos.Communication.Responses;

namespace SysControleGastos.Application.Interfaces;

public interface IGetCategoriesBalanceUseCase
{
   ResponseCategoriesBalanceReportJson Execute();
}