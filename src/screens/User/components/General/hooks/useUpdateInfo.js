import { useMutation } from "react-query";
import authApi from "~/services/authApi";

const useUpdateInfo = () => useMutation(authApi.updateInfo);
export default useUpdateInfo;
