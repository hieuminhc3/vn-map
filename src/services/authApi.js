import axiosClient from "./axiosClient";

const authApi = {
  login(params) {
    const url = "/auth/login";
    return axiosClient.post(url, params);
  },
  getUserInfo() {
    const url = "/auth/getInfo";
    return axiosClient.get(url);
  },
  updateInfo(form) {
    const url = "/auth/update/info";
    return axiosClient.post(url, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default authApi;
