import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { AddressListWrapper } from "./styled";
import "./styles.css";
// import required modules
import { Navigation } from "swiper";
import useGetAddressList from "./hooks/useGetAddressList";

export default function AddressList() {
  const { data: addressList } = useGetAddressList();
  return (
    <AddressListWrapper>
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        navigation={false}
        modules={[Navigation]}
        className="mySwiper"
      >
        {addressList?.map((e, i) => (
          <SwiperSlide key={i}>{e.name}</SwiperSlide>
        ))}
      </Swiper>
    </AddressListWrapper>
  );
}
