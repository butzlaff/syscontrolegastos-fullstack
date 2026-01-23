using System.Text.Json.Serialization;

namespace SysControleGastos.Domain.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum CategoryPurpose
{
    Receita,
    Despesa,
    Ambas
}