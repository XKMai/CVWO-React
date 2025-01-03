import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Main";
import Login from "./pages/Login";
import NoPage from "./pages/Nopage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="./home" element={<Home />} />
          <Route path="./login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
