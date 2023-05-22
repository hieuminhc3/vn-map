import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import NavigationIcon from "@mui/icons-material/Navigation";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { mapSelector } from "~/features/map/mapSlice";
import "../../../../styles/styles.css";
import {
  BottomRightButton,
  BottomRightWrapper,
  LandUseList,
  LandUseListWrapper,
  Rectangle,
  RowContainer,
} from "./styled";
import "./styles.css";
import MapIcon from "@mui/icons-material/Map";
import { Fade, Paper, Popper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useGetLandUse from "./hooks/useGetLandUse";

const BottomRight = () => {
  const { data: landUseList } = useGetLandUse();
  const [isLoadingCurrentLocation, setIsLoadingCurrentLocation] =
    useState(false);
  const [is3D, setIs3D] = useState(false);
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
  const { map } = useSelector(mapSelector);
  function initWebGLOverlayView(map) {
    map.overlayMapTypes.pop();
    map.setZoom(10);
    let scene, renderer, camera, loader;
    const webGLOverlayView = new window.google.maps.WebGLOverlayView();

    webGLOverlayView.onAdd = () => {
      // set up the scene
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera();
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.75); // soft white light
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
      directionalLight.position.set(0.5, -1, 0.5);
      scene.add(directionalLight);

      // load the model
      loader = new GLTFLoader();
      const source = "pin.gltf";
      loader.load(source, (gltf) => {
        gltf.scene.scale.set(25, 25, 25);
        gltf.scene.rotation.x = (180 * Math.PI) / 180; // rotations are in radians
        scene.add(gltf.scene);
      });
    };

    webGLOverlayView.onContextRestored = ({ gl }) => {
      // create the three.js renderer, using the
      // maps's WebGL rendering context.
      renderer = new THREE.WebGLRenderer({
        canvas: gl.canvas,
        context: gl,
        ...gl.getContextAttributes(),
      });
      renderer.autoClear = false;

      // wait to move the camera until the 3D model loads
      loader.manager.onLoad = () => {
        renderer.setAnimationLoop(() => {
          map.moveCamera({
            tilt: mapOptions.tilt,
            heading: mapOptions.heading,
            zoom: mapOptions.zoom,
          });

          // rotate the map 360 degrees
          if (mapOptions.tilt < 67.5) {
            mapOptions.tilt += 0.5;
          } else if (mapOptions.heading <= 360) {
            mapOptions.heading += 0.2;
          } else {
            renderer.setAnimationLoop(null);
          }
        });
      };
    };

    webGLOverlayView.onDraw = ({ gl, transformer }) => {
      // update camera matrix to ensure the model is georeferenced correctly on the map
      const latLngAltitudeLiteral = {
        lat: mapOptions.center.lat,
        lng: mapOptions.center.lng,
        altitude: 120,
      };

      const matrix = transformer.fromLatLngAltitude(latLngAltitudeLiteral);
      camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);

      webGLOverlayView.requestRedraw();
      renderer.render(scene, camera);

      // always reset the GL state
      renderer.resetState();
    };
    webGLOverlayView.setMap(map);
  }
  function getLocation() {
    setIsLoadingCurrentLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(pos) {
    var latLng = new window.google.maps.LatLng(
      pos.coords.latitude,
      pos.coords.longitude
    );
    var marker = new window.google.maps.Marker({
      position: latLng,
      map: map,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillOpacity: 1,
        strokeWeight: 2,
        fillColor: "#5384ED",
        strokeColor: "#ffffff",
      },
    });
    marker.setPosition(map);
    map.setCenter(latLng);
    setIsLoadingCurrentLocation(false);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  return (
    <>
      <BottomRightWrapper right="10px" height="252px">
        <Tooltip title="Vị trí hiện tại" placement="left">
          <BottomRightButton
            className="border-radius-4 btn-hover"
            onClick={getLocation}
          >
            {isLoadingCurrentLocation ? (
              <CircularProgress size={20} />
            ) : (
              <GpsFixedIcon color="action" />
            )}
          </BottomRightButton>
        </Tooltip>
        <div>
          <Tooltip title="Điều hướng" placement="left">
            <BottomRightButton className="border-top-left-radius-4 border-top-right-radius-4">
              <NavigationIcon sx={{ color: "red" }} />
            </BottomRightButton>
          </Tooltip>
          <Tooltip title="Trạng thái" placement="left">
            <BottomRightButton
              onClick={() => {
                if (!is3D) {
                  initWebGLOverlayView(map);
                  setIs3D(true);
                } else {
                  setIs3D(false);
                }
              }}
            >
              {!is3D ? <ThreeDRotationIcon color="action" /> : <span>2D</span>}
            </BottomRightButton>
          </Tooltip>
          <Tooltip title="Chú giải" placement="left">
            <BottomRightButton
              className="border-bottom-left-radius-4 border-bottom-right-radius-4"
              onClick={handleClick("left-end")}
            >
              <MapIcon color="action" />
            </BottomRightButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Phóng to" placement="left">
            <BottomRightButton
              className="border-top-left-radius-4 border-top-right-radius-4"
              onClick={() => {
                let currentZoom = map.getZoom();
                map.setZoom(currentZoom + 1);
              }}
            >
              <ZoomInIcon color="action" />
            </BottomRightButton>
          </Tooltip>
          <Tooltip title="Thu nhỏ" placement="left">
            <BottomRightButton
              className="border-bottom-left-radius-4 border-bottom-right-radius-4"
              onClick={() => {
                let currentZoom = map.getZoom();
                map.setZoom(currentZoom - 1);
              }}
            >
              <ZoomOutIcon color="action" />
            </BottomRightButton>
          </Tooltip>
        </div>
      </BottomRightWrapper>
      <BottomRightWrapper right="60px">
        <Tooltip title="Nghiêng lên" placement="left">
          <BottomRightButton
            className="border-top-left-radius-4 border-top-right-radius-4"
            onClick={() => {
              map.setTilt(map.getTilt() + 20);
            }}
          >
            <ArrowDropUpIcon color="action" />
          </BottomRightButton>
        </Tooltip>
        <Tooltip title="Nghiêng xuống" placement="left">
          <BottomRightButton
            className="border-bottom-left-radius-4 border-bottom-right-radius-4"
            onClick={() => {
              map.setTilt(map.getTilt() - 20);
            }}
          >
            <ArrowDropDownIcon color="action" />
          </BottomRightButton>
        </Tooltip>
      </BottomRightWrapper>
      <BottomRightWrapper right="110px" flexDirection="row">
        <Tooltip title="Quay phải" placement="top">
          <BottomRightButton
            className="border-top-left-radius-4 border-bottom-left-radius-4"
            onClick={() => {
              map.setHeading(map.getHeading() + 20);
            }}
          >
            <RotateRightIcon color="action" />
          </BottomRightButton>
        </Tooltip>
        <Tooltip title="Quay trái" placement="top">
          <BottomRightButton
            className="border-bottom-right-radius-4 border-top-right-radius-4"
            onClick={() => {
              map.setHeading(map.getHeading() - 20);
            }}
          >
            <RotateLeftIcon color="action" />
          </BottomRightButton>
        </Tooltip>
      </BottomRightWrapper>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        sx={{
          zIndex: open ? 9999 : undefined,
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <LandUseListWrapper>
                <RowContainer>
                  <b>Chú giải</b>
                  <CloseIcon
                    color="action"
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpen(false)}
                  />
                </RowContainer>
                <LandUseList>
                  <RowContainer>
                    <span>Tên loại đất</span>
                    <span>Mã loại đất</span>
                  </RowContainer>

                  {landUseList?.map((e, i) => (
                    <RowContainer>
                      <div
                        style={{
                          display: "flex",
                          width: "80%",
                          gap: "10px",
                        }}
                      >
                        <Rectangle backGroundColor={`#${e.landColor}`} />
                        <span style={{ maxWidth: "80%" }}>{e.landName}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          width: "20%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span>{e.landCode}</span>
                      </div>
                    </RowContainer>
                  ))}
                </LandUseList>
              </LandUseListWrapper>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default BottomRight;
