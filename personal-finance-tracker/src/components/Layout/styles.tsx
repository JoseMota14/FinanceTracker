import { styled } from "styled-components";

export const LayoutContainer = styled.div`
  height: 100%;
`;

export const NavbarWrapper = styled.div`
  height: auto;
`;

export const MainContent = styled.main`
  padding-top: 60px;
  margin-left: 1rem;
  width: auto;

  @media (max-width: 768px) {
    margin-left: 1rem;
    padding-bottom: 60px;
    padding-top: 0px;
  }
`;
