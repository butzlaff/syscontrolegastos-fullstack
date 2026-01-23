"use client";

import React from "react";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async () => {
    await router.push("/transactions");
  };

  return (
    <div className="grid h-full grid-cols-2">
      <div className="h-full w-full">
        <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8 text-white">
          <h1 className="mb-8 text-4xl font-bold">Bem-vindo</h1>
          <p className="mb-3 text-muted-foreground">
            O SysControleGastos é uma plataforma de gestão financeira que ajuda
            você a organizar suas finanças pessoais de forma simples e
            eficiente.
          </p>
          <p className="mb-8 text-muted-foreground">
            Com ele, você pode cadastrar suas receitas e despesas, acompanhar o
            saldo da sua conta para monitorar suas movimentações, e oferecer
            insights personalizados, facilitando o controle do seu orçamento.
          </p>
          <p onClick={handleLogin}>
            <Button variant="outline" color="black">
              <LogInIcon className="mr-2" />
              Entrar
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
