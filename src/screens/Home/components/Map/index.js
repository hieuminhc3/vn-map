import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMap } from "~/features/map/mapSlice";

const apiOptions = {
  apiKey: "AIzaSyDpQyYE0jdU5x2B1lOq-nJk3JNDxtSPM8A",
  version: "beta",
};

const mapOptions = {
  tilt: 0,
  heading: 0,
  zoom: 18,
  center: { lat: 21.0278, lng: 105.8342 },
  mapId: "621edc01dc614587",
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  maxZoom: 20,
  minZoom: 5,
};

const Map = () => {
  const dispatch = useDispatch();
  async function initMap() {
    try {
      const mapDiv = document.getElementById("map");
      const apiLoader = new Loader(apiOptions);
      await apiLoader.load();
      return new window.google.maps.Map(mapDiv, mapOptions);
    } catch (error) {
      console.log("error:::", error);
    }
  }

  const loadMap = async () => {
    const map = await initMap();
    dispatch(setMap(map));
    //if (map) initWebGLOverlayView(map);
  };

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "100%", backgroundColor: "yellow" }}
    ></div>
  );
};

export default Map;
