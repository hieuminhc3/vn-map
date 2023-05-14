import styled from "styled-components";
import thumbnail from "~/assets/images/thumbnail-default.svg";

export const Container = styled.div`
  width: 412px;
  height: 100vh;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 1;
  background-color: white;
`;

export const AddressResultContainer = styled.div`
  height: calc(100% - 68px);
  width: 100%;
  background-color: white;
  ::-webkit-scrollbar {
    display: none;
  }
  margin-top: 68px;
  overflow: scroll;
`;

export const Thumbnail = styled.div`
  width: 100%;
  height: 240px;
  background-image: url(${thumbnail});
  background-repeat: no-repeat;
`;

export const AddressResultContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  span {
    width: 100%;
    word-wrap: break-word;
    text-align: start;
  }
  padding: 24px;
`;
