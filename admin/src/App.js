import logo from "./logo.svg";
import "./App.css";
import Admin from "./pages/AdminPage/Admin";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/login/Login";
import Admin_Login_Layout from "./Layout/Admin_Login_Layout/Admin_Login_Layout";
import ImageManage from "./Components/manaImage/ImageManage";
import CrudDetail from "./Components/crudDetail/CrudDetail";
import RequiredAuth from "./Components/RequireAuth/index";
import Admin_Detail_Layout from "./Layout/Layout_Detail/Admin_Detail_Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route element={<RequiredAuth />}> */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/images" element={<ImageManage />} />
        <Route
          path="/cruddetail/:id"
          element={<Admin_Detail_Layout children={<CrudDetail />} />}
        />
        {/* </Route> */}

        {/* <Route path="/admin" element={<Admin />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="/"
          element={<Admin_Login_Layout children={<Login />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
