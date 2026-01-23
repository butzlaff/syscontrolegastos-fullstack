import { DataTable } from "../_components/ui/data-table";
import AddTransactionButton from "../_components/add-transaction-button";
import { transactionColumns } from "./_columns";
import { getAllTransactions } from "../_actions/transaction";
import NavigationButtons from "../_components/navigations-buttons";

const TransactionsPage = async () => {
  const transactions = await getAllTransactions();

  const serializedTransactions = transactions.map((t) => ({
    ...t,
    date: new Date(t.date).toISOString(),
  }));

  return (
    <div>
      <NavigationButtons />
      <div className="space-y-6 p-6">
        <div className="itens-center flex w-full justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable columns={transactionColumns} data={serializedTransactions} />
      </div>
    </div>
  );
};

export default TransactionsPage;
