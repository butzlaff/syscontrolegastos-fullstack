import { DataTable } from "../_components/ui/data-table";
import NavigationButtons from "../_components/navigations-buttons";
import { personColumns } from "./_columns";
import { getAllPersons } from "../_actions/person";
import AddPersonButton from "../_components/add-person-button";
import ViewPersonsBalanceButton from "../_components/view-categories-balance-button";

const PersonsPage = async () => {
  const { persons } = await getAllPersons();
  return (
    <div>
      <NavigationButtons />
      <div className="space-y-6 p-6">
        <div className="itens-center flex w-full justify-between">
          <h1 className="text-2xl font-bold">Pessoas</h1>
          <p className="flex gap-2">
            <ViewPersonsBalanceButton />
            <AddPersonButton />
          </p>
        </div>
        <DataTable columns={personColumns} data={persons} />
      </div>
    </div>
  );
};

export default PersonsPage;
