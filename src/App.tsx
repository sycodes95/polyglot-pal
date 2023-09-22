import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import TalkWithPolyGlot from "./pages/talkWithPolyglot";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Sidebar from "./components/sidebar/sidebar";
import LogIn from "./pages/logIn";
import { useAuth0 } from "@auth0/auth0-react";


function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center w-full h-full min-h-screen text-sm font-main">
        <Header />
        <div className="flex justify-center flex-grow w-full h-full max-w-7xl">
          <Routes>
            <Route path="/" element={<TalkWithPolyGlot />} />
            <Route path="/c/:c_id" element={<TalkWithPolyGlot/>} />
            <Route path="/log-in" element={<LogIn />} />
          </Routes>
        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
