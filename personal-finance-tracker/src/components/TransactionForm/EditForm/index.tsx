import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Transaction, TransactionEdit } from "../../../entities/Transaction";
import { RootState } from "../../../store";
import { useUpdateTransactionMutation } from "../../../store/transactions/TransactionsApi";
import { notifyError, notifySuccess } from "../../../utils/Notify";
import TransactionEditForm from "./TransitionEditForm";

export default function EditTransactionPage() {
  const { transactionId } = useParams<{ transactionId: string }>();
  const navigate = useNavigate();

  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );

  const transaction: Transaction | undefined = transactions.find(
    (t: Transaction) => t.transactionId === transactionId
  );

  useEffect(() => {
    if (!transaction) {
      navigate("/transactions");
    }
  }, [transaction, navigate]);

  const [updateTransaction] = useUpdateTransactionMutation();

  const handleUpdateTransaction = async (
    updatedTransaction: TransactionEdit
  ) => {
    try {
      await updateTransaction({
        id: transaction!.transactionId,
        body: updatedTransaction,
      }).unwrap();
      notifySuccess("Transaction updated successfully!");
      navigate("/transactions");
    } catch (error) {
      notifyError("Failed to update the transaction.");
    }
  };

  const handleCancel = () => {
    navigate("/transactions");
  };

  return (
    <div>
      <h1>Edit Transaction</h1>
      <TransactionEditForm
        transaction={transaction!}
        onSubmit={handleUpdateTransaction}
        onCancel={handleCancel}
      />
    </div>
  );
}
