import { useMutation } from "react-query";
import authApi from "~/services/authApi";

const useLogin = () =>
  useMutation({
    mutationFn: (params) => authApi.login(params),
  });
export default useLogin;
