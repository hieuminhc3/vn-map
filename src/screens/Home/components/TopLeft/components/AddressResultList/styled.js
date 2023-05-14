import styled from "styled-components";

export const Container = styled.div`
  width: 412px;
  height: 100vh;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 2;
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

export const AddressResultItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px;
  justify-content: space-between;
  background-color: white;
  &:hover {
    background-color: #e0e0e0;
  }
  cursor: pointer;
`;

export const AddressResultContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: flex-start;
  span {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-align: start;
    text-overflow: ellipsis;
  }
`;

export const Image = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 4px;
`;
