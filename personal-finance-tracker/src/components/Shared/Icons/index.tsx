import {
  FaCar,
  FaHeart,
  FaQuestionCircle,
  FaUniversity,
  FaUtensils,
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import { LuPartyPopper } from "react-icons/lu";
import {
  MdOutlineAttachMoney,
  MdOutlineSportsSoccer,
  MdOutlineWork,
} from "react-icons/md";

const getIcon = (type: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    food: <FaUtensils />,
    transport: <FaCar />,
    clothes: <GiClothes />,
    education: <FaUniversity />,
    investments: <MdOutlineAttachMoney />,
    home: <FaHouse />,
    social: <LuPartyPopper />,
    sports: <MdOutlineSportsSoccer />,
    work: <MdOutlineWork />,
    health: <FaHeart />,
  };

  return iconMap[type] || <FaQuestionCircle />;
};
export default getIcon;
