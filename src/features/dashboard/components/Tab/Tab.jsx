import "./Tab.css";

const Tab = ({ text, href, icon, isActive = false }) => {
  return (
    <a href={href} className={`tab ${isActive ? "tab--active" : ""}`}>
      {icon}
      <span className={isActive ? "text-purple-600!" : ""}>{text}</span>
    </a>
  );
};

export default Tab;
