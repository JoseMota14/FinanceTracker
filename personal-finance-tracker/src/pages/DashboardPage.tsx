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
      back: formatCurrency(clothesData.sum),
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
    <>
      <Cards>
        <List>
          <Flip
            front={clothesCard.front}
            back={clothesCard.back}
            details={clothesCard.details}
          />
          <Flip front={"front"} back={"back"} details={"details"} />
        </List>
        <List>
          <Flip front={"front"} back={"back"} details={"details"} />
        </List>
      </Cards>
    </>
  );
}

const Cards = styled.div`
  background-color: #edf2f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Item = styled.ul`
  border-radius: 5px;
  padding: 0px;
  &:hover {
    transform: scale(1.1);
  }
`;

const List = styled.li`
  list-style: none;
  @media (min-width: 1024px) {
    display: flex;
  }
`;
