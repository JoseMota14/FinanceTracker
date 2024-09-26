import React from "react";
import { IconType } from "react-icons";
import { ButtonProps } from "../../Shared/Button";
import { ActiveIndicator, IconWrapper, StyledButton } from "./styles";

interface NavbarItemProps<T> extends ButtonProps {
  isActive: boolean;
  Icon?: T;
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps<IconType>> = ({
  label,
  isActive,
  Icon,
  ...rest
}) => {
  return (
    <StyledButton isActive={isActive} {...rest}>
      <IconWrapper isActive={isActive}>
        {Icon && <Icon size={22} />}
        {label}
      </IconWrapper>
      <ActiveIndicator isActive={isActive} />
    </StyledButton>
  );
};

export default NavbarItem;
