import axiosClient from "./axiosClient";

const areaApi = {
  async getProvinces() {
    const url = "/area/allprovince";
    return axiosClient.get(url);
  },
  async getDistricts(maTinh) {
    const url = `/area/getdistrictbymatinh?maTinh=${maTinh}`;
    return axiosClient.get(url);
  },
  async getWards(maHuyen) {
    const url = `/area/getwardbymahuyen?maHuyen=${maHuyen}`;
    return axiosClient.get(url);
  },
};

export default areaApi;
