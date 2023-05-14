import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMap, setPlaceService } from "~/features/map/mapSlice";

const apiOptions = {
  apiKey: "AIzaSyC_hHbgWK7Ih0toL_FavH7nw2FfkLaRxt4",
  version: "beta",
  libraries: ["places"],
};

const mapOptions = {
  tilt: 0,
  heading: 0,
  zoom: 18,
  center: { lat: 21.0278, lng: 105.8342 },
  mapId: "74a4d1b3ca631624",
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
  const bounding = {
    ne: [106.32366768736935, 20.67272695274406],
    sw: [104.21703923858719, 19.260698108119925],
  };

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
  const getTileUrlDef = (coordinates, zoom) => {
    return `http://103.90.234.132:8080/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=ThoXuan:Dia_phan_Huyen&STYLE=&FORMAT=image/png&TILEMATRIXSET=EPSG:900913&TILEMATRIX=EPSG:900913:${zoom}&TILECOL=${coordinates.x}&TILEROW=${coordinates.y}`;
  };
  const loadMap = async () => {
    let map = await initMap();

    const defLayer = new window.google.maps.ImageMapType({
      getTileUrl: getTileUrlDef,
      tileSize: new window.google.maps.Size(256, 256),
    });
    var neBounding = new window.google.maps.LatLng(
      bounding.ne[1],
      bounding.ne[0]
    );
    var swBounding = new window.google.maps.LatLng(
      bounding.sw[1],
      bounding.sw[0]
    );
    var bounds = new window.google.maps.LatLngBounds();
    bounds.extend(neBounding);
    bounds.extend(swBounding);
    map.fitBounds(bounds);
    map.overlayMapTypes.push(defLayer);
    dispatch(setMap(map));

    // places service
    let placeService = new window.google.maps.places.PlacesService(map);
    dispatch(setPlaceService(placeService));
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
