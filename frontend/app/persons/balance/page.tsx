import { DataTable } from "../../_components/ui/data-table";
import NavigationButtons from "../../_components/navigations-buttons";
import { personBalanceColumns } from "./_columns";
import { getPersonsBalance } from "@/app/_actions/person";

const PersonsBalancePage = async () => {
  const balance = await getPersonsBalance();

  const {
    totalIncomeOverall: totalReceitasGeral,
    totalExpenseOverall: totalDespesasGeral,
    balanceOverall: saldoGeral,
    persons,
  } = balance;

  const receitas = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalReceitasGeral);

  const despesas = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalDespesasGeral);

  const saldoFinal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(saldoGeral);

  return (
    <div>
      <NavigationButtons />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-start justify-between">
          <h1 className="text-2xl font-bold">Saldo das Pessoas</h1>
        </div>
        <DataTable columns={personBalanceColumns} data={persons} />

        <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg border p-4 text-right">
          <div>
            <p className="text-sm text-muted-foreground">Receitas</p>
            <p>{receitas}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Despesas</p>
            <p>{despesas}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Saldo Geral</p>
            <p className="font-bold">{saldoFinal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonsBalancePage;
