import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CategorySchema,
  Transaction,
  TransactionEdit,
  TransactionEditSchema,
} from "../../../../entities/Transaction";
import { Button } from "../../../Shared/Button";
import { Error, FormContainer, Input, Label, Select } from "./styles";

interface TransactionEditFormProps {
  transaction: Transaction;
  onSubmit: (updatedTransaction: TransactionEdit) => void;
  onCancel: () => void;
}

export default function TransactionEditForm({
  transaction,
  onSubmit,
  onCancel,
}: TransactionEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionEdit>({
    resolver: zodResolver(TransactionEditSchema),
    defaultValues: {
      category: transaction.category,
      purchaseDate: transaction.purchaseDate,
      value: transaction.value,
      type: transaction.type,
      description: transaction.description,
    },
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Label>Category</Label>
      <Select {...register("category")}>
        {CategorySchema.options.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
      {errors.category && <Error>{errors.category.message}</Error>}

      <Label>Purchase Date</Label>
      <Input
        type="date"
        {...register("purchaseDate", { valueAsDate: false })}
      />
      {errors.purchaseDate && <Error>{errors.purchaseDate.message}</Error>}

      <Label>Value</Label>
      <Input type="number" {...register("value", { valueAsNumber: true })} />
      {errors.value && <Error>{errors.value.message}</Error>}

      <Label>Type</Label>
      <Select {...register("type")}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </Select>
      {errors.type && <Error>{errors.type.message}</Error>}

      <Label>Description (Optional)</Label>
      <Input {...register("description")} />
      {errors.description && <Error>{errors.description.message}</Error>}

      <Button type="submit">Update Transaction</Button>
      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
    </FormContainer>
  );
}
