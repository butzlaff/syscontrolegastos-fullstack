export enum TransactionType {
  DESPESA = "DESPESA",
  RECEITA = "RECEITA",
}

export interface ITransaction {
  id?: string;
  description: string;
  amount: number;
  date: Date;
  transactionType: TransactionType;
  categoryId: string;
  personId: string;
}
