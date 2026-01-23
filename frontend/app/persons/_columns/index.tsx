"use client";

import { ColumnDef } from "@tanstack/react-table";
import DeletePersonButton from "@/app/_components/delete-person-button";

export interface PersonListItem {
  id: string;
  name: string;
  age: number;
}

export const personColumns: ColumnDef<PersonListItem>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "age",
    header: "Idade",
    cell: ({ row }) => `${row.original.age} anos`,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <DeletePersonButton id={row.original.id} />
      </div>
    ),
  },
];
