import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { CiUser } from "react-icons/ci";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/download.svg";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import Switcher from "../Switcher";
import NavbarItem from "./NavItem";
import { Dropdown, DropdownItem, Nav, UserIcon } from "./styles";

interface LinkProps<T> {
  label: string;
  path: string;
  icon?: T;
}

const links: LinkProps<IconType>[] = [
  { label: "Dashboard", path: "/", icon: MdDashboard },
  { label: "Transactions", path: "/transactions", icon: GrTransaction },
];

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  const { theme } = useTheme();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSettingsClick = () => {
    // Navigate to settings page or open settings modal
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef}>
      <UserIcon onClick={() => setIsOpen(!isOpen)}>
        <CiUser color={theme === "dark" ? "white" : "black"} size={24} />
      </UserIcon>
      {isOpen && (
        <Dropdown>
          <DropdownItem onClick={handleSettingsClick}>
            <FiSettings /> Settings
          </DropdownItem>
          <DropdownItem onClick={handleLogoutClick}>
            <FiLogOut /> Logout
          </DropdownItem>
        </Dropdown>
      )}
    </div>
  );
};

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
      Icon={link.icon}
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        handleItemClick(link.path, event)
      }
    />
  ));

  return (
    <Nav>
      <img
        src={logo}
        alt="logo"
        width="40px"
        height="40px"
        className="navbar-logo"
        style={{ borderRadius: "10px" }}
      />
      {renderedLinks}
      <Switcher />
      <UserDropdown />
    </Nav>
  );
}
