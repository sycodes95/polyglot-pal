import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TalkWithPolyGlot from "./pages/talkWithPolyglot";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Sidebar from "./components/sidebar/sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center w-full h-full min-h-screen text-sm font-main">
        <Header />
        <div className="flex justify-center flex-grow w-full h-full max-w-7xl">
          <Sidebar
          className="flex-col hidden md:flex"
          />
          <Routes>
            <Route path="/" element={<TalkWithPolyGlot />} />
          </Routes>
        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
