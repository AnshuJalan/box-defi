import React from "react";

// Hooks
import { useActions, useTypedSelector } from "../hooks";

// Components
import Button from "./Button";

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
        {!isConnected ? (
          <Button text="Connect Wallet" icon="wallet" background="bg-white" onClick={() => connectWallet(true)} />
        ) : (
          <Button
            text="Connected"
            icon="check-circle-fill"
            iconColor="text-green-600"
            background="bg-white"
            onClick={() => connectWallet(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
