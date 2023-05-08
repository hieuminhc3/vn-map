import styled from "styled-components";

export const AddressListWrapper = styled.div`
  display: flex;
  width: 800px;
  height: 48px;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-left: 20px;
  align-items: center;
  position: relative;
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
  border-radius: 4px;
`;
