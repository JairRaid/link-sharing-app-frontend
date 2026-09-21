import "./Button.css";

const Button = ({ text, icon = "", ...props }) => {
  return (
    <button {...props}>
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Button;
