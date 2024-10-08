import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ExpenseCard from "../components/ExpenseCard";
import Loading from "../components/Loading";
import { Button } from "../components/Shared/Button";
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

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (error) {
      notifyError("Error while fetching transactions");
    } else if (fetchTransactions) {
      dispatch(setTransactions(fetchTransactions));
    }
  }, [fetchTransactions, error, dispatch]);

  const handleAddExpense = (data: Transaction) => {
    const newExpense: Transaction = {
      ...data,
    };
    dispatch(setTransactions([...transactions, newExpense])); // Dispatching the updated transactions
    setIsFormVisible(false); // Hide the form after successful submission
  };

  const openTransactionForm = () => {
    setIsFormVisible(true); // Show the form when clicking "Add Transaction"
  };

  const closeTransactionForm = () => {
    setIsFormVisible(false); // Hide the form on cancel
  };

  return (
    <Container>
      <H1>Transaction Page</H1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Button onClick={openTransactionForm}>Add Transaction</Button>
          {isFormVisible && (
            <Modal>
              <ModalContent>
                <TransactionForm
                  onSubmit={handleAddExpense}
                  onCancel={closeTransactionForm}
                />
              </ModalContent>
            </Modal>
          )}
          {transactions.map((tr) => (
            <ExpenseCard key={tr.transactionId} data={tr} />
          ))}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const H1 = styled.h1`
  font-size: 24px;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;
