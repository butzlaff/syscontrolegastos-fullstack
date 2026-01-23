"use client";

import { ColumnDef } from "@tanstack/react-table";
import TypeBadge from "./_components/type-badge";
import { TransactionType } from "@/app/_lib/interfaces";
import { TransactionDetails } from "@/app/_actions/transaction/schema";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: Date;
  transactionType: TransactionType;
  categoryId: string;
  categoryDescription: string;
  personId: string;
  personName: string;
}

export const transactionColumns: ColumnDef<TransactionDetails>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "transactionType",
    header: "Tipo",
    cell: ({ row }) => (
      <TypeBadge transactionType={row.original.transactionType} />
    ),
  },
  {
    accessorKey: "categoryName",
    header: "Categoria",
  },
  {
    accessorKey: "personName",
    header: "Pessoa",
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) =>
      new Date(row.original.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(row.original.amount),
  },
];
