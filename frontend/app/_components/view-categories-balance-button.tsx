"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ViewCategoriesBalanceButton = () => {
  const router = useRouter();

  const handleRouter = () => {
    router.push("/categories/balance");
  };

  return (
    <>
      <Button
        className="rounded-full bg-blue-500 font-bold hover:bg-blue-600"
        onClick={() => handleRouter()}
      >
        Visualizar Saldo por Categoria
      </Button>
    </>
  );
};

export default ViewCategoriesBalanceButton;
