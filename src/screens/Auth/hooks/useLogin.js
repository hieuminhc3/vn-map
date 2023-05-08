import { useMutation } from "react-query";
import authApi from "~/services/authApi";

const useLogin = () =>
  useMutation(async (params) => {
    return authApi.login(params);
  });
export default useLogin;
