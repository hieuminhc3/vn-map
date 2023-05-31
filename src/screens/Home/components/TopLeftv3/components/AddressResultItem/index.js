import React from "react";
import {
  AddressResultContainer,
  AddressResultContent,
  Container,
  Thumbnail,
} from "./styled";

const AddressResultItem = (props) => {
  const { placeDetail: data } = props;
  return (
    <Container>
      <AddressResultContainer>
        <Thumbnail />
        <AddressResultContent>
          <b className="text-lg-semibold">{data.name}</b>
          <span className="text-md-normal">{data.type}</span>
          <span className="text-md-normal">{data.address}</span>
        </AddressResultContent>
      </AddressResultContainer>
    </Container>
  );
};

export default AddressResultItem;
