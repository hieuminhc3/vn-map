import { useQuery } from "react-query";
import landApi from "~/services/landApi";

const useGetQHLmu = (params) =>
  useQuery({
    queryKey: ["getQHLmu", params],
    enabled: Boolean(params && params.type && params.maTinh && params.maHuyen),
    queryFn: () => landApi.getQHLmu(params),
    select: (data) => data?.data,
  });

export default useGetQHLmu;
