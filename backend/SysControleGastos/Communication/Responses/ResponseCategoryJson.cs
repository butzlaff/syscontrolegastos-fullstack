using SysControleGastos.Domain.Enums;

namespace SysControleGastos.Communication.Responses;

public class ResponseCategoryJson
{
    public Guid Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public CategoryPurpose Purpose { get; set; }
}
