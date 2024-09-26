// styles/NavbarStyles.ts
import styled from "styled-components";

// Main Navigation Container
export const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #333;
  color: white;
  position: fixed;
  width: 100%;
  z-index: 1000;

  top: 0;

  @media (max-width: 768px) {
    bottom: 0;
    top: auto;
  }
`;
