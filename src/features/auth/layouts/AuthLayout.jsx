import { Outlet } from "react-router";
import "./AuthLayout.css";

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
