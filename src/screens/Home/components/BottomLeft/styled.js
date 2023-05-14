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
  left: ${(props) => (props.right ? props.right : "0px")};
  height: ${(props) => (props.height ? props.height : "auto")};
  gap: 10px;
`;

export const BottomLeftButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  padding: 4px;
  background-color: white;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border: 0px;
  &:hover {
    cursor: pointer;
    background-color: #e0e0e0;
  }
`;

export const LayerGroupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 80px;
  padding: 4px;
  background-color: white;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border: 0px;
  gap: 10px;
`;

export const LayerGroupButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 0px;
  &:hover img {
    cursor: pointer;
    border: 2px solid #1a73e8;
  }
  &:hover span {
    cursor: pointer;
    color: blue;
  }
  gap: 4px;
`;

export const ImageIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
