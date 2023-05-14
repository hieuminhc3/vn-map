const googleMapApi = {
  getCurrentLocation: async (data = {}) => {
    const response = await fetch(
      "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC_hHbgWK7Ih0toL_FavH7nw2FfkLaRxt4",
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
