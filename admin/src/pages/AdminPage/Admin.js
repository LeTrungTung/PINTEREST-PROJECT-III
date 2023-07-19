import React from "react";
import { Container } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import "./Admin.css";
import UserManage from "../../Components/manageUser/UserManage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const Admin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef();
  const adminLogin =
    JSON.parse(localStorage.getItem("adminLogin")) || [];
  const handleArrowClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleRenameUser = () => {};
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminLogin");
    window.location.href = "/";
  };
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
            <img src={adminLogin?.avatarUser} />
            <div className="wrap-avata-hover1">
              <IoIosArrowDown
                // id="arrow-avatar1"
                id="icon-admin"
                onClick={handleArrowClick}
                className={isMenuOpen ? "open" : ""}
              />
              <div className="view-hover-avatar">
                <span>Chi tiết tài khoản</span>
              </div>
              {isMenuOpen && (
                <div className="menu-dropdown" ref={menuRef}>
                  <span className="profile-logout1">
                    Đang đăng nhập
                  </span>
                  <div className="row-avataemail-name1 hoverto">
                    <img
                      src={adminLogin?.avatarUser}
                      alt="avata"
                      className="avata-of"
                    />
                    <div className="email-name1">
                      <span>{adminLogin?.username}</span>
                      <span>{adminLogin?.email}</span>
                    </div>
                  </div>
                  <span
                    className="profile-logout hoverto"
                    onClick={handleRenameUser}
                  >
                    Đổi tên tài khoản
                  </span>

                  <span
                    className="profile-logout hoverto"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* fjkkldfjglkdf */}
          {/*  */}
        </div>
      </div>
      <div className="content-body">
        <UserManage />
      </div>
    </div>
  );
};

export default Admin;
