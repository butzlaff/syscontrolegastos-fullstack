import { z } from "zod";
import { Purpose } from '../../_components/_types/purpose';


export const upsertCategorySchema = z.object({
  description: z.string().min(1, "A descrição é obrigatória"),
  purpose: z.nativeEnum(Purpose, {
    errorMap: () => ({ message: "A finalidade da categoria é obrigatório" }),
  }),
});


export const getAllCategoriesSchema = z.array(
  z.object({
    id: z.string().uuid(),
    description: z.string(),
    purpose: z.nativeEnum(Purpose),
  })
);

export const categoryBalanceSchema = z.object({
  categoryId: z.string().uuid(),
  categoryDescription: z.string(),
  totalIncome: z.number(),
  totalExpense: z.number(),
  balance: z.number(),
});

export const categoriesBalanceReportSchema = z.object({
  categories: z.array(categoryBalanceSchema),
  totalIncomeOverall: z.number(),
  totalExpenseOverall: z.number(),
  balanceOverall: z.number(),
});

export type CategoryList = z.infer<typeof getAllCategoriesSchema>;

export type CategoryBalance = z.infer<typeof categoryBalanceSchema>;

export type CategoriesBalanceReport = z.infer<
  typeof categoriesBalanceReportSchema
>;