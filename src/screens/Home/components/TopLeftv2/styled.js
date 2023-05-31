import { Container } from "@mui/material";
import styled from "styled-components";

export const TopLeftWrapper = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  position: absolute;
  top: 10px;
`;

export const SearchBoxWrapper = styled.div`
  display: ${(props) => (props.display ? props.display : "flex")};
  width: ${(props) => (props.width ? props.width : "392px")};
  height: ${(props) => (props.height ? props.height : "48px")};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border: 0px;
  background-color: white;
  border-radius: 4px;
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : "0px")};
  padding-right: ${(props) =>
    props.paddingRight ? props.paddingRight : "0px"};
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : "0px")};
  padding-bottom: ${(props) =>
    props.paddingBottom ? props.paddingBottom : "0px"};
`;

export const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  background-color: white;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export const SearchInput = styled.input`
  border: 0;
  width: 247px;
  outline: none;
  ::placeholder {
    font-size: 16px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: 106px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px 5px 0px 5px;
`;

export const Logo = styled.img`
  width: 56px;
  height: 56px;
  cursor: pointer;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  b {
    font-size: 14px;
  }
  &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
  padding: 10px 0px;
`;

export const RowWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  b {
    font-size: 14px;
  }
  &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
  padding: 10px 0px;
`;

export const ImageIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const SearchBoxPopperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "300px")};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border: 0px;
  background-color: white;
  border-radius: 4px;
  padding: 12px;
`;
