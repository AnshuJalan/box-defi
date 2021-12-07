interface ButtonProps {
  text: string;
  icon: string;
  iconColor?: string;
  background: string;
  onClick: Function;
}

const Button: React.FC<ButtonProps> = ({ text, icon, iconColor, background, onClick }) => {
  return (
    <div
      onClick={() => onClick()}
      className={`rounded-lg px-3 py-2 flex items-center font-medium hover:opacity-75 transition-opacity duration-200 cursor-pointer ${background}`}
    >
      <i className={`bi bi-${icon} ${iconColor} text-xl mr-4`}></i>
      <span className="text-lg">{text}</span>
    </div>
  );
};

export default Button;
