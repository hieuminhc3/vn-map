import { useQuery } from "react-query";
import areaApi from "~/services/areaApi";

const useGetProvinces = () =>
  useQuery({
    queryKey: "getProvinces",
    queryFn: areaApi.getProvinces,
    select: (data) => data?.data,
  });
export default useGetProvinces;
