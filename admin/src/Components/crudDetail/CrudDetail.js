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
// import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CommentAPI from "../../api/Comment";
import { ClassNames } from "@emotion/react";
import DocumentAPI from "../../api/Document";
import "./CrudDetail.css";
import {
  handleCallImageAPI,
  handleDeleteImageAPI,
  handleEditImageAPI,
} from "../../redux/reducer/InfoImageSilce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CrudDetail = () => {
  const navigate = useNavigate();
  const paramsId = useParams();
  const numberId = Number(paramsId.id);
  const [imageViewDetail, setImageViewDetail] = useState();
  // set trạng thái của Buton "Lưu thay đổi" active/inactive
  const [isEditActive, setIsEditActive] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Trạng thái hiển thị modal xóa
  // const imageList = useSelector((state) => state.infoimage) || [];
  console.log("imgList", imageList);

  //  Gọi dữ liệu comment từ redux về
  useEffect(() => {
    const imageViewDetail1 = imageList.find(
      (image) => image.id === numberId
    );
    setImageViewDetail(imageViewDetail1);
  }, []);
  console.log(imageViewDetail);

  const userLogin = JSON.parse(localStorage.getItem("user")) || [];
  // console.log("login", userLogin);
  // const dispatch = useDispatch();
  // const documentList = useSelector((state) => state.documents);
  // console.log("listDC", documentList);

  const [formEdit, setFormEdit] = useState({
    title: "",
    author: "",
    description: "",
  });

  const handleEditImage = () => {
    setFormEdit({
      title: imageViewDetail?.title,
      author: imageViewDetail?.author,
      description: imageViewDetail?.description,
    });
    setIsEditActive(true);
  };

  const handleFormChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    // Handle saving changes logic here
    console.log("formedit", formEdit);
    // đè dữ liệu của object mới vào object cũ tại id tương ứng
    const updateData = { ...imageViewDetail, ...formEdit };
    console.log("upData", updateData);

    // await dispatch(handleEditImageAPI(updateData)).unwrap();
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
      title: "",
      author: "",
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
        <img src={imageViewDetail?.urlImage} alt="" id="img-detail" />
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
          <h4>Tiêu đề ảnh: {imageViewDetail?.title}</h4>
          <p>
            <span>Nguồn gốc trang: </span>
            <u>{imageViewDetail?.author}</u>
          </p>
          <p>Mô tả ảnh: {imageViewDetail?.description}</p>
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
                  name="title"
                  placeholder="Tiêu đề ảnh"
                  value={formEdit.title}
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
                  name="author"
                  placeholder="Nguồn gốc trang"
                  value={formEdit.author}
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
