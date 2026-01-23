"use client";

import { ColumnDef } from "@tanstack/react-table";

export interface PersonBalanceListItem {
  personId: string;
  personName: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export const personBalanceColumns: ColumnDef<PersonBalanceListItem>[] = [
  {
    accessorKey: "personName",
    header: "Pessoa",
  },
  {
    accessorKey: "totalReceitas",
    header: "Receitas",
    cell: ({ row }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(row.original.totalIncome),
  },
  {
    accessorKey: "totalDespesas",
    header: "Despesas",
    cell: ({ row }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(row.original.totalExpense),
  },
  {
    accessorKey: "balance",
    header: "Saldo",
    cell: ({ row }) => {
      const balance = row.original.balance;

      return (
        <span
          className={
            balance >= 0
              ? "font-semibold text-green-600"
              : "font-semibold text-red-600"
          }
        >
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(balance)}
        </span>
      );
    },
  },
];
