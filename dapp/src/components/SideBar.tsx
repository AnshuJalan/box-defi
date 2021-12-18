import React from "react";
import { Link, useLocation } from "react-router-dom";

// Hooks
import { useTypedSelector } from "../hooks";

// Utils
import { formatAddress } from "../utils/strings";
import { explorerURL } from "../utils/global";

// Assets
import Brand from "../assets/images/brand_alt.png";

// Local components
const SelectedNotch = <div className="absolute w-1.5 rounded-tr-xl rounded-br-xl h-full left-0 bg-blue-400" />;

interface SidebarProps {
  setSidebarOpen: Function;
  sidebarOpen: boolean;
}

const SideBar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const path = useLocation().pathname;

  const { accountPkh } = useTypedSelector((state) => state.wallet);

  // TODO: Remove once landing page is separated out to another repo
  if (path === "/") return <React.Fragment></React.Fragment>;

  return (
    <div
      className={`h-full fixed lg:relative w-64 lg:w-72 flex flex-col justify-between py-6 bg-white transition-transform duration-300 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 z-20 shadow-xl`}
    >
      <div className="text-center">
        {/* Brand */}
        <a href="/" target="_blank" rel="noreferrer">
          <img className="w-16 mb-3 mx-auto" alt="brand" src={Brand} />
          <h1 className="font-primary font-bold text-3xl">
            <span style={{ color: "#FF9A00" }}>Box</span> Defi
          </h1>
        </a>
        {/* Conditional user Pkh */}
        {accountPkh && (
          <a href={`${explorerURL}/${accountPkh}`} rel="noreferrer" target="_blank">
            <div className="flex justify-center items-center text-fadedBlack mt-4 text-sm cursor-pointer hover:opacity-70">
              <i className="bi bi-person-fill mr-1"></i>
              <span>{formatAddress(accountPkh)}</span>
            </div>
          </a>
        )}
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
          <Link to="/wizard">
            <div className={`pl-14 relative mt-6 ${path === "/wizard" && "font-semibold"}`}>
              {path === "/wizard" && SelectedNotch}
              {"🧙  Fruit Wizard"}
            </div>
          </Link>
          <Link to="/faucet">
            <div className={`pl-14 relative mt-6 ${path === "/faucet" && "font-semibold"}`}>
              {path === "/faucet" && SelectedNotch}
              {"#️⃣  Test kUSD Faucet"}
            </div>
          </Link>
        </div>
      </div>
      {/* Socials */}
      <div className="flex flex-row justify-evenly px-12 text-2xl">
        <a href="https://github.com/AnshuJalan/box-defi" target="_blank" rel="noreferrer">
          <i className="bi bi-github"></i>
        </a>
        <a href="https://twitter.com/aj_jalan" target="_blank" rel="noreferrer">
          <i className="bi bi-twitter"></i>
        </a>
        <a href="https://youtu.be/zPnL_2UDKtc" target="_blank" rel="noreferrer">
          <i className="bi bi-youtube"></i>
        </a>
      </div>
    </div>
  );
};

export default SideBar;
