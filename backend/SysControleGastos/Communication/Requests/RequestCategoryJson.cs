using SysControleGastos.Domain.Enums;

namespace SysControleGastos.Communication.Requests;

public class RequestCategoryJson
{
    public string Description { get; set; }
    public CategoryPurpose Purpose { get; set; }
}
