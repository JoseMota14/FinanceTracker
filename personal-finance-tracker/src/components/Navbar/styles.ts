// styles/NavbarStyles.ts
import styled from "styled-components";

// Main Navigation Container
export const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  color: white;
  position: fixed;
  width: 100%;
  z-index: 1000;

  background-color: ${(props) => props.theme.colors.background};

  top: 0;

  @media (max-width: 768px) {
    bottom: 0;
    top: auto;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;
`;

export const DropdownItem = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  svg {
    margin-right: 10px;
  }
`;
export const UserIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;
