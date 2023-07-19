import React from "react";
import "./Admin_Login_Layout.css";
import FooterAuth from "../../Components/Footer/FooterAuth";
import HeaderAuth from "../../Components/Header/HeaderAuth";

const Admin_Login_Layout = ({ children }) => {
  return (
    <div className="wrap-auth">
      <HeaderAuth />
      {children}
      <FooterAuth />
    </div>
  );
};

export default Admin_Login_Layout;
