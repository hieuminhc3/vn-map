import { useQuery } from "react-query";
import addressApi from "~/services/addressApi";

const useGetAddressList = () =>
  useQuery({
    queryKey: "getAddressList",
    queryFn: addressApi.getAll,
    select: (data) => data?.data,
  });
export default useGetAddressList;
