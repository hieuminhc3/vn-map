import React from "react";
import {
  Container,
  AddressResultContainer,
  AddressResultItemContainer,
  AddressResultContent,
  Image,
} from "./styled";
import "~/styles/styles.css";
import addressDefault from "~/assets/images/avaterDefault.png";
import { Divider } from "@mui/material";
import { getPlaceName } from "~/utils/StringUtils";

const AddressResultList = (props) => {
  const { setIsOpenResultDetail, placeList, setPlaceDetail } = props;

  return (
    <Container>
      <AddressResultContainer>
        {placeList.map((e, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                setIsOpenResultDetail(true);
                setPlaceDetail({
                  name: e.name,
                  type: getPlaceName(e.types[0]),
                  address: e.vicinity,
                });
              }}
            >
              <AddressResultItemContainer key={i}>
                <AddressResultContent>
                  <b className="text-lg-semibold">{e.name}</b>
                  <span className="text-md-normal">
                    {getPlaceName(e.types[0])}
                  </span>
                  <span className="text-md-normal">{e.vicinity}</span>
                </AddressResultContent>
                <Image src={addressDefault} />
              </AddressResultItemContainer>
              <Divider />
            </div>
          );
        })}
      </AddressResultContainer>
    </Container>
  );
};

export default AddressResultList;
