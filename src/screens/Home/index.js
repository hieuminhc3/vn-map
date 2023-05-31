import React, { useRef } from "react";
import {
  BottomLeft,
  BottomRight,
  IndentifyPane,
  Map,
  TopLeft,
  TopRight,
  TopLeftv3,
} from "./components";
import { HomeScreenWrapper } from "./styled";
import TopLeftv2 from "./components/TopLeftv2";

const HomeScreen = () => {
  const indentifyPaneRef = useRef();
  return (
    <HomeScreenWrapper>
      <Map />
      <TopLeftv3 indentifyPaneRef={indentifyPaneRef} />
      {/* <TopLeft indentifyPaneRef={indentifyPaneRef} /> */}

      <BottomRight />
      <BottomLeft />
      <IndentifyPane ref={indentifyPaneRef} />
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
