"use server";

import { TransactionDetails, upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

enum TransactionType {
  DESPESA = "DESPESA",
  RECEITA = "RECEITA",
}

interface UpsertTransactionProps {
  id?: string;
  description: string;
  amount: number;
  date: string;
  transactionType: TransactionType;
  categoryId: string;
  personId: string;
}

const API_URL = process.env.API_URL;

export const registerTransaction = async (params: UpsertTransactionProps) => {
  upsertTransactionSchema.parse(params);

  const res = await fetch(`${API_URL}/api/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
    cache: "no-store",
  });

  revalidatePath("/transactions");

  if (res.status !== 201) {
    return false;
  }

  return true;
};

export const getAllTransactions = async () : Promise<TransactionDetails[]> => {

  const res = await fetch(`${API_URL}/api/transactions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", 
    },
    cache: "no-store",
  });
  const data = await res.json();

  return data;
};
