import { IconType } from "react-icons";
import { GrTransaction } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import Switcher from "../Switcher";
import NavbarItem from "./NavItem";
import { Nav } from "./styles";
interface LinkProps<T> {
  label: string;
  path: string;
  icon?: T;
}

const links: LinkProps<IconType>[] = [
  { label: "Dashboard", path: "/", icon: MdDashboard },
  { label: "Transactions", path: "/transactions", icon: GrTransaction },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const handleItemClick = (
    path: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (event.metaKey || event.ctrlKey) return;

    event.preventDefault();
    navigate(path);
  };

  const renderedLinks = links.map((link) => (
    <NavbarItem
      key={link.path}
      label={link.label}
      isActive={link.path === location.pathname}
      Icon={link.icon}
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        handleItemClick(link.path, event)
      }
    />
  ));

  return (
    <Nav>
      {renderedLinks}
      <Switcher></Switcher>
    </Nav>
  );
}
