import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillCaretRightSquareFill } from "react-icons/bs";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { ClassNames } from "@emotion/react";
import "./CrudDetail.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImageAPIAdmin } from "../../api/Image";

const CrudDetail = () => {
  const navigate = useNavigate();
  const paramsId = useParams();
  const numberId = Number(paramsId.id);
  // const [imageViewDetail, setImageViewDetail] = useState();
  // set trạng thái của Buton "Lưu thay đổi" active/inactive

  const [imageChoice, setImageChoice] = useState([]);
  const [isEditActive, setIsEditActive] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Trạng thái hiển thị modal xóa

  // gọi dữ liệu API lấy image by Id
  const fetchImageById = async (id) => {
    try {
      const response = await ImageAPIAdmin.getImageById(id);
      setImageChoice(response.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchImageById(numberId);
  }, []);

  console.log("Image đang chọn====>", imageChoice);

  const adminLogin =
    JSON.parse(localStorage.getItem("adminLogin")) || [];
  // console.log("login", userLogin);

  const [formEdit, setFormEdit] = useState({
    userCreateId: "",
    categoryImage: "",
    titleImage: "",
    sourceImage: "",
    description: "",
  });

  const handleEditImage = () => {
    setFormEdit({
      userCreateId: imageChoice[0]?.userCreateId,
      categoryImage: imageChoice[0]?.categoryImage,
      titleImage: imageChoice[0]?.titleImage,
      sourceImage: imageChoice[0]?.sourceImage,
      description: imageChoice[0]?.description,
    });
    setIsEditActive(true);
  };

  const handleFormChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const EditImagebyId = async (id, param) => {
    try {
      const response = await ImageAPIAdmin.editImagebyId(id, param);
      // setListImage(response.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  // useEffect(() => {
  //   EditImagebyId(numberId,);
  // }, []);

  // ljdkfjksdlflsd
  // const dataFromPost = dataForm;

  // const newUsername = {
  //   username: dataFromPost.username,
  // };
  // const id = userLogin?.idUser;
  // console.log("idusserlogin", id);
  // try {
  //   await UserAPI.editUsername(id, newUsername);
  // } catch (error) {
  //   console.error("Error retrieving data: ", error);
  // }

  // ljdkfjksdlflsd

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    // Handle saving changes logic here
    console.log("formedit", formEdit);
    // đè dữ liệu của object mới vào object cũ tại id tương ứng
    const updateData = { ...imageChoice[0], ...formEdit };
    console.log("upData", updateData);

    // await dispatch(handleEditImageAPI(updateData)).unwrap();

    await EditImagebyId(numberId, updateData);

    toast.success("Hiệu chỉnh hoàn thành!", {
      onClose: () => {
        setTimeout(() => {
          navigate("/images");
        }, 2000); // Chờ 2 giây trước khi chuyển hướng
      },
    });

    const getAllImage = async () => {
      // await dispatch(handleCallImageAPI()).unwrap();
    };
    getAllImage();

    // Reset formEdit to empty values
    setFormEdit({
      userCreateId: "",
      categoryImage: "",
      titleImage: "",
      sourceImage: "",
      description: "",
    });
    setIsEditActive(false);
  };

  const handleDeleteImage = async () => {
    // await dispatch(handleDeleteImageAPI(numberId)).unwrap();
    setShowDeleteModal(false);
    const getAllImage = async () => {
      // await dispatch(handleCallImageAPI()).unwrap();
    };
    getAllImage();

    toast.success("Xóa ảnh thành công!", {
      onClose: () => {
        setTimeout(() => {
          navigate("/images");
        }, 2000); // Chờ 2 giây trước khi chuyển hướng
      },
    });
  };

  return (
    <Container id="wrap-detail">
      <div id="left-area">
        <img src={imageChoice[0]?.linkImage} alt="" id="img-detail" />
      </div>
      <div id="right-area">
        <div id="right-area-top">
          <div id="top-right">
            <div>
              <Button variant="primary" onClick={handleEditImage}>
                Hiệu chỉnh
              </Button>
            </div>
            <div>
              <Button
                variant="danger"
                onClick={() => setShowDeleteModal(true)}
              >
                Xóa ảnh
              </Button>
            </div>
          </div>
          <h4>Tiêu đề ảnh: {imageChoice[0]?.titleImage}</h4>
          <p>
            <span>Nguồn gốc trang: </span>
            <u>{imageChoice[0]?.sourceImage}</u>
          </p>
          <p>Mô tả ảnh: {imageChoice[0]?.description}</p>
          <br />
          <div id="forrm-edit">
            <h5 style={{ textAlign: "center" }}>
              Form hiệu chỉnh hình ảnh
            </h5>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tiêu đề ảnh</Form.Label>
                <Form.Control
                  type="text"
                  name="titleImage"
                  placeholder="Tiêu đề ảnh"
                  value={formEdit.titleImage}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nguồn gốc trang</Form.Label>
                <Form.Control
                  type="text"
                  name="sourceImage"
                  placeholder="Nguồn gốc trang"
                  value={formEdit.sourceImage}
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Mô tả ảnh</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  value={formEdit.description}
                  onChange={handleFormChange}
                />
              </Form.Group>
              {isEditActive == true ? (
                <Button
                  style={{ textAlign: "center !important" }}
                  onClick={handleSaveChanges}
                >
                  Lưu thay đổi
                </Button>
              ) : (
                ""
              )}
            </Form>
          </div>
        </div>

        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xóa ảnh</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn xóa ảnh này?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Hủy
            </Button>
            <Button variant="danger" onClick={handleDeleteImage}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer />
      </div>
    </Container>
  );
};

export default CrudDetail;
