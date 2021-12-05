import { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import SideBar from "./components/SideBar";
import Header from "./components/Header";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const ref = useRef<any>();

  const checkAndCloseSidebar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!sidebarOpen) return;

    if (ref.current === e.target) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b flex from-bgGreen to-bgBlue">
      <Router>
        <SideBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div onClick={(e) => checkAndCloseSidebar(e)} ref={ref} className="flex-1 p-2 md:p-6">
          <Header setSidebarOpen={setSidebarOpen} />
          <Routes>
            <Route />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
