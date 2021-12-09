import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Hooks
import { useActions, useTypedSelector } from "./hooks";

// Components
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Loader from "./components/Loader";

// Pages
import Dashboard from "./pages/Dashboard";
import Pool from "./pages/Pool";
import Farm from "./pages/Farm";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const ref = useRef<any>();

  const { connectWallet, loadContracts, getBalances, loadStats } = useActions();

  const { isConnected, accountPkh } = useTypedSelector((state) => state.wallet);

  // Initial checks and load ups
  useEffect(() => {
    connectWallet(false);
    loadStats();
  }, [connectWallet, loadStats]);

  // Load token and fruit balance
  useEffect(() => {
    if (accountPkh) getBalances();
  }, [accountPkh, getBalances]);

  // Load the wallet contract instances once the wallet is loaded
  useEffect(() => {
    if (isConnected) {
      loadContracts();
    }
  }, [isConnected, loadContracts]);

  const checkAndCloseSidebar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!sidebarOpen) return;

    if (ref.current === e.target) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="h-full w-screen bg-gradient-to-b flex from-bgGreen to-bgBlue">
      <Router>
        <Loader />
        <SideBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div
          onClick={(e) => checkAndCloseSidebar(e)}
          ref={ref}
          className={`h-screen w-screen fixed z-10 bg-black bg-opacity-50 ${sidebarOpen ? "block" : "hidden"}`}
        />
        <div className="flex-1 p-2 md:py-5 md:px-7">
          <Header setSidebarOpen={setSidebarOpen} />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pool" element={<Pool />} />
            <Route path="/farm" element={<Farm />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;