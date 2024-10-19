import {
  FaCar,
  FaMoneyBillWave,
  FaQuestionCircle,
  FaShoppingCart,
  FaUtensils,
} from "react-icons/fa";
import { GiClothes, GiReceiveMoney } from "react-icons/gi";

const getIcon = (type: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    income: <GiReceiveMoney />,
    expense: <FaShoppingCart />,
    food: <FaUtensils />,
    transport: <FaCar />,
    bill: <FaMoneyBillWave />,
    clothes: <GiClothes />,
  };

  return iconMap[type] || <FaQuestionCircle />;
};
export default getIcon;
