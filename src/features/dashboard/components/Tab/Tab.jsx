import { Link } from "react-router";
import "./Tab.css";

const Tab = ({ text, href, icon, isActive = false }) => {
  return (
    <Link to={href} className={`tab ${isActive ? "tab--active" : ""}`}>
      {icon}
      <span className={isActive ? "text-purple-600!" : ""}>{text}</span>
    </Link>
  );
};

export default Tab;
