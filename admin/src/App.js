import logo from "./logo.svg";
import "./App.css";
import Admin from "./pages/AdminPage/Admin";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {/* <h1>la trang chủ</h1> */}
    </div>
  );
}

export default App;
