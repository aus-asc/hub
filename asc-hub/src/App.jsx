import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LockInLounge from "./Pages/LockInLounge";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lock_in_lounge" element={<LockInLounge />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
