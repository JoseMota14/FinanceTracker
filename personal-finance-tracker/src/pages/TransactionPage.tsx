import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ExpenseCard from "../components/ExpenseCard";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../entities/Transaction";
import { AppDispatch, RootState, useGetTransactionsQuery } from "../store";
import { setTransactions } from "../store/transactions/TransactionsSlice";
import { notifyError } from "../utils/Notify";

export default function TransactionPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );

  const {
    data: fetchTransactions,
    isLoading,
    error,
  } = useGetTransactionsQuery();

  useEffect(() => {
    if (error) {
      notifyError("Error while fetching transactions");
    } else if (fetchTransactions) {
      dispatch(setTransactions(fetchTransactions));
    }
  }, [fetchTransactions, error, dispatch]);

  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const handleAddExpense = (data: Transaction) => {
    const newExpense: Transaction = {
      ...data,
    };
    setExpenses([...expenses, newExpense]);
  };

  return (
    <Container>
      <TransactionForm onSubmit={handleAddExpense} />
      {expenses.map((tr) => (
        <ExpenseCard data={tr} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;
