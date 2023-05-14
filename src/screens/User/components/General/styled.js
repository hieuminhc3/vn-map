import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? props.width : "0px")};
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  border-radius: 16px;
  background-color: white;
  padding: 80px 24px;
`;

export const FormBox = styled.form`
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  border-radius: 16px;
  padding: 24px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

export const UploadLayer = styled.div`
  display: none;
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 100%;
`;

export const AvatarWrapper = styled.div`
  width: 164px;
  height: 164px;
  padding: 10px;
  border: 1px dotted gray;
  border-radius: 100%;
  position: relative;

  &:hover {
    cursor: pointer;
    ${UploadLayer} {
      display: flex;
    }
  }
`;
