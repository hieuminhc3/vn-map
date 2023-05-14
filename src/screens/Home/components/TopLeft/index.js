import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Drawer, Fade, Grid, Popper, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import React, { useState } from "react";
import hientrang from "~/assets/images/hientrang.jpg";
import nongnghiep from "~/assets/images/nongnghiep.jpg";
import quyhoach from "~/assets/images/quyhoach.jpg";
import nonghoa from "~/assets/images/nonghoa.jpg";
import thonhuong from "~/assets/images/thonhuong.jpg";
import logo from "~/assets/images/vnmap.png";
import "~/styles/styles.css";
import {
  AddressList,
  AddressResultItem,
  AddressResultList,
  Popup,
} from "./components";
import {
  ColumnWrapper,
  ContentWrapper,
  IconButton,
  ImageIcon,
  Logo,
  RowWrapper,
  SearchBoxPopperWrapper,
  SearchBoxWrapper,
  SearchInput,
  TopLeftWrapper,
} from "./styled";

const TopLeft = () => {
  const [placeList, setPlaceList] = useState([]);
  const [placeDetail, setPlaceDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [isOpenResult, setIsOpenResult] = useState(false);
  const [isOpenResultDetail, setIsOpenResultDetail] = useState(false);

  const [anchorElQH, setAnchorElQH] = useState(null);
  const [openPopperQH, setOpenPopperQH] = useState(false);
  const [placementQH, setPlacementQH] = useState();

  const [anchorElHT, setAnchorElHT] = useState(null);
  const [openPopperHT, setOpenPopperHT] = useState(false);
  const [placementHT, setPlacementHT] = useState();

  const [anchorElNT, setAnchorElNT] = useState(null);
  const [openPopperNT, setOpenPopperNT] = useState(false);
  const [placementNT, setPlacementNT] = useState();

  const handleClick = (newPlacement, type) => (event) => {
    setOpenPopperQH(false);
    setOpenPopperHT(false);
    setOpenPopperNT(false);
    if (type === "QH") {
      setAnchorElQH(event.currentTarget);
      setOpenPopperQH((prev) => placementQH !== newPlacement || !prev);
      setPlacementQH(newPlacement);
    } else if (type === "HT") {
      setAnchorElHT(event.currentTarget);
      setOpenPopperHT((prev) => placementHT !== newPlacement || !prev);
      setPlacementHT(newPlacement);
    }
  };

  const handleClickNT = (newPlacement) => (event) => {
    setOpenPopperQH(false);
    setOpenPopperHT(false);
    setAnchorElNT(event.currentTarget);
    setOpenPopperNT((prev) => placementNT !== newPlacement || !prev);
    setPlacementNT(newPlacement);
  };

  return (
    <>
      <TopLeftWrapper>
        <SearchBoxWrapper>
          <IconButton
            onClick={() => {
              if (!isOpenResultDetail) setOpen(true);
              else setIsOpenResultDetail(false);
            }}
          >
            {isOpenResultDetail ? (
              <ArrowBackIcon color="action" />
            ) : (
              <MenuIcon color="action" />
            )}
          </IconButton>
          <SearchInput placeholder="Tìm kiếm trên Vn Map" />
          <IconButton>
            <SearchIcon color="action" />
          </IconButton>
          <Divider orientation="vertical" variant="middle" flexItem />
          <IconButton
            onClick={() => {
              if (isOpenResult) {
                setIsOpenResult(false);
                setIsOpenResultDetail(false);
              }
            }}
          >
            {isOpenResult ? (
              <CloseIcon color="action" />
            ) : (
              <LocationOnIcon color="action" />
            )}
          </IconButton>
        </SearchBoxWrapper>
        <AddressList
          setIsOpenResult={setIsOpenResult}
          setPlaceList={setPlaceList}
          setIsOpenResultDetail={setIsOpenResultDetail}
          setPlaceDetail={setPlaceDetail}
        />
        <Drawer
          anchor="left"
          open={open}
          onClose={() => {
            setOpen(false);
            setOpenPopperQH(false);
            setOpenPopperHT(false);
            setOpenPopperNT(false);
          }}
        >
          <ContentWrapper>
            <Logo src={logo} />
            <ColumnWrapper onClick={handleClick("right-start", "QH")}>
              <ImageIcon src={quyhoach} />
              <b>Quy hoạch</b>
            </ColumnWrapper>
            <ColumnWrapper onClick={handleClick("right-start", "HT")}>
              <ImageIcon src={hientrang} />
              <b>Hiện trạng </b>
            </ColumnWrapper>
            <ColumnWrapper onClick={handleClickNT("right-start")}>
              <ImageIcon src={nongnghiep} />
              <b>Nông nghiệp</b>
            </ColumnWrapper>
            <Popup
              openPopper={openPopperHT}
              anchorEl={anchorElHT}
              placement={placementHT}
              title="Hiện trạng"
              setOpenPopper={setOpenPopperHT}
            />
            <Popup
              openPopper={openPopperQH}
              anchorEl={anchorElQH}
              placement={placementQH}
              title="Quy hoạch"
              setOpenPopper={setOpenPopperQH}
            />
            <Popper
              open={openPopperNT}
              anchorEl={anchorElNT}
              placement={placementNT}
              transition
              sx={{
                zIndex: openPopperNT ? 9999 : undefined,
              }}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <SearchBoxPopperWrapper width="220px">
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h6" component="h6">
                          Nông nghiệp
                        </Typography>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => setOpenPopperNT(false)}
                        >
                          <CloseIcon color="action" />
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <RowWrapper>
                          <ImageIcon src={nonghoa} />
                          <b>Nông hoá</b>
                        </RowWrapper>
                      </Grid>
                      <Grid item xs={12}>
                        <RowWrapper>
                          <ImageIcon src={thonhuong} />
                          <b>Thổ nhưỡng</b>
                        </RowWrapper>
                      </Grid>
                    </Grid>
                  </SearchBoxPopperWrapper>
                </Fade>
              )}
            </Popper>
          </ContentWrapper>
        </Drawer>
      </TopLeftWrapper>
      {isOpenResult && !isOpenResultDetail && (
        <AddressResultList
          setIsOpenResultDetail={setIsOpenResultDetail}
          placeList={placeList}
          setPlaceDetail={setPlaceDetail}
        />
      )}
      {isOpenResult && isOpenResultDetail && (
        <AddressResultItem placeDetail={placeDetail} />
      )}
    </>
  );
};

export default TopLeft;
