import React, { useEffect } from "react";
// Import Swiper React components
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { AddressItem, AddressListWrapper } from "./styled";
import "./styles.css";
// import required modules
import useGetAddressList from "./hooks/useGetAddressList";
import { useDispatch, useSelector } from "react-redux";
import { mapSelector, pushMarker, setMarkers } from "~/features/map/mapSlice";
import useGetCurrentLocation from "../../../../../../hooks/useGetCurrentLocation";
import { getPlaceName } from "~/utils/StringUtils";

export default function AddressList(props) {
  const dispatch = useDispatch();
  const {
    setIsOpenResult,
    setPlaceList,
    setIsOpenResultDetail,
    setPlaceDetail,
  } = props;
  const { data: addressList } = useGetAddressList();
  const { map, placeService, markers, placeType } = useSelector(mapSelector);
  const { data: currentLocation } = useGetCurrentLocation();

  const handleClick = (type) => {
    setIsOpenResultDetail(false);
    map.overlayMapTypes.pop();
    if (Array.isArray(markers) && markers.length > 0)
      for (var i = 0; i < markers.length; i++) markers[i].setMap(null);
    if (currentLocation) {
      let pyrmont = new window.google.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng
      );
      let request = {
        location: pyrmont,
        radius: "1500",
        type: [type],
        language: "vi",
      };
      placeService.nearbySearch(request, callback);
    }
  };

  function callback(results, status) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      let replaceMarkers = [];
      setPlaceList(results);
      for (var i = 0; i < results.length; i++) {
        replaceMarkers.push(createMarker(results[i]));
      }
      dispatch(setMarkers(replaceMarkers));
      fitBoundsToVisibleMarkers(replaceMarkers);
      setIsOpenResult(true);
    } else {
    }
  }

  function fitBoundsToVisibleMarkers(markers) {
    var bounds = new window.google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].getVisible()) {
        bounds.extend(markers[i].getPosition());
      }
    }
    map.fitBounds(bounds);
  }

  const createMarker = (place) => {
    var marker = new window.google.maps.Marker({
      position: place.geometry.location,
      draggable: false,
      animation: window.google.maps.Animation.DROP,
    });
    marker.setMap(map);
    marker.addListener("click", function () {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        setIsOpenResultDetail(true);
        setPlaceDetail({
          name: place.name,
          type: getPlaceName(place.types[0]),
          address: place.vicinity,
        });
      }
    });
    return marker;
  };

  return (
    <AddressListWrapper>
      {addressList?.map((e, i) => (
        <AddressItem key={i} onClick={() => handleClick(e?.code)}>
          {e.name}
        </AddressItem>
      ))}
    </AddressListWrapper>
  );
}
