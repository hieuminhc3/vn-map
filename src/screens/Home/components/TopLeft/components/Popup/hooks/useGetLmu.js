import { useQuery } from "react-query";
import landApi from "~/services/landApi";

const useGetLmu = (params) =>
  useQuery({
    queryKey: ["getLmu", params],
    enabled: Boolean(params && params.type && params.maTinh && params.maHuyen),
    queryFn: () => landApi.getLmu(params),
    select: (data) => data?.data,
  });

export default useGetLmu;
