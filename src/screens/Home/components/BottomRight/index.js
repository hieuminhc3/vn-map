import React, { useState } from "react";
import { BottomRightWrapper, BottomRightButton } from "./styled";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import NavigationIcon from "@mui/icons-material/Navigation";
import Tooltip from "@mui/material/Tooltip";
import "../../../../styles/styles.css";
import "./styles.css";
import { useSelector } from "react-redux";
import { mapSelector } from "~/features/map/mapSlice";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const BottomRight = () => {
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
  return (
    <>
      <BottomRightWrapper right="10px" height="212px">
        <Tooltip title="Vị trí hiện tại" placement="left">
          <BottomRightButton className="border-radius-4 btn-hover">
            <GpsFixedIcon color="action" />
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
              className="border-bottom-left-radius-4 border-bottom-right-radius-4"
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
    </>
  );
};

export default BottomRight;
