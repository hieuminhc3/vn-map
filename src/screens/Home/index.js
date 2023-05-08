import React from "react";
import { HomeScreenWrapper } from "./styled";
import { BottomRight, TopLeft, TopRight, Map } from "./components";

const HomeScreen = () => {
  return (
    <HomeScreenWrapper>
      <TopLeft />
      <TopRight />
      <BottomRight />
      <Map />
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
