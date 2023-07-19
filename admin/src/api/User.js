import axios from "axios";
import axiosClient from "./axiosClient";

// export class userAPI {
//   static lockAccount(id, isLocked) {
//     const url = `http://localhost:3000/api/v1/user/lock-user/${id}`;
//     return axios.patch(url, {isLocked});
//   }

//   static getAllImages() {
//     const url = "http://localhost:3000/api/v1/image/get-image";
//     return axiosClient.get(url);
//   }
// }

export class UserAPIAdmin {
  static getUsers() {
    const url = "api/v1/user/get-user";
    return axiosClient.get(url);
  }
  // static editStatus() {
  //   const url = "api/v1/user/edit-status";
  //   return axiosClient.get(url);
  // }
  static editStatus(id, param) {
    const url = `api/v1/user/edit-status/${id}`;
    return axiosClient.patch(url, param);
  }
  static countFollowed() {
    const url = `api/v1/follow/count-user-followed`;
    return axiosClient.get(url);
  }
  static countFollowOther() {
    const url = `api/v1/follow/count-followed-other`;
    return axiosClient.get(url);
  }
}
