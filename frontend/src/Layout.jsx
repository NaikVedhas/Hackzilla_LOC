import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./ScrollToTop";

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="pt-[70px]"> {/* Adjust padding to match the height of the navbar */}
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
