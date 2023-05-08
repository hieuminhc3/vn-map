import styled from "styled-components";

export const TopLeftWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: absolute;
  top: 10px;
  left: 10px;
`;

export const SearchBoxWrapper = styled.div`
  display: flex;
  width: 392px;
  height: 48px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border: 0px;
  background-color: white;
  border-radius: 4px;
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
  gap: 40px;
  padding-top: 10px;
`;

export const Logo = styled.img`
  width: 56px;
  height: 56px;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  b {
    font-size: 14px;
  }
`;

export const ImageIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
