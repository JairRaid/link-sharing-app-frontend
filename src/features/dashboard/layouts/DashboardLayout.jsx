import { Outlet, useLocation } from "react-router";
import MenuBar from "../components/MenuBar/MenuBar";
import PhoneMockup from "../components/PhoneMockup/PhoneMockup";
import "./DashboardLayout.css";
import { useMemo } from "react";

const DashboardLayout = () => {
  const location = useLocation();
  const activeTab = useMemo(() => {
    if (location.pathname.startsWith("/profile")) return "profile";
    return "links";
  }, [location.pathname]);

  return (
    <div className={`dashboard-layout`}>
      <MenuBar />

      <main className="dashboard-layout__main">
        <PhoneMockup />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
