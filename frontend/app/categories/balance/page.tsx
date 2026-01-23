import { DataTable } from "../../_components/ui/data-table";
import NavigationButtons from "../../_components/navigations-buttons";
import { getCategoriesBalance } from "@/app/_actions/category";
import { categoryBalanceColumns } from "./_columns";

const CategoriesBalancePage = async () => {
  const balance = await getCategoriesBalance();

  const {
    totalIncomeOverall,
    totalExpenseOverall,
    balanceOverall,
    categories,
  } = balance;

  const income = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalIncomeOverall);

  const expense = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalExpenseOverall);

  const BalanceFinal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(balanceOverall);

  return (
    <div>
      <NavigationButtons />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-start justify-between">
          <h1 className="text-2xl font-bold">Saldo das Pessoas</h1>
        </div>
        <DataTable columns={categoryBalanceColumns} data={categories} />

        <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg border p-4 text-right">
          <div>
            <p className="text-sm text-muted-foreground">Receitas</p>
            <p>{income}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Despesas</p>
            <p>{expense}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Saldo Geral</p>
            <p className="font-bold">{BalanceFinal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesBalancePage;
