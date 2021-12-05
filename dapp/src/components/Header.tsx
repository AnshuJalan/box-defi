interface HeaderProps {
  setSidebarOpen: (val: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  return (
    <div>
      <i onClick={() => setSidebarOpen(true)} className="bi bi-list text-4xl md:hidden"></i>
    </div>
  );
};

export default Header;
