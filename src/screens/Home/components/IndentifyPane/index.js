import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, { useEffect, useImperativeHandle, useState } from "react";
import "~/screens/Home/components/IndentifyPane/styles.css";
import { Body, Container, ContentBody, HeaderBody, ToolMenu } from "./styled";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { mapSelector } from "~/features/map/mapSlice";
import ArticleIcon from "@mui/icons-material/Article";
import AccordionItem from "./components/AccordionItem";

function IndentifyPane(props, ref) {
  const { map, planDataList } = useSelector(mapSelector);
  const [visible, setVisible] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const show = () => {
    setVisible(true);
    setAnimationActive(true);
  };

  const hide = () => {
    setVisible(false);
    setAnimationActive(true);
  };

  useImperativeHandle(ref, () => {
    return {
      show: show,
      hide: hide,
    };
  });

  useEffect(() => {
    if (Array.isArray(planDataList) && planDataList.length > 0) {
      setExpanded(planDataList[0].planId);
      let boundCoords = [];
      map.overlayMapTypes.pop();
      planDataList[0].lmuDtos?.forEach((element) => {
        map.overlayMapTypes.push(element.overlay);
        let point1 = new window.google.maps.LatLng(
          element.pointY1,
          element.pointX1
        );
        let point2 = new window.google.maps.LatLng(
          element.pointY2,
          element.pointX2
        );
        boundCoords.push(point1);
        boundCoords.push(point2);
      });
      if (Array.isArray(boundCoords) && boundCoords.length > 0) {
        let bounds = new window.google.maps.LatLngBounds();
        boundCoords.forEach((element) => {
          bounds.extend(element);
        });
        map.fitBounds(bounds);
      }
    }
  }, [planDataList]);

  return (
    <Container
      className={
        animationActive ? (visible ? "comeInAnimate" : "comeOutAnimate") : ""
      }
    >
      <Body>
        <HeaderBody>
          <p style={{ color: "white" }}>Thông tin tra cứu quy hoạch</p>
        </HeaderBody>
        <ContentBody>
          {planDataList && planDataList.length > 0 ? (
            <>
              {planDataList.map((planData, i) => (
                <AccordionItem
                  map={map}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  key={i}
                  planData={planData}
                />
              ))}
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "200px",
                backgroundColor: "white",
              }}
            >
              <ArticleIcon color="action" />
              <p>Không có dữ liệu</p>
            </Box>
          )}
        </ContentBody>
      </Body>
      <ToolMenu onClick={visible ? hide : show}>
        {visible ? (
          <ArrowLeftIcon color="action" />
        ) : (
          <ArrowRightIcon color="action" />
        )}
      </ToolMenu>
    </Container>
  );
}

export default React.forwardRef(IndentifyPane);
