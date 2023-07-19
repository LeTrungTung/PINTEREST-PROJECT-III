import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "./UserManage.css";
import { UserAPIAdmin } from "../../api/User";
// import { useSelector } from "react-redux";
const UserManage = () => {
  // const userData = JSON.parse(localStorage.getItem("dataUser")) || [];
  // const listUsers = useSelector((state) => state.users);
  // if (userData.length === 0) {
  //   const updateUserData = listUsers?.map((user) => ({
  //     ...user,
  //     status: true,
  //   }));
  //   userData.push(...updateUserData);
  // }
  // localStorage.setItem("dataUser", JSON.stringify(userData));

  // console.log("Dach sach nguoi dung", userData);

  const [userData, setUserData] = useState([]);

  // gọi dữ liệu bảng images_saved_user
  const fetchAllUsers = async () => {
    try {
      const response = await UserAPIAdmin.getUsers();
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  console.log("Dach sach nguoi dung", userData);
  const [data, setData] = useState(userData);
  console.log("Dach sach nguoi dung 11", data);
  const [isActive, setIsActive] = useState(true);

  // const fetchEditStatus = async (id, param,res) => {
  //   try {
  //     await UserAPIAdmin.editStatus(id, param);
  //     setUserData(response.data.data);
  //   } catch (error) {
  //     console.error("Error retrieving data: ", error);
  //   }
  // };
  const handleIsActive = async (id) => {
    setIsActive(!isActive);

    let newStatus;
    const updatedUserData = userData?.map((user) => {
      if (user.idUser === id) {
        if (user.status === 1) {
          newStatus = 0;
        } else {
          newStatus = 1;
        }
        console.log("ktra status", newStatus);
        // const newStatus = !user.status;
        return {
          ...user,
          status: newStatus,
        };

        // fetchEditStatus(id, newStatus);
      }
      return user;
    });
    setUserData(updatedUserData);
    console.log("US sau khi thay đổi", userData);

    // Đổi status trên Database
    const editStatus = {
      status: newStatus,
    };
    // const id = userLogin?.idUser;
    // console.log("idusserlogin", id);
    try {
      await UserAPIAdmin.editStatus(id, editStatus);
      // await UserAPI.editUsername(id, newUsername);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
    fetchAllUsers();
  };

  return (
    <div>
      <h2 id="title-user-mana">Quản lý danh sách người dùng</h2>
      <Table striped bordered hover size="sm" className="tb-show">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên người dùng</th>
            <th>Avatar</th>
            <th>Địa chỉ Email</th>
            <th>Được theo dõi</th>
            <th>Đang theo dõi</th>
            <th>Trạng thái</th>
            <th>Admin/User</th>
          </tr>
        </thead>
        <tbody>
          {userData &&
            userData?.map((user, index) => (
              <tr
                key={user}
                className={user.role === 1 ? "active-admin" : ""}
              >
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>
                  {user?.avatarUser == null ? (
                    <img
                      src="https://cdn.onlinewebfonts.com/svg/img_542942.png"
                      alt="avatar"
                    />
                  ) : (
                    <img src={user?.avatarUser} alt="avatar" />
                  )}

                  {/* <img src={user.avatarUser} alt="Avatar" /> */}
                </td>
                <td>{user.email}</td>
                <td>??người theo dõi</td>
                <td>?Đang theo dõi</td>
                <td>
                  {user?.role === 2 && (
                    <Button
                      variant={
                        user.status == 0 ? "secondary" : "warning"
                      }
                      onClick={() => handleIsActive(user.idUser)}
                    >
                      {user.status == 1 ? "Active" : "InActive"}
                      {/* {isActive ? "Active" : "Not Active"} */}
                    </Button>
                  )}
                </td>
                <td>{user.role === 1 ? "IsAdmin" : "IsUser"}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManage;
