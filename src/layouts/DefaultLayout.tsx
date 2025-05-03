import { Outlet } from "react-router-dom";
// import DesktopSidebar from "@/components/sidebar/DesktopSideBar";
import { Navbar } from "@/components/Navbar";

const DefaultLayout = () => {


  return (
    <div className="h-svh overflow-hidden">
      {/* <DesktopSidebar /> */}
      <Navbar />
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
