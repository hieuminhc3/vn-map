import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 68px;
  left: -402px;
  width: 432px;
  z-index: 1;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 402px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const HeaderBody = styled.div`
  height: 40px;
  width: 100%;
  background: #01a85a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 10px;
`;

export const ToolMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40px;
  right: 0px;
  width: 30px;
  height: 50px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
`;
