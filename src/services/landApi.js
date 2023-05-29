import axiosClient from "./axiosClient";

const landApi = {
  async getAll() {
    const url = "/land/all";
    return axiosClient.get(url);
  },
  async getLmu(params) {
    const url = "/lmu/get/PlanPeriod/byTypeAndDistrict";
    return axiosClient.get(url, { params: params });
  },
};

export default landApi;
