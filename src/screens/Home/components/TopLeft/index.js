import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Drawer, Fade, Grid, Popper, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import hientrang from "~/assets/images/hientrang.jpg";
import nonghoa from "~/assets/images/nonghoa.jpg";
import nongnghiep from "~/assets/images/nongnghiep.jpg";
import quyhoach from "~/assets/images/quyhoach.jpg";
import thonhuong from "~/assets/images/thonhuong.jpg";
import logo from "~/assets/images/vnmap.png";
import { mapSelector } from "~/features/map/mapSlice";
import "~/styles/styles.css";
import {
  AddressList,
  AddressResultItem,
  AddressResultList,
  Popup,
} from "./components";
import useGetAddressList from "./components/AddressList/hooks/useGetAddressList";
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

const TopLeft = (props) => {
  const { map, markers, placeService } = useSelector(mapSelector);
  const { indentifyPaneRef } = props;
  const [placeList, setPlaceList] = useState([]);
  const [placeDetail, setPlaceDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const [openResultDrawer, setOpenResultDrawer] = useState(true);
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

  const [anchorElNH, setAnchorElNH] = useState(null);
  const [openPopperNH, setOpenPopperNH] = useState(false);
  const [placementNH, setPlacementNH] = useState();

  const [anchorElTN, setAnchorElTN] = useState(null);
  const [openPopperTN, setOpenPopperTN] = useState(false);
  const [placementTN, setPlacementTN] = useState();

  const [searchText, setSearchText] = useState("");
  const handleGoogleRef = useRef();

  const { data: addressList } = useGetAddressList();
  const [isLoadingSearchText, setIsLoadingSearchText] = useState(false);

  const handleClick = (newPlacement, type) => (event) => {
    setOpenPopperQH(false);
    setOpenPopperHT(false);
    setOpenPopperNT(type === "NH" || type === "TN" ? true : false);
    if (type === "QH") {
      setAnchorElQH(event.currentTarget);
      setOpenPopperQH((prev) => placementQH !== newPlacement || !prev);
      setPlacementQH(newPlacement);
    } else if (type === "HT") {
      setAnchorElHT(event.currentTarget);
      setOpenPopperHT((prev) => placementHT !== newPlacement || !prev);
      setPlacementHT(newPlacement);
    } else if (type === "NH") {
      setOpenPopperTN(false);
      setAnchorElNH(event.currentTarget);
      setOpenPopperNH((prev) => placementNH !== newPlacement || !prev);
      setPlacementNH(newPlacement);
    } else if (type === "TN") {
      setOpenPopperNH(false);
      setAnchorElTN(event.currentTarget);
      setOpenPopperTN((prev) => placementTN !== newPlacement || !prev);
      setPlacementTN(newPlacement);
    }
  };

  const handleClickNT = (newPlacement) => (event) => {
    setOpenPopperQH(false);
    setOpenPopperHT(false);
    setAnchorElNT(event.currentTarget);
    setOpenPopperNT((prev) => placementNT !== newPlacement || !prev);
    setPlacementNT(newPlacement);
  };
  function showPosition(pos) {
    var latLng = new window.google.maps.LatLng(
      pos.coords.latitude,
      pos.coords.longitude
    );
    map.setCenter(latLng);
    let pyrmont = new window.google.maps.LatLng(
      pos.coords.latitude,
      pos.coords.longitude
    );
    let request = {
      location: pyrmont,
      radius: "1500",
      language: "vi",
      query: searchText,
      type: getPlaceType(),
    };
    placeService.textSearch(request, handleGoogleRef.current.callback);
  }

  function getPlaceType() {
    let placeTypeArr = [];
    addressList.forEach((element) => {
      placeTypeArr.push(element.code);
    });
    return placeTypeArr;
  }

  const handleSearchByText = () => {
    setIsLoadingSearchText(true);
    setIsOpenResultDetail(false);
    map.overlayMapTypes.pop();
    if (Array.isArray(markers) && markers.length > 0)
      for (var i = 0; i < markers.length; i++) markers[i].setMap(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    setIsLoadingSearchText(false);
  };

  const handleOnChangeSearchText = (event) => {
    setSearchText(event.target.value);
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
          <SearchInput
            placeholder="Tìm kiếm trên Vn Map"
            value={searchText}
            onChange={handleOnChangeSearchText}
          />
          <IconButton onClick={handleSearchByText}>
            {isLoadingSearchText ? (
              <CircularProgress size={20} />
            ) : (
              <SearchIcon color="action" />
            )}
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
          addressList={addressList}
          setIsOpenResult={setIsOpenResult}
          setPlaceList={setPlaceList}
          setIsOpenResultDetail={setIsOpenResultDetail}
          setPlaceDetail={setPlaceDetail}
          setSearchText={setSearchText}
          ref={handleGoogleRef}
        />
        <Drawer
          anchor="left"
          open={open}
          onClose={() => {
            setOpen(false);
            setOpenPopperQH(false);
            setOpenPopperHT(false);
            setOpenPopperNT(false);
            setOpenPopperNH(false);
            setOpenPopperTN(false);
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
              setOpen={setOpen}
              openPopper={openPopperHT}
              anchorEl={anchorElHT}
              placement={placementHT}
              title="Hiện trạng"
              setOpenPopper={setOpenPopperHT}
              type={3}
            />
            <Popup
              indentifyPaneRef={indentifyPaneRef}
              setOpen={setOpen}
              openPopper={openPopperQH}
              anchorEl={anchorElQH}
              placement={placementQH}
              title="Quy hoạch"
              setOpenPopper={setOpenPopperQH}
              type={4}
            />
            <Popup
              setOpen={setOpen}
              openPopper={openPopperNH}
              anchorEl={anchorElNH}
              placement={placementNH}
              title="Nông hoá"
              setOpenPopper={setOpenPopperNH}
              type={2}
            />
            <Popup
              setOpen={setOpen}
              openPopper={openPopperTN}
              anchorEl={anchorElTN}
              placement={placementTN}
              title="Thổ nhưỡng"
              setOpenPopper={setOpenPopperTN}
              type={1}
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
                <Fade {...TransitionProps} timeout={0}>
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
                        <RowWrapper onClick={handleClick("right-start", "NH")}>
                          <ImageIcon src={nonghoa} />
                          <b>Nông hoá</b>
                        </RowWrapper>
                      </Grid>
                      <Grid item xs={12}>
                        <RowWrapper onClick={handleClick("right-start", "TN")}>
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
        <Drawer
          anchor="left"
          open={openResultDrawer}
          onClose={() => setOpenResultDrawer(false)}
          hideBackdrop={true}
        >
          haha
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
