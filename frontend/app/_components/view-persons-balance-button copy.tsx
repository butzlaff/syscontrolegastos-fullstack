"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ViewPersonsBalanceButton = () => {
  const router = useRouter();

  const handleRouter = () => {
    router.push("/persons/balance");
  };

  return (
    <>
      <Button
        className="rounded-full bg-blue-500 font-bold hover:bg-blue-600"
        onClick={() => handleRouter()}
      >
        Visualizar Saldo por Pessoa
      </Button>
    </>
  );
};

export default ViewPersonsBalanceButton;
