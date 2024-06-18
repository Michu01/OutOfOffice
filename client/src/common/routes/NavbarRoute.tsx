import { Outlet } from "react-router-dom";
import Navbar from "src/common/components/Navbar";

function NavbarRoute() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  );
}

export default NavbarRoute;