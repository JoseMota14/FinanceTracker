import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Transaction, TransactionSchema } from "../../entities/Transaction";
import { Error, Form, Input, Label, Select, SubmitButton } from "./styles";

interface TransactionFormProps {
  onSubmit: (data: Transaction) => void;
  onCancel: () => void;
  setIsFormVisible: (value: boolean) => void;
}

export default function TransactionForm({
  onSubmit,
  onCancel,
  setIsFormVisible,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>({
    resolver: zodResolver(TransactionSchema),
  });

  const modalRef = useRef<HTMLFormElement>(null);

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
    <Form ref={modalRef} onSubmit={handleSubmit(onSubmit)}>
      <Label>Transaction ID</Label>
      <Input {...register("transactionId")} />
      {errors.transactionId && <Error>{errors.transactionId.message}</Error>}

      <Label>Category</Label>
      <Select {...register("category")}>
        <option value="CLOTHES">Clothes</option>
        <option value="FOOD">Food</option>
      </Select>
      {errors.category && <Error>{errors.category.message}</Error>}

      <Label>Purchase Date</Label>
      <Input type="date" {...register("purchaseDate", { valueAsDate: true })} />
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
