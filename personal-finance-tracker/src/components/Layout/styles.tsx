import { styled } from "styled-components";

export const LayoutContainer = styled.div`
  height: 100%;
`;

export const NavbarWrapper = styled.div`
  height: 5%;
`;

export const MainContent = styled.main`
  height: 95%;
  margin: 6rem 1rem;
  width: auto;

  @media (max-width: 768px) {
    margin: 1rem 1rem;
  }
`;
