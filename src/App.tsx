import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TalkWithPolyGlot from "./pages/talkWithPolyglot";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center w-full min-h-screen ">
        <Header />
        <Routes>
          <Route path="/" element={<TalkWithPolyGlot />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
