import {
  Autocomplete,
  Button,
  Fade,
  Grid,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SearchBoxPopperWrapper } from "../../styled";
import useGetProvinces from "~/hooks/useGetProvinces";
import useGetDistricts from "~/hooks/useGetDistricts";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { mapSelector, setPlanDataList } from "~/features/map/mapSlice";
import { toast } from "react-toastify";
import useGetWards from "~/hooks/useGetWards";
import useGetQHLmu from "./hooks/useGetQHLmu";

function QHPopup(props) {
  const { indentifyPaneRef } = props;
  const { type, setOpen } = props;
  const { map } = useSelector(mapSelector);
  const { openPopper, anchorEl, placement, title, setOpenPopper } = props;
  const [maTinh, setMaTinh] = useState(null);
  const [maHuyen, setMaHuyen] = useState(null);
  const [maXa, setMaXa] = useState(null);
  const { data: provinceList = [] } = useGetProvinces();
  const { data: districtList = [] } = useGetDistricts(maTinh);
  const { data: wardList = [] } = useGetWards(maHuyen);
  const { data: planDataList = null } = useGetQHLmu({
    type: type,
    maTinh: maTinh,
    maHuyen: maHuyen,
    maXa: maXa,
  });
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (Array.isArray(planDataList) && planDataList.length > 0) {
      let planMapDataList = [];
      map.overlayMapTypes.pop();
      let boundCoords = [];
      planDataList.forEach((element) => {
        let planMapData = element;
        element?.lmuDtos.forEach((element) => {
          let overlay = new window.google.maps.ImageMapType({
            getTileUrl: (coordinates, zoom) => {
              return `http://103.90.234.132:8080/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=${element.layerName}&STYLE=&FORMAT=image/png&TILEMATRIXSET=EPSG:900913&TILEMATRIX=EPSG:900913:${zoom}&TILECOL=${coordinates.x}&TILEROW=${coordinates.y}`;
            },
            tileSize: new window.google.maps.Size(256, 256),
          });
          //map.overlayMapTypes.push(overlay);
          element.overlay = overlay;
          // var point1 = new window.google.maps.LatLng(
          //   element.pointY1,
          //   element.pointX1
          // );
          // var point2 = new window.google.maps.LatLng(
          //   element.pointY2,
          //   element.pointX2
          // );
          // boundCoords.push(point1);
          // boundCoords.push(point2);
          planMapData = element;
        });
        indentifyPaneRef.current.show();
        planMapDataList.push(planMapData);
      });
      // fit bound map
      // if (Array.isArray(boundCoords) && boundCoords.length > 0) {
      //   let bounds = new window.google.maps.LatLngBounds();
      //   boundCoords.forEach((element) => {
      //     bounds.extend(element);
      //   });
      //   map.fitBounds(bounds);
      // }
      setOpenPopper(false);
      setOpen(false);
      dispatch(setPlanDataList(planDataList));
    } else {
      toast.error("Bản đồ đang được cập nhật", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  useEffect(() => {}, [planDataList]);

  return (
    <>
      <Popper
        open={openPopper}
        anchorEl={anchorEl}
        placement={placement}
        transition
        sx={{
          zIndex: openPopper ? 9999 : undefined,
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={0}>
            <SearchBoxPopperWrapper>
              <Grid container spacing={2}>
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
                    {title}
                  </Typography>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpenPopper(false)}
                  >
                    <CloseIcon color="action" />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    onChange={(event, value) => {
                      setMaTinh(value.maTinh);
                    }}
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={Array.isArray(provinceList) ? provinceList : []}
                    renderInput={(params) => (
                      <TextField {...params} label="Chọn tỉnh" />
                    )}
                    getOptionLabel={(option) => {
                      return option.tenTinh;
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    onChange={(event, value) => {
                      setMaHuyen(value.maHuyen);
                    }}
                    size="small"
                    disablePortal
                    id="combo-box-demo"
                    options={Array.isArray(districtList) ? districtList : []}
                    renderInput={(params) => (
                      <TextField {...params} label="Chọn huyện" />
                    )}
                    getOptionLabel={(option) => {
                      return option.tenHuyen;
                    }}
                  />
                </Grid>
                {type === 1 ||
                  (type === 2 && (
                    <Grid item xs={12}>
                      <Autocomplete
                        onChange={(event, value) => {
                          setMaXa(value.maXa);
                        }}
                        size="small"
                        disablePortal
                        id="combo-box-demo"
                        options={Array.isArray(wardList) ? wardList : []}
                        renderInput={(params) => (
                          <TextField {...params} label="Chọn xã" />
                        )}
                        getOptionLabel={(option) => {
                          return option.tenXa;
                        }}
                      />
                    </Grid>
                  ))}
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                  >
                    Tìm kiếm
                  </Button>
                </Grid>
              </Grid>
            </SearchBoxPopperWrapper>
          </Fade>
        )}
      </Popper>
    </>
  );
}

export default QHPopup;
