using System.Text.Json.Serialization;

namespace SysControleGastos.Domain.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TransactionType
{
    RECEITA,
    DESPESA
}
