import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Hooks
import { useActions } from "./hooks";

// Components
import SideBar from "./components/SideBar";
import Header from "./components/Header";

// Pages
import Dashboard from "./pages/Dashboard";
import Pool from "./pages/Pool";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const ref = useRef<any>();

  const { connectWallet } = useActions();

  useEffect(() => {
    connectWallet(false);
  }, [connectWallet]);

  const checkAndCloseSidebar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!sidebarOpen) return;

    if (ref.current === e.target) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="h-full w-screen bg-gradient-to-b flex from-bgGreen to-bgBlue">
      <Router>
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
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
