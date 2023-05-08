import React, { useState } from "react";
import {
  TopLeftWrapper,
  SearchBoxWrapper,
  SearchInput,
  IconButton,
  ContentWrapper,
  Logo,
  ColumnWrapper,
  ImageIcon,
} from "./styled";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Divider from "@mui/material/Divider";
import { AddressList } from "./components";
import { Drawer } from "@mui/material";
import logo from "~/assets/images/vnmap.png";
import quyhoach from "~/assets/images/quyhoach.jpg";
import hientrang from "~/assets/images/hientrang.jpg";
import nongnghiep from "~/assets/images/nongnghiep.jpg";
import { Label } from "@mui/icons-material";

const TopLeft = () => {
  const [open, setOpen] = useState(false);
  return (
    <TopLeftWrapper>
      <SearchBoxWrapper>
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <MenuIcon color="action" />
        </IconButton>
        <SearchInput placeholder="Tìm kiếm trên Vn Map" />
        <IconButton>
          <SearchIcon color="action" />
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton>
          <LocationOnIcon color="action" />
        </IconButton>
      </SearchBoxWrapper>
      <AddressList />
      <Drawer
        anchor="left"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <ContentWrapper>
          <Logo src={logo} />
          <ColumnWrapper>
            <ImageIcon src={quyhoach} />
            <b>Quy hoạch</b>
          </ColumnWrapper>
          <ColumnWrapper>
            <ImageIcon src={hientrang} />
            <b>Hiện trạng </b>
          </ColumnWrapper>
          <ColumnWrapper>
            <ImageIcon src={nongnghiep} />
            <b>Nông nghiệp</b>
          </ColumnWrapper>
        </ContentWrapper>
      </Drawer>
    </TopLeftWrapper>
  );
};

export default TopLeft;
