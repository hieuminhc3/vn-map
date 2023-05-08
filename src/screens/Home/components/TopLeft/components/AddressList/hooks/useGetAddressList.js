import { useQuery } from "react-query";
import addressApi from "~/services/addressApi";

const useGetAddressList = () => useQuery("getAddressList", addressApi.getAll);
export default useGetAddressList;
