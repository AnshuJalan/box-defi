interface ButtonProps {
  text: string;
  textColor?: string;
  icon: string;
  iconColor?: string;
  background: string;
  disabled?: boolean;
  onClick: Function;
}

const Button: React.FC<ButtonProps> = ({ text, textColor, icon, iconColor, disabled = false, background, onClick }) => {
  return (
    <div
      onClick={() => {
        if (!disabled) onClick();
      }}
      className={`rounded-lg px-3 py-2 flex items-center font-medium ${
        disabled ? "opacity-50" : "hover:opacity-75 transition-opacity duration-200 cursor-pointer"
      } ${background} ${textColor}`}
    >
      <i className={`bi bi-${icon} ${iconColor} text-xl mr-4`}></i>
      <span className="text-lg">{text}</span>
    </div>
  );
};

export default Button;
