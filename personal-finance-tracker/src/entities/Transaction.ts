import { z } from "zod";

export interface TransactionObj {
  transactionId: string;
  category: Category;
  purchaceDate: Date;
  value: Number;
  type: Type;
  description?: string;
}

export type Category = "CLOTHES" | "FOOD";

export type Type = "income" | "expense";

export const CategorySchema = z.enum(["CLOTHES", "FOOD"]);

export const TypeSchema = z.enum(["income", "expense"]);

export const TransactionSchema = z.object({
  transactionId: z.string(),
  category: CategorySchema,
  purchaceDate: z.string(),
  value: z.number().min(0, { message: "Value must be a positive number" }),
  type: TypeSchema,
  description: z.string().optional(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
