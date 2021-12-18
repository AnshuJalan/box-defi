import React from "react";
import { useLocation } from "react-router-dom";

// Hooks
import { useActions, useTypedSelector } from "../hooks";

// Components
import Button from "./Button";

// Utils
import { formatTokenBalance } from "../utils/strings";

// Assets
import Seed from "../assets/icons/seed.png";
import kUSD from "../assets/icons/kUSD.png";

interface HeaderProps {
  setSidebarOpen: (val: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { connectWallet } = useActions();

  const { isConnected, tokenBalances } = useTypedSelector((state) => state.wallet);

  // TODO: Remove once landing page is separated out to another repo
  const path = useLocation().pathname;
  if (path === "/") return <React.Fragment></React.Fragment>;

  return (
    <div className="flex flex-row justify-between font-secondary font-medium mb-4">
      {/* Sidebar trigger btn */}
      <div>
        <i onClick={() => setSidebarOpen(true)} className="bi bi-list text-4xl lg:opacity-0"></i>
      </div>
      <div className="flex items-center">
        {/* balances and wallet*/}
        <div className="rounded-lg hidden px-3 py-2 bg-white md:flex items-center mr-4">
          <img className="w-7 mr-4" alt="kUSD" src={kUSD} />
          <span className="text-lg">{formatTokenBalance(tokenBalances.kUSD, 18)}</span>
        </div>
        <div className="rounded-lg hidden px-3 py-2 bg-white md:flex items-center mr-4">
          <img className="w-7 mr-4" alt="seed" src={Seed} />
          <span className="text-lg">{formatTokenBalance(tokenBalances.SEED, 18)}</span>
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
