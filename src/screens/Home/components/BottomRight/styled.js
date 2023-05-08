import styled from "styled-components";

export const BottomRightWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "column"};
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  position: absolute;
  bottom: 20px;
  right: ${(props) => (props.right ? props.right : "0px")};
  height: ${(props) => (props.height ? props.height : "auto")};
`;

export const BottomRightButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 4px;
  min-width: 32px;
  background-color: white;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border: 0px;
  &:hover {
    cursor: pointer;
    background-color: #e0e0e0;
  }
`;
