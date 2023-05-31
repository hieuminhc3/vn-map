import styled from "styled-components";

export const TopRightWrapper = styled.div`
  white-space: nowrap;
`;

export const PopoverWrapper = styled.div`
  width: 358px;
  overflow: scroll;
  overflow-y: hidden;
  overflow-x: hidden;
  padding: 18px 16px 18px 16px;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : "0px")};
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : "0px")};
  padding-bottom: ${(props) =>
    props.paddingBottom ? props.paddingBottom : "0px"};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0px")};
  margin-bottom: ${(props) =>
    props.paddingBottom ? props.marginBottom : "0px"};
  cursor: ${(props) => props.cursor};
  &:hover {
    background-color: ${(props) => (props.activeHover ? "#f5f5f5" : "white")};
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 72px;
  width: 45%;
  background-color: rgba(1, 168, 90, 0.1);
  border-radius: 8px;
  border-left: 5px solid #01a85a;
  justify-content: center;
  align-items: center;
`;
