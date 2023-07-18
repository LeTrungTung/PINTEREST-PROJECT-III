import axios from "axios";
import axiosClient from "./axiosClient";

export class UserAPI {
  // API đăng ký
  static register(param) {
    const url = "http://localhost:4000/api/v1/user/register";
    return axios.post(url, param);
  }
  //   API đăng nhập
  static login(param) {
    const url = "/api/v1/user/login";
    return axiosClient.post(url, param);
  }

  static getUsers() {
    const url = "api/v1/user/get-user";
    return axiosClient.get(url);
  }
  static editUsername(id, param) {
    const url = `api/v1/user/edit-user/${id}`;
    return axiosClient.patch(url, param);
  }
  static getUserById(id) {
    const url = `/api/v1/user/get-user-byid/${id}`;
    return axiosClient.get(url);
  }
}
