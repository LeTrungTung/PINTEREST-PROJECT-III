import axiosClient from "./axiosClient";

export class ImageAPI {
  static getAllImages() {
    const url = "/api/v1/image/get-image";
    return axiosClient.get(url);
  }
  static getImageSaved() {
    const url = "/api/v1/image/get-image-saved";
    return axiosClient.get(url);
  }
  static postImageSaved(params) {
    const url = "/api/v1/image/add-image-saved";
    return axiosClient.post(url, params);
  }
  static getImageById(id) {
    const url = `/api/v1/image/get-image-byId/${id}`;
    return axiosClient.get(url);
  }
  static deleteImageById(id) {
    const url = `/api/v1/image/delete-image-saved/${id}`;
    return axiosClient.delete(url);
  }
  static getAllImages_Comments() {
    const url = "/api/v1/image/get-image-comment";
    return axiosClient.get(url);
  }
  static getAllImages_Love() {
    const url = "/api/v1/image/get-image-love";
    return axiosClient.get(url);
  }
  static getAllImages_Like() {
    const url = "/api/v1/image/get-image-like";
    return axiosClient.get(url);
  }
  static getUsersCreateImage(id) {
    const url = `/api/v1/image/get-image-user/${id}`;
    return axiosClient.get(url);
  }
  static getImageCreatedUser(id) {
    const url = `/api/v1/image/get-user-create-image/${id}`;
    return axiosClient.get(url);
  }
  static getUsersSaveImage(id) {
    const url = `/api/v1/image/get-image-user-save/${id}`;
    return axiosClient.get(url);
  }
  static getOperationImage(id) {
    const url = `/api/v1/image/get-operation-image`;
    return axiosClient.get(url);
  }
  static deleteLoveImage(id) {
    const url = `/api/v1/image/delete-operation-image/${id}`;
    return axiosClient.delete(url);
  }
  static postLoveImage(params) {
    const url = "/api/v1/image/add-love-image";
    return axiosClient.post(url, params);
  }
}
