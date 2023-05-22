import { useQuery } from "react-query";
import landApi from "~/services/landApi";

const useGetLandUse = () =>
  useQuery({
    queryKey: "getLandUse",
    queryFn: landApi.getAll,
    select: (data) => data?.data,
  });
export default useGetLandUse;
