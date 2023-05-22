import { getGoogleMapApikey } from "~/utils/StringUtils";

const googleMapApi = {
  getCurrentLocation: async (data = {}) => {
    const googleApiKey = getGoogleMapApikey();
    const response = await fetch(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${googleApiKey}`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      }
    );
    return response.json();
  },
};

export default googleMapApi;
