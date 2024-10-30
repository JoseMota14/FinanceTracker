import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  CategorySchema,
  TransactionAdd,
  TransactionAddSchema,
} from "../../entities/Transaction";
import { useAddTransactionMutation } from "../../store";
import { Error, Form, Input, Label, Select, SubmitButton } from "./styles";

interface TransactionFormProps {
  setIsFormVisible: (value: boolean) => void;
}

export default function TransactionForm({
  setIsFormVisible,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionAdd>({
    resolver: zodResolver(TransactionAddSchema),
  });

  const modalRef = useRef<HTMLFormElement>(null);

  const [addTransaction] = useAddTransactionMutation();

  const onCancel = () => {
    setIsFormVisible(false);
  };

  const handleAddExpense = async (values: TransactionAdd) => {
    try {
      await addTransaction({ body: values }).unwrap();
      setIsFormVisible(false);
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  };

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsFormVisible(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return (
    <Form ref={modalRef} onSubmit={handleSubmit(handleAddExpense)}>
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

      <SubmitButton type="submit">Submit Transaction</SubmitButton>
      <SubmitButton type="button" onClick={onCancel}>
        Cancel Transaction
      </SubmitButton>
    </Form>
  );
}
