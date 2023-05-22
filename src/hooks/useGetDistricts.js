import { useQuery } from "react-query";
import areaApi from "~/services/areaApi";

const useGetDistricts = (maTinh) =>
  useQuery({
    queryKey: ["getDistricts", maTinh],
    queryFn: () => areaApi.getDistricts(maTinh),
    enabled: Boolean(maTinh),
    select: (data) => data?.data,
  });
//   useQuery(["getDistricts", maTinh], () => areaApi.getDistricts(maTinh));
export default useGetDistricts;
