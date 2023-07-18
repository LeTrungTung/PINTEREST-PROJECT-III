import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeInNotLogin from "./components/HomeInNotLogin/HomeInNotLogin";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Register_Login_Layout from "./layout/Register_Login_Layout/Register_Login_Layout";
import CardImage from "./components/CardImage/CardImage";
import DefaultLayout from "./layout/DefaultLayout/DefaultLayout";
import DetailImageLayout from "./layout/DetailImageLayout/DetailImageLayout";
import { ImageAPI } from "../src/api/Image";
import { useEffect, useState } from "react";
import RequiredAuth from "./components/RequireAuth";
import HeaderOnLogin from "./components/Header/HeaderOnLogin";
import Profile from "./components/profile/Profile";
import ProfileLayout from "./layout/ProfileLayout/ProfileLayout";

function App() {
  const [imageList, setImageList] = useState([]);
  const [isCallImage, setIsCallImage] = useState(true);
  // gọi dữ liệu API images lấy toàn bộ ảnh
  useEffect(() => {
    const fetchDataImage = async () => {
      try {
        const response = await ImageAPI.getAllImages();
        setImageList(response.data.data);
      } catch (error) {
        console.error("Error retrieving data: ", error);
      }
    };
    if (isCallImage) {
      fetchDataImage();
    }
    return () => {
      setIsCallImage(false);
    };
  }, [isCallImage]);

  console.log("imageList API====>", imageList);

  return (
    <div className="App">
      <Routes>
        <Route element={<RequiredAuth />}>
          <Route
            path="/home"
            element={<DefaultLayout dataImage={imageList} />}
          />
          <Route path="/detail/:id" element={<DetailImageLayout />} />

          <Route path="/profile" element={<ProfileLayout />} />
        </Route>

        <Route path="/" index element={<HomeInNotLogin />} />

        <Route
          path="/login"
          element={<Register_Login_Layout children={<Login />} />}
        />
        <Route
          path="/register"
          element={<Register_Login_Layout children={<Register />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
