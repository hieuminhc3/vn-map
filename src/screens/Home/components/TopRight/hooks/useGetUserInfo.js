import { useQuery } from "react-query";
import authApi from "~/services/authApi";

const useGetUserInfo = () => useQuery("getUserInfo", authApi.getUserInfo);
export default useGetUserInfo;
