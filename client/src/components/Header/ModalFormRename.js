import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import React, { useEffect, useState } from "react";
import "./ModalForm.css";
import axios from "axios";
import axiosClient from "../../api/axiosClient";
import { ImageAPI } from "../../api/Image";
import { useNavigate } from "react-router-dom";
import { UserAPI } from "../../api/User";

function ModalFormRename(props) {
  const userLogin =
    JSON.parse(localStorage.getItem("userLogin")) || [];
  // const [imgServer, setImgServer] = useState("");
  // const [allImages, setAllImages] = useState([]);
  const [dataForm, setDataForm] = useState({
    username: "",
  });

  const navigate = useNavigate();

  const handleClose = () => props.setShow(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dataFromPost = dataForm;

    const newUsername = {
      username: dataFromPost.username,
    };
    const id = userLogin?.idUser;
    console.log("idusserlogin", id);
    try {
      await UserAPI.editUsername(id, newUsername);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
    props.setShow(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">
            Đổi tên người dùng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit} id="id-form">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="text"
                placeholder="Nhập tên người dùng thay đổi"
                autoFocus
                name="username"
                onChange={handleInputChange}
                value={dataForm?.username}
              />
            </Form.Group>
            <div className="ctr-form">
              <Button variant="primary" type="submit">
                Lưu tên mới
              </Button>
              <Button
                className="btn-close-modal"
                variant="secondary"
                onClick={handleClose}
              >
                Đóng
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalFormRename;
