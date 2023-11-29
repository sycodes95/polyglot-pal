
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TalkWithPolyGlot from "./pages/talkWithPolyglot";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import LogIn from "./pages/logIn";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/themeProvider/theme-provider"


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
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

        <div className="flex flex-col items-center w-full h-full text-sm min-h-screen-d font-main bg-background ">
          <Header showMobileSideBar={showMobileSideBar} setShowMobileSideBar={setShowMobileSideBar}/>
        
          <div className="flex justify-center w-full h-full overflow-hidden grow max-w-7xl scrollbar-track scrollbar-thumb scrollbar-thumb-hover">
            <Routes>
              <Route path="/" element={<TalkWithPolyGlot showMobileSideBar={showMobileSideBar} setShowMobileSideBar={setShowMobileSideBar}/>} />
              <Route path="/c/:c_id" element={<TalkWithPolyGlot showMobileSideBar={showMobileSideBar} setShowMobileSideBar={setShowMobileSideBar}/>} />
              <Route path="/log-in" element={<LogIn />} />
            </Routes>
          </div>

          <Footer/>
          <Toaster />
        </div>
      </ThemeProvider>

    </BrowserRouter>
  );
}

export default App;
