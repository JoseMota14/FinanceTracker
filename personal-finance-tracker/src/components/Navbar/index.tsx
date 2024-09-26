import { IconType } from "react-icons";
import { FaTasks } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarItem from "./NavItem";
import { Nav } from "./styles";

interface LinkProps<T> {
  label: string;
  path: string;
  icon?: T;
}

const links: LinkProps<IconType>[] = [
  { label: "Dashboard", path: "/", icon: MdDashboard },
  { label: "Tasks", path: "/tasks", icon: FaTasks },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

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
      Icon={link.icon ? link.icon : undefined}
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        handleItemClick(link.path, event)
      }
    />
  ));

  return <Nav>{renderedLinks}</Nav>;
}
