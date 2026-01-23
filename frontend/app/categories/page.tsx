import { DataTable } from "../_components/ui/data-table";
import { categoryColumns } from "./_columns";
import NavigationButtons from "../_components/navigations-buttons";
import AddCategoryButton from "../_components/add-category-button";
import { getAllCategories } from "../_actions/category";
import ViewCategoriesBalanceButton from "../_components/view-categories-balance-button";

const CategoriesPage = async () => {
  const categories = await getAllCategories();

  return (
    <div>
      <NavigationButtons />
      <div className="space-y-6 p-6">
        <div className="itens-center flex w-full justify-between">
          <h1 className="text-2xl font-bold">Categorias</h1>
          <p className="flex gap-2">
            <ViewCategoriesBalanceButton />
            <AddCategoryButton />
          </p>
        </div>
        <DataTable columns={categoryColumns} data={categories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
