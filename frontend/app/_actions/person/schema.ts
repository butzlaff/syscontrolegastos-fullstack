import { z } from "zod";

export const upsertPersonSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  age: z
    .number({ invalid_type_error: "O valor deve ser um número" })
});


export const getAllPersonsSchema = z.object({
  persons: z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    age: z.number(),
  }),
),
});

export const deletePersonSchema = z.object({
  id: z.string().uuid("Id da pessoa inválido"),
});

export const deletePersonResponseSchema = z.object({
  success: z.boolean(),
});

export const personBalanceSchema = z.object({
  personId: z.string().uuid(),
  personName: z.string(),
  totalIncome: z.number(),
  totalExpense: z.number(),
  balance: z.number(),
});

export const personsBalanceReportSchema = z.object({
  persons: z.array(personBalanceSchema),
  totalIncomeOverall: z.number(),
  totalExpenseOverall: z.number(),
  balanceOverall: z.number(),
});


export type PersonList = z.infer<typeof getAllPersonsSchema>;

export type DeletePersonInput = z.infer<typeof deletePersonSchema>;

export type PersonBalance = z.infer<typeof personBalanceSchema>;

export type PersonsBalanceReport = z.infer<
  typeof personsBalanceReportSchema
>;
