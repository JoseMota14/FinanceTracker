import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ExpenseCard from "../components/ExpenseCard";
import { Button } from "../components/Shared/Button";
import YearMonthPicker from "../components/Shared/Datepicker";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../entities/Transaction";
import { AppDispatch, RootState, useGetTransactionsQuery } from "../store";
import { setTransactions } from "../store/transactions/TransactionsSlice";
import { notifyError } from "../utils/Notify";

const transactionsMock: Transaction[] = [
  {
    transactionId: "1",
    category: "Food",
    purchaseDate: "2024-10-01",
    value: 50,
    type: "expense",
    description: "Groceries",
  },
  {
    transactionId: "22",
    category: "Food",
    purchaseDate: "2024-10-01",
    value: 50,
    type: "expense",
    description: "Groceries",
  },
  {
    transactionId: "25",
    category: "Clothes",
    purchaseDate: "2024-10-03",
    value: 100,
    type: "expense",
    description: "New shoes",
  },
  {
    transactionId: "3",
    category: "General",
    purchaseDate: "2024-10-05",
    value: 150,
    type: "income",
    description: "Salary",
  },
  {
    transactionId: "4",
    category: "Food",
    purchaseDate: "2024-09-21",
    value: 75,
    type: "expense",
    description: "Restaurant",
  },
  {
    transactionId: "24",
    category: "Clothes",
    purchaseDate: "2024-10-10",
    value: 501,
    type: "expense",
    description: "Groceries",
  },
];

export default function TransactionPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );

  const {
    data: fetchTransactions,
    isLoading,
    error,
    refetch,
  } = useGetTransactionsQuery();

  useEffect(() => {
    if (error) {
      notifyError("Error while fetching transactions");
    } else if (fetchTransactions) {
      dispatch(setTransactions(fetchTransactions));
    }
  }, [fetchTransactions, error, dispatch]);

  // const handleAddExpense = (data: Transaction) => {
  //   const newExpense: Transaction = {
  //     ...data,
  //   };
  //   dispatch(setTransactions([...transactions, newExpense])); // Dispatching the updated transactions
  //   setIsFormVisible(false); // Hide the form after successful submission
  // };

  const [isFormVisible, setIsFormVisible] = useState(false);

  const openTransactionForm = () => {
    setIsFormVisible(true); // Show the form when clicking "Add Transaction"
  };

  const refreshTransactionForm = () => {
    dispatch(refetch);
  };

  useEffect(() => {
    if (error) {
      notifyError("Error while fetching transactions");
    } else if (fetchTransactions) {
      dispatch(setTransactions(fetchTransactions));
    }
  }, [fetchTransactions, error, dispatch]);

  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0, balance: 0 });
  const [categoryTotals, setCategoryTotals] = useState({
    food: 0,
    clothing: 0,
    general: 0,
  });

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    const filtered = transactionsMock.filter((transaction) => {
      const transactionDate = new Date(transaction.purchaseDate);
      return (
        transactionDate.getMonth() + 1 === month &&
        transactionDate.getFullYear() === year
      );
    });

    setFilteredTransactions(filtered);
    calculateTotals(filtered);
    calculateCategoryTotals(filtered);
  }, [month, year]);

  const calculateTotals = (transactions: Transaction[]) => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.value, 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.value, 0);
    setTotals({ income, expense, balance: income - expense });
  };

  const calculateCategoryTotals = (transactions: Transaction[]) => {
    const food = transactions
      .filter((t) => t.category === "Food" && t.type === "expense")
      .reduce((sum, t) => sum + t.value, 0);
    const clothing = transactions
      .filter((t) => t.category === "Clothes" && t.type === "expense")
      .reduce((sum, t) => sum + t.value, 0);
    const general = transactions
      .filter((t) => t.category === "General" && t.type === "expense")
      .reduce((sum, t) => sum + t.value, 0);
    setCategoryTotals({ food, clothing, general });
  };

  return (
    <>
      <Header>
        <YearMonthPicker
          onYearChange={(selectedYear) => setYear(selectedYear)}
          onMonthChange={(selectedMonth) => setMonth(selectedMonth)}
        />
        <TotalBox type="income">
          Income <span>{totals.income}</span>
        </TotalBox>
        <TotalBox type="expense">
          Expenses <span>{totals.expense}</span>
        </TotalBox>
        <TotalBox type="balance">
          Balance <span>{totals.balance}</span>
        </TotalBox>
        <Row>
          <Button variant="ghost" onClick={refreshTransactionForm}>
            Refresh
          </Button>
          <Button variant="ghost" onClick={openTransactionForm}>
            Add Transaction
          </Button>
        </Row>
      </Header>

      <>
        {isFormVisible && (
          <Modal>
            <ModalContent>
              <TransactionForm setIsFormVisible={setIsFormVisible} />
            </ModalContent>
          </Modal>
        )}
        <TransactionContainer>
          <TransactionContainerType>
            <h4>Expenses</h4>
            {filteredTransactions
              .filter((tr) => tr.type === "expense")
              .map((tr) => (
                <ExpenseCard key={tr.transactionId} data={tr} />
              ))}
          </TransactionContainerType>
          <TransactionContainerType>
            <h4>Income</h4>
            {filteredTransactions
              .filter((tr) => tr.type === "income")
              .map((tr) => (
                <ExpenseCard key={tr.transactionId} data={tr} />
              ))}
          </TransactionContainerType>
        </TransactionContainer>
      </>
    </>
  );
}

const Header = styled.div`
  display: grid;
  grid-template-columns: 11% 23% 23% 23% 20%;
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const TotalBox = styled.div<{ type: string; balance?: number }>`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding-left: 10px;
  justify-content: center;

  span {
    color: ${(props) =>
      props.type === "income"
        ? "#4CAF50"
        : props.type === "expense"
        ? "#FF3E4D"
        : props.type === "balance" && props.balance !== undefined
        ? props.balance >= 0
          ? "#4CAF50"
          : "#FF3E4D"
        : "var(--text-color)"};

    font-weight: bold;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
const TransactionContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: row;
`;

const TransactionContainerType = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 0 1rem;
`;
