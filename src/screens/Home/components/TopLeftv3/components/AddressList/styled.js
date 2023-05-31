import styled from "styled-components";

export const AddressListWrapper = styled.div`
  display: flex;
  height: 48px;
  overflow-x: hidden;
  overflow-y: hidden;
  align-items: center;
  position: relative;
  width: ${(props) => (props.width ? props.width : "calc(100vw - 600px)")};
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  padding: 0px 4px;
`;

export const AddressItem = styled.button`
  background-color: white;
  height: 32px;
  margin-right: 10px;
  white-space: nowrap;
  background-color: white;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border: 0px;
  border-radius: 20px;
  padding: 4px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;
