import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  border-radius: 16px;
  padding: 24px;
`;

export const TransactionWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-bottom: 1px dotted gray;
  padding: 10px 0px;
  gap: 10px;
`;
