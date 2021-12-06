import React from "react";

// Hooks
import { useActions, useTypedSelector } from "../hooks";

// Assets
import Seed from "../assets/icons/seed.png";

interface HeaderProps {
  setSidebarOpen: (val: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { connectWallet } = useActions();

  const { isConnected } = useTypedSelector((state) => state.wallet);

  return (
    <div className="flex flex-row justify-between font-secondary font-medium mb-7">
      {/* Sidebar trigger btn */}
      <div>
        <i onClick={() => setSidebarOpen(true)} className="bi bi-list text-4xl md:opacity-0"></i>
      </div>
      <div className="flex items-center">
        {/* Seed balance and wallet*/}
        <div className="rounded-lg px-3 py-2 bg-white flex items-center mr-4">
          <img className="w-7 mr-4" alt="seed" src={Seed} />
          <span className="text-lg">3,200</span>
        </div>
        <div
          onClick={() => connectWallet(true)}
          className="rounded-lg px-3 py-2 bg-white flex items-center cursor-pointer hover:opacity-70 transition-opacity duration-200"
        >
          {!isConnected ? (
            <React.Fragment>
              <i className="bi bi-wallet2 text-xl md:mr-4"></i>
              <span className="text-lg hidden md:block">Connect Wallet</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <i className="bi bi-check-circle-fill text-green-600 text-xl md:mr-4"></i>
              <span className="text-lg hidden md:block">Connected</span>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
