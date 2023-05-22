import { useQuery } from "react-query";
import areaApi from "~/services/areaApi";

const useGetWards = (maHuyen) =>
  useQuery({
    queryKey: ["getWards", maHuyen],
    queryFn: () => areaApi.getWards(maHuyen),
    enabled: Boolean(maHuyen),
    select: (data) => data?.data,
  });
export default useGetWards;
