import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import YearMonthPicker from "../components/Shared/Datepicker";
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
    transactionId: "2",
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
];

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

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
      </Header>

      <CategoryBreakdown>
        <CategoryBox>Food: $200</CategoryBox>
        <CategoryBox>Clothing: $100</CategoryBox>
        <CategoryBox>General: $450</CategoryBox>
      </CategoryBreakdown>
    </>
    /* 
      <Row>
        <H1>Transaction Page</H1>
        <Row>
          <Button variant="ghost" onClick={refreshTransactionForm}>
            Refresh
          </Button>
          <Button variant="ghost" onClick={openTransactionForm}>
            Add Transaction
          </Button>
        </Row>
      </Row>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isFormVisible && (
            <Modal>
              <ModalContent>
                <TransactionForm
                  onSubmit={handleAddExpense}
                  onCancel={closeTransactionForm}
                  setIsFormVisible={setIsFormVisible}
                />
              </ModalContent>
            </Modal>
          )}
          {transactions.map((tr) => (
            <ExpenseCard key={tr.transactionId} data={tr} />
          ))}
        </>
      )}
    */
  );
}

const Header = styled.div`
  display: grid;
  grid-template-columns: 10% 30% 30% 30%;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const TotalBox = styled.div<{ type: string; balance?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  span {
    font-size: 1.2rem;
    color: ${(props) =>
      props.type === "income"
        ? "#4CAF50"
        : props.type === "expense"
        ? "#FF3E4D"
        : props.type === "balance" && props.balance !== undefined
        ? props.balance >= 0
          ? "#4CAF50"
          : "#FF3E4D"
        : "#333"};
  }

  font-weight: bold;
`;

const CategoryBreakdown = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
`;

const CategoryBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  flex: 1;
  margin: 0 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
`;

/*
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const H1 = styled.h1`
  font-size: 24px;
  color: ${(props) => props.theme.colors.text};
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
*/
