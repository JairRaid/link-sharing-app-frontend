import "./Button.css";

const Button = ({ text, ...props }) => {
  return <button {...props}>{text}</button>;
};

export default Button;
