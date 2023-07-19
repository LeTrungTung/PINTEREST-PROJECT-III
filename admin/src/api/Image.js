import axiosClient from "./axiosClient";

export class ImageAPIAdmin {
  static getAllImages() {
    const url = "/api/v1/image/get-image";
    return axiosClient.get(url);
  }
}
