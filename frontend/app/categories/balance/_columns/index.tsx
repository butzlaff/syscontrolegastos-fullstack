"use client";

import { ColumnDef } from "@tanstack/react-table";

export interface CategoriesBalanceListItem {
  categoryId: string;
  categoryDescription: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export const categoryBalanceColumns: ColumnDef<CategoriesBalanceListItem>[] = [
  {
    accessorKey: "categoryDescription",
    header: "Categoria",
  },
  {
    accessorKey: "totalIncome",
    header: "Receitas",
    cell: ({ row }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(row.original.totalIncome),
  },
  {
    accessorKey: "totalExpense",
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
