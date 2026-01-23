using SysControleGastos.Communication.Requests;
using SysControleGastos.Domain.Entities;

namespace SysControleGastos.Application.Interfaces;

public interface ICategoryRegisterRepository
{
    Category Execute(RequestCategoryJson request);
}
