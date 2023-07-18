import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import "./UserManage.css";
// import { useSelector } from "react-redux";
const UserManage = () => {
  const userData = JSON.parse(localStorage.getItem("dataUser")) || [];
  // const listUsers = useSelector((state) => state.users);
  // if (userData.length === 0) {
  //   const updateUserData = listUsers?.map((user) => ({
  //     ...user,
  //     status: true,
  //   }));
  //   userData.push(...updateUserData);
  // }
  localStorage.setItem("dataUser", JSON.stringify(userData));
  const [data, setData] = useState(userData);

  console.log("Dach sach nguoi dung", userData);

  //   const [userStatus, setUserStatus] = useState([]);

  const handleIsActive = (id) => {
    const updatedUserData = userData?.map((user) => {
      if (user.id === id) {
        const newStatus = !user.status;
        return {
          ...user,
          status: newStatus,
        };
      }
      return user;
    });

    localStorage.setItem("dataUser", JSON.stringify(updatedUserData));
    setData(updatedUserData);
  };

  return (
    <div>
      <h2 id="title-user-mana">Quản lý danh sách người dùng</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên người dùng</th>
            <th>Địa chỉ Email</th>
            <th>Trạng thái</th>
            <th>Admin/User</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user?.email !== "tung@gmail.com" && (
                    <Button
                      variant={
                        user.status == true ? "secondary" : "warning"
                      }
                      onClick={() => handleIsActive(user.id)}
                    >
                      {user.status == true ? "Active" : "InActive"}
                    </Button>
                  )}
                </td>
                <td>
                  {user.email == "tung@gmail.com"
                    ? "IsAdmin"
                    : "IsUser"}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManage;
