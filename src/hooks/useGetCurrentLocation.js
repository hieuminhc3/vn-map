import { useQuery } from "react-query";
import googleMapApi from "~/services/googleMapApi";

const useGetCurrentLocation = () =>
  useQuery({
    queryKey: "getCurrentLocation",
    queryFn: () => googleMapApi.getCurrentLocation(),
    select: (data) => {
      return data.location;
    },
  });
export default useGetCurrentLocation;
