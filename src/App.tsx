import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import TalkWithPolyGlot from "./pages/talkWithPolyglot";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Sidebar from "./components/sidebar/sidebar";
import LogIn from "./pages/logIn";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

function App() {
  const [showMobileSideBar, setShowMobileSideBar] = useState(false)

  const handleResize = () => {
    if(window.innerWidth > 768){
      setShowMobileSideBar(false);
    }
  };

  useEffect(() => {
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center w-full h-full min-h-screen-d text-sm font-main bg-background ">
        <Header showMobileSideBar={showMobileSideBar} setShowMobileSideBar={setShowMobileSideBar}/>
      
        <div className="flex justify-center w-full h-full overflow-hidden grow max-w-7xl">
          <Routes>
            <Route path="/" element={<TalkWithPolyGlot showMobileSideBar={showMobileSideBar} setShowMobileSideBar={setShowMobileSideBar}/>} />
            <Route path="/c/:c_id" element={<TalkWithPolyGlot showMobileSideBar={showMobileSideBar} setShowMobileSideBar={setShowMobileSideBar}/>} />
            <Route path="/log-in" element={<LogIn />} />
          </Routes>
        </div>
        <Footer/>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
