import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../components/Shared/Card/CardNew";
import Flip from "../components/Shared/Flip";
import { AppDispatch, RootState, useGetTransactionsQuery } from "../store";
import { setTransactions } from "../store/transactions/TransactionsSlice";
import { notifyError } from "../utils/Notify";
import {
  calculateCategorySum,
  formatCurrency,
  getCategoryDetails,
} from "../utils/TransactionUtils/Calc";

const getCard = (title: string, category: string, size: "lg" | "sm") => {
  return <Card title={title} category={category} size={size} variant="grey" />;
};

export default function DashboardPage() {
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

  // Calculate sums and prepare card content
  const foodData = useMemo(
    () => ({
      sum: calculateCategorySum(transactions, "food"),
      details: getCategoryDetails(transactions, "food"),
    }),
    [transactions]
  );

  const clothesData = useMemo(
    () => ({
      sum: calculateCategorySum(transactions, "clothes"),
      details: getCategoryDetails(transactions, "clothes"),
    }),
    [transactions]
  );

  const otherData = useMemo(
    () => ({
      sum: calculateCategorySum(transactions, "other"),
      details: getCategoryDetails(transactions, "other"),
    }),
    [transactions]
  );

  const clothesCard = useMemo(
    () => ({
      front: <div>a</div>,
      back: <div>{formatCurrency(clothesData.sum)}</div>,
      details: (
        <ul>
          {clothesData.details.map((item, index) => (
            <li key={index}>
              {item.date}: {item.value} - {item.description}
            </li>
          ))}
        </ul>
      ),
    }),
    [clothesData]
  );

  return (
    <Cards>
      <Li>
        <Category color={"red"}>Expenses</Category>
        <List>
          <Flip
            front={clothesCard.front}
            back={clothesCard.back}
            details={clothesCard.details}
          />
          <Flip front={"front"} back={"back"} details={"details"} />
        </List>
      </Li>
      <Li>
        <Category color={"green"}>Incomes</Category>
        <List>
          <Flip front={"front"} back={"back"} details={"details"} />
        </List>
      </Li>
    </Cards>
  );
}

const Cards = styled.div`
  height: 100vh;
  background-color: var(--background-dashboard);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const List = styled.div`
  height: 25vh;
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
  border-radius: 8px;
  background-color: var(--dashboard-item);
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Li = styled.div`
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--dashboard-item);
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
`;

const Category = styled.span<{ color: string }>`
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.5rem;
  font-weight: bold;
  color: white;
  background-color: ${(props) => props.color};
  opacity: 0.4;
  border-radius: 5px;
`;
