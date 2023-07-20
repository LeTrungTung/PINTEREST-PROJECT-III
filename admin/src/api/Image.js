import axiosClient from "./axiosClient";

export class ImageAPIAdmin {
  static getAllImages() {
    const url = "/api/v1/image/get-image";
    return axiosClient.get(url);
  }
  static getImageById(id) {
    const url = `/api/v1/image/get-image-byId/${id}`;
    return axiosClient.get(url);
  }
  static editImagebyId(id, param) {
    const url = `api/v1/image/edit-image-id/${id}`;
    return axiosClient.patch(url, param);
  }
}
