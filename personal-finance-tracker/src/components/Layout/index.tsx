import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { LayoutContainer, MainContent, NavbarWrapper } from "./styles";

export default function Layout() {
  return (
    <LayoutContainer>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
}
