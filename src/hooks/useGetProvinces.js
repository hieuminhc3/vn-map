import { useQuery } from "react-query";
import areaApi from "~/services/areaApi";

const useGetProvinces = () => useQuery("getProvinces", areaApi.getProvinces);
export default useGetProvinces;
