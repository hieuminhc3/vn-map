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
};

export default authApi;
