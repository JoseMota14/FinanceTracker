import { styled } from "styled-components";

export const LayoutContainer = styled.div`
  height: 100vh;
  // overflow: hidden;
  @media (max-width: 768px) {
    overflow: visible;
  }
`;

export const NavbarWrapper = styled.div`
  height: auto;
  flex-shrink: 0;
`;

export const MainContent = styled.main`
  padding-top: 60px;
  width: auto;
  @media (max-width: 768px) {
    padding-bottom: 60px;
    padding-top: 0px;
  }
`;
