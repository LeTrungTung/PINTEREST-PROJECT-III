import axios from "axios";
import React, { useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { login } from "../../store/userSlice";

const Login = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Sử dụng hook useNavigate
  // const dipatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu và xử lý đăng ký
    const errors = {};

    if (email.trim() === "") {
      errors.email = "Vui lòng nhập email!";
    }
    if (!isValidEmail(email)) {
      errors.email = "Email không đúng định dạng!";
    }

    if (password.trim() === "") {
      errors.password = "Vui lòng nhập mật khẩu!";
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/admin/login",
        {
          email,
          password,
        }
      );

      const { success, accessToken, role } = response.data;
      console.log(111, response.data);
      if (response.data.data.role == 1) {
        // Lưu accessToken vào localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem(
          "adminLogin",
          JSON.stringify(response.data.data)
        );

        // Chuyển hướng đến trang admin
        navigate("/admin");
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage(
        "Something went wrong. Please try again later."
      );
    }
    setErrors(errors);
  };

  const isValidEmail = (value) => {
    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <div className="login-content">
      <div className="nature-image">
        <img
          src="https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_640.png"
          alt="image"
        />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="title-login"> Xin chào Admin!</h2>
        <h1 className="title1-login">Pinterest</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-log">{errors.email}</p>}
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="error-log ed1">{errors.password}</p>
        )}

        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
