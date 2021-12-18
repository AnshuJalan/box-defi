interface ButtonProps {
  text: string;
  textColor?: string;
  textSize?: string;
  icon: string;
  iconColor?: string;
  iconSize?: string;
  background: string;
  disabled?: boolean;
  onClick: Function;
}

const Button: React.FC<ButtonProps> = ({
  text,
  textColor,
  textSize = "text-lg",
  icon,
  iconColor,
  iconSize = "text-xl",
  disabled = false,
  background,
  onClick,
}) => {
  return (
    <div
      onClick={() => {
        if (!disabled) onClick();
      }}
      className={`rounded-lg px-3 py-2 flex items-center font-medium ${
        disabled ? "opacity-50" : "hover:opacity-75 transition-opacity duration-200 cursor-pointer"
      } ${background} ${textColor} ${textSize}`}
    >
      <i className={`bi bi-${icon} ${iconColor} ${iconSize} mr-4`}></i>
      <span>{text}</span>
    </div>
  );
};

export default Button;
