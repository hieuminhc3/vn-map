import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import React, { useState } from "react";
import "../../../../styles/styles.css";
import {
  BottomLeftButton,
  BottomRightWrapper,
  ImageIcon,
  LayerGroupButton,
  LayerGroupWrapper,
} from "./styled";
import "./styles.css";
import LayersIcon from "@mui/icons-material/Layers";
import vetinh from "~/assets/images/vetinh.jpg";
import giaothong from "~/assets/images/giaothong.jpg";
import diahinh from "~/assets/images/diahinh.jpg";
import kethop from "~/assets/images/kethop.jpg";
import { useSelector } from "react-redux";
import { mapSelector } from "~/features/map/mapSlice";

const BottomLeft = () => {
  const { map } = useSelector(mapSelector);
  const [openLayers, setOpenLayers] = useState(false);
  return (
    <>
      <BottomRightWrapper right="10px" flexDirection="row">
        <BottomLeftButton
          className="border-bottom-left-radius-4 border-top-right-radius-4 border-top-left-radius-4  border-bottom-right-radius-4"
          onClick={() => setOpenLayers(!openLayers)}
        >
          <LayersIcon color="action" fontSize="large" />
          <span>Lớp bản đồ</span>
        </BottomLeftButton>
        {openLayers && (
          <LayerGroupWrapper className="border-bottom-left-radius-4 border-top-right-radius-4 border-top-left-radius-4  border-bottom-right-radius-4">
            <LayerGroupButton
              onClick={() => {
                map.setMapTypeId("satellite");
              }}
            >
              <ImageIcon src={vetinh} />
              <span>Vệ tinh</span>
            </LayerGroupButton>
            <LayerGroupButton
              onClick={() => {
                map.setMapTypeId("roadmap");
              }}
            >
              <ImageIcon src={giaothong} />
              <span>Giao thông</span>
            </LayerGroupButton>
            <LayerGroupButton
              onClick={() => {
                map.setMapTypeId("terrain");
              }}
            >
              <ImageIcon src={diahinh} />
              <span>Địa hình</span>
            </LayerGroupButton>
            <LayerGroupButton
              onClick={() => {
                map.setMapTypeId("hybrid");
              }}
            >
              <ImageIcon src={kethop} />
              <span>Kết hợp</span>
            </LayerGroupButton>
          </LayerGroupWrapper>
        )}
      </BottomRightWrapper>
    </>
  );
};

export default BottomLeft;
