import React from "react";
import HeaderAuth from "../../components/Header/HeaderAuth";
import FooterAuth from "../../components/Footer/FooterAuth";
import "./Register_Login_Layout.css";

const Register_Login_Layout = ({ children }) => {
  return (
    <div className="wrap-auth">
      <HeaderAuth />
      {children}
      <FooterAuth />
    </div>
  );
};

export default Register_Login_Layout;
