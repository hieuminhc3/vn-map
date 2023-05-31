import React, { useRef } from "react";
import {
  BottomLeft,
  BottomRight,
  IndentifyPane,
  Map,
  TopLeftv3,
} from "./components";
import { HomeScreenWrapper } from "./styled";
import { useMediaQuery, useTheme } from "@mui/material";

const HomeScreen = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const laptop = useMediaQuery(theme.breakpoints.up("md"));
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const indentifyPaneRef = useRef();
  return (
    <HomeScreenWrapper>
      <Map />
      <TopLeftv3 indentifyPaneRef={indentifyPaneRef} />
      <BottomRight />
      <BottomLeft />
      {laptop && <IndentifyPane ref={indentifyPaneRef} />}
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
