
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import TalkWithPolyGlot from "./pages/talkWithPolyglot";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/themeProvider/theme-provider"
import LandingPage from "./pages/landingPage";
import { useAuth0 } from "@auth0/auth0-react";
import withAuth from "./hoc/withAuth";
const MainComponent = withAuth(TalkWithPolyGlot, LandingPage)

function App() {
  
  const [showMobileSideBar, setShowMobileSideBar] = useState(false)
  const { user } = useAuth0()

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
        
        <div className="flex flex-col items-center w-full h-full min-h-screen text-sm font-main bg-background ">
          
          <Header 
          showMobileSideBar={showMobileSideBar} 
          setShowMobileSideBar={setShowMobileSideBar}
          user={user}
          />
        
          <div className="flex justify-center w-full h-full overflow-hidden grow max-w-7xl scrollbar-track scrollbar-thumb scrollbar-thumb-hover">
            <Routes>
              <Route path="/" element={<MainComponent showMobileSideBar={showMobileSideBar} setShowMobileSideBar={setShowMobileSideBar} />} />
              <Route path="/c/:c_id" element={<MainComponent showMobileSideBar={showMobileSideBar} setShowMobileSideBar={setShowMobileSideBar}/>} />
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
