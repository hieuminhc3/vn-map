import axios from "axios";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: "http://103.90.234.132:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status === 200) {
      if (response.data?.code === 2000) {
        return response.data;
      } else if (response.data?.code === 4004) {
        return response.data;
      } else if (response.data?.code === 4000) {
        toast.error(response.data?.errors[0].errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        throw response;
      } else if (response.data?.code === 5000) {
        toast.error(response.data?.errors[0].errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        throw response;
      }
    } else if (response.status === 401) {
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
