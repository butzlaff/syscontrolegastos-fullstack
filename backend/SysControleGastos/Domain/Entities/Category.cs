using SysControleGastos.Domain.Enums;

namespace SysControleGastos.Domain.Entities;

public class Category
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Description { get; set; } = string.Empty;
    public CategoryPurpose Purpose { get; set; }

}
