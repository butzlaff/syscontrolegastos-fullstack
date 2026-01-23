import { z } from "zod";
import { TransactionType } from '@/app/_components/_types/type_transaction';

export const upsertTransactionSchema = z.object({
  description: z.string().min(1, "A descrição é obrigatória"),
  amount: z
    .number({ invalid_type_error: "O valor deve ser um número" })
    .positive("O valor deve ser positivo"),
  date: z.string({ invalid_type_error: "A data é obrigatória" }),
  transactionType: z.nativeEnum(TransactionType, {
    errorMap: () => ({ message: "A finalidade da transação é obrigatória" }),
  }),
  categoryId: z.string().uuid("A categoria é obrigatória"),
  personId: z.string().uuid("O usuário é obrigatório"),
});

export interface TransactionDetails {
  id: string;
  description: string;
  amount: number;
  date: string;
  transactionType: TransactionType;
  personId: string;
  personName: string;
  categoryId: string;
  categoryName: string;
}

export type TransactionList = z.infer<typeof upsertTransactionSchema>;
