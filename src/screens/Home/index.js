import React, { useRef } from "react";
import {
  BottomLeft,
  BottomRight,
  IndentifyPane,
  Map,
  TopLeft,
  TopRight,
} from "./components";
import { HomeScreenWrapper } from "./styled";

const HomeScreen = () => {
  const indentifyPaneRef = useRef();
  return (
    <HomeScreenWrapper>
      <Map />
      <TopLeft indentifyPaneRef={indentifyPaneRef} />
      <TopRight />
      <BottomRight />
      <BottomLeft />
      <IndentifyPane ref={indentifyPaneRef} />
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
