import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Transaction } from "../../entities/Transaction";
import getIcon from "../Shared/Icons";
import {
  Amount,
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
}

export default function ExpenseCard({ data }: CardProps<Transaction>) {
  const transactionRef = useRef(null);
  const [showDetails, setShowDetails] = useState(false);

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
        {getIcon(data.category.toLowerCase())}
        <Description>{data.description}</Description>
        <Amount type={data.type}>${data.value.toFixed(2)}</Amount>
        <ToggleButton onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? <FaChevronUp /> : <FaChevronDown />}
        </ToggleButton>
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
