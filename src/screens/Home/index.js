import React from "react";
import { BottomLeft, BottomRight, Map, TopLeft, TopRight } from "./components";
import { HomeScreenWrapper } from "./styled";

const HomeScreen = () => {
  return (
    <HomeScreenWrapper>
      <Map />
      <TopLeft />
      <TopRight />
      <BottomRight />
      <BottomLeft />
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
