import { useQuery } from "react-query";
import authApi from "~/services/authApi";

const useGetUserInfo = () =>
  useQuery({
    queryKey: "getUserInfo",
    queryFn: authApi.getUserInfo,
    enabled: Boolean(localStorage.getItem("accessToken")),
  });
export default useGetUserInfo;
