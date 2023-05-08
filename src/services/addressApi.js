import axiosClient from "./axiosClient";

const addressApi = {
  async getAll() {
    const url = "/address/type/all";
    return axiosClient.get(url);
  },
};

export default addressApi;
