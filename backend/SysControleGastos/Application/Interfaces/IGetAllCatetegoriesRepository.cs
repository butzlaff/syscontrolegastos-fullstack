using SysControleGastos.Communication.Responses;

namespace SysControleGastos.Application.Interfaces;

public interface IGetAllCatetegoriesRepository
{
    IList<ResponseCategoryJson> Execute();
}
