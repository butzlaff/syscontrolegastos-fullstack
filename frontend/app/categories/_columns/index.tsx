"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Purpose } from "@/app/_components/_types/purpose";
import { Badge } from "@/app/_components/ui/badge";

export interface CategoryListItem {
  id: string;
  description: string;
  purpose: Purpose;
}

export const CATEGORY_PURPOSE_LABEL: Record<Purpose, string> = {
  [Purpose.RECEITA]: "Receita",
  [Purpose.DESPESA]: "Despesa",
  [Purpose.AMBAS]: "Ambas",
};

export const categoryColumns: ColumnDef<CategoryListItem>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "purpose",
    header: "Finalidade",
    cell: ({ row }) => {
      const purpose = row.original.purpose;

      return (
        <Badge
          variant={
            purpose === Purpose.RECEITA
              ? "default"
              : purpose === Purpose.DESPESA
                ? "destructive"
                : "secondary"
          }
        >
          {CATEGORY_PURPOSE_LABEL[purpose]}
        </Badge>
      );
    },
  },
];
