import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { Transaction } from "../../entities/Transaction";
import { useDeleteTransactionMutation } from "../../store/transactions/TransactionsApi";
import { notifyError, notifySuccess } from "../../utils/Notify";
import getIcon from "../Shared/Icons";
import {
  Amount,
  Buttons,
  Card,
  CardFooter,
  CardHeader,
  Date,
  Description,
  ToggleButton,
  Type,
} from "./styles";

gsap.registerPlugin(ScrollTrigger);

interface CardProps<T> {
  data: T;
  onSelect: (transaction: Transaction) => void;
}

export default function ExpenseCard({
  data,
  onSelect,
}: CardProps<Transaction>) {
  const transactionRef = useRef(null);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteTransaction] = useDeleteTransactionMutation();

  const deleteData = async (id: string) => {
    try {
      await deleteTransaction({
        id,
      }).unwrap();
      notifySuccess("Transaction delete successfully!");
    } catch (error) {
      notifyError("Failed to delete the transaction.");
    }
  };

  useEffect(() => {
    const element = transactionRef.current;
    gsap.from(element, {
      opacity: 0,
      xPercent: -100,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 40%",
        scrub: true,
      },
    });
  }, []);

  return (
    <Card ref={transactionRef}>
      <CardHeader>
        {getIcon(data.category?.toLowerCase())}
        <Description>{data.description}</Description>
        <Amount type={data.type}>${data.value.toFixed(2)}</Amount>
        <Buttons>
          <ToggleButton>
            {/* <ToggleButton onClick={() => onSelect(data)}> */}
            <Link to={`/transactions/edit/${data.transactionId}`}>
              <MdEdit style={{ color: "black" }} />
            </Link>
          </ToggleButton>
          <ToggleButton onClick={() => deleteData(data.transactionId)}>
            <MdDelete />
          </ToggleButton>
          <ToggleButton onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <FaChevronUp /> : <FaChevronDown />}
          </ToggleButton>
        </Buttons>
      </CardHeader>

      {showDetails && (
        <CardFooter>
          <Date>{data.purchaseDate}</Date>
          <Type type={data.type}>{data.type}</Type>
        </CardFooter>
      )}
    </Card>
  );
}
