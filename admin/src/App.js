import logo from "./logo.svg";
import "./App.css";
import Admin from "./pages/AdminPage/Admin";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/login/Login";
import Admin_Login_Layout from "./Layout/Admin_Login_Layout/Admin_Login_Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<Admin />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="/login"
          element={<Admin_Login_Layout children={<Login />} />}
        />
      </Routes>
      {/* <h1>la trang chủ</h1> */}
    </div>
  );
}

export default App;
