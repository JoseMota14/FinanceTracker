import { z } from "zod";

export interface TransactionObj {
  transactionId: string;
  category: Category;
  purchaseDate: Date;
  value: Number;
  type: Type;
  description?: string;
}

export type Category = "Food" | "Clothes" | "General";

export type Type = "income" | "expense";

export const CategorySchema = z.enum(["Food", "Clothes", "General"]);

export const TypeSchema = z.enum(["income", "expense"]);

export const TransactionSchema = z.object({
  transactionId: z.string(),
  category: CategorySchema,
  purchaseDate: z.string(),
  value: z.number().min(0, { message: "Value must be a positive number" }),
  type: TypeSchema,
  description: z.string().optional(),
});

export const TransactionAddSchema = z.object({
  category: CategorySchema,
  purchaseDate: z.string(),
  value: z.number().min(0, { message: "Value must be a positive number" }),
  type: TypeSchema,
  description: z.string().optional(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionAdd = z.infer<typeof TransactionAddSchema>;
