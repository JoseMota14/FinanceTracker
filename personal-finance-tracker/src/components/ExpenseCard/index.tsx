import { Transaction } from "../../entities/Transaction";
import {
  Amount,
  Card,
  CardFooter,
  CardHeader,
  Date,
  Description,
  Type,
} from "./styles";

interface CardProps<T> {
  data: T;
}

export default function ExpenseCard({ data }: CardProps<Transaction>) {
  return (
    <Card>
      <CardHeader>
        <Description>{data.description}</Description>
        <Amount type={data.type}>${data.value.toFixed(2)}</Amount>
      </CardHeader>
      <CardFooter>
        <Date>{data.purchaseDate}</Date>
        <Type type={data.type}>{data.type}</Type>
      </CardFooter>
    </Card>
  );
}
