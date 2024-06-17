import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function NavbarRoute() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  );
}

export default NavbarRoute;