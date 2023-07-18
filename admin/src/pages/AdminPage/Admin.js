import React from "react";
import { Container } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import "./Admin.css";
import UserManage from "../../Components/manageUser/UserManage";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div id="wrap-admin">
      <div id="header-admin">
        <div id="header-admin-left">
          {/* <div id="header-admin-left" onClick={() => navigate("/")}> */}
          <img src="https://seeklogo.com/images/P/pinterest-logo-B783288EDA-seeklogo.com.png" />
        </div>
        <div id="sec-center">
          <ul>
            <Link to="/admin">
              <li
                className={
                  location.pathname == "/admin" ? "active" : ""
                }
              >
                Quản lý người dùng
              </li>
            </Link>
            <Link to="/images">
              <li>Quản lý hình ảnh</li>
            </Link>
          </ul>
        </div>
        <div id="header-admin-left">
          <div id="sec-right">
            <img src="https://i.pinimg.com/236x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" />
            <IoIosArrowDown id="icon-admin" />
          </div>
        </div>
      </div>
      <div className="content-body">
        <UserManage />
      </div>
    </div>
  );
};

export default Admin;
