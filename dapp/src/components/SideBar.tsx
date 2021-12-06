import { Link, useLocation } from "react-router-dom";

// Assets
import brand from "../assets/images/brand.png";

// Local components
const SelectedNotch = <div className="absolute w-1.5 rounded-tr-xl rounded-br-xl h-full left-0 bg-blue-400" />;

interface SidebarProps {
  setSidebarOpen: Function;
  sidebarOpen: boolean;
}

const SideBar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const path = useLocation().pathname;

  return (
    <div
      className={`h-screen absolute md:relative w-64 md:w-72 flex flex-col justify-between py-6 bg-white transition-transform duration-300 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 z-10 shadow-xl`}
    >
      <div className="text-center">
        {/* Brand */}
        <img className="w-20 mb-5 mx-auto" alt="brand" src={brand} />
        <h1 className="font-primary font-bold text-3xl">Box DeFi</h1>
        {/* Navigation */}
        <div onClick={() => setSidebarOpen(false)} className="text-left font-secondary mt-10 text-lg whitespace-pre">
          <Link to="/dashboard">
            <div className={`pl-14 relative ${path === "/dashboard" && "font-semibold"}`}>
              {path === "/dashboard" && SelectedNotch}
              {"🚜  Dashboard"}
            </div>
          </Link>
          <Link to="/pool">
            <div className={`pl-14 relative mt-6 ${path === "/pool" && "font-semibold"}`}>
              {path === "/pool" && SelectedNotch}
              {"🌊  Box Pool"}
            </div>
          </Link>
          <Link to="farm">
            <div className={`pl-14 relative mt-6 ${path === "/farm" && "font-semibold"}`}>
              {path === "/farm" && SelectedNotch}
              {"🌾  Box Farm"}
            </div>
          </Link>
          <Link to="/basket">
            <div className={`pl-14 relative mt-6 ${path === "/basket" && "font-semibold"}`}>
              {path === "/basket" && SelectedNotch}
              {"🍎  Fruit Basket"}
            </div>
          </Link>
          <Link to="/magical">
            <div className={`pl-14 relative mt-6 ${path === "/magical" && "font-semibold"}`}>
              {path === "/magical" && SelectedNotch}
              {"🦄  Magical Box"}
            </div>
          </Link>
        </div>
      </div>
      {/* Socials */}
      <div className="flex flex-row justify-evenly px-12 text-2xl">
        <i className="bi bi-github"></i>
        <i className="bi bi-twitter"></i>
        <i className="bi bi-youtube"></i>
      </div>
    </div>
  );
};

export default SideBar;
