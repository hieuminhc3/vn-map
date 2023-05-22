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
import useGetLmu from "./hooks/useGetLmu";
import { useSelector } from "react-redux";
import { mapSelector } from "~/features/map/mapSlice";
import { toast } from "react-toastify";
import useGetWards from "~/hooks/useGetWards";

function Popup(props) {
  const { type, setOpen } = props;
  const { map } = useSelector(mapSelector);
  const { openPopper, anchorEl, placement, title, setOpenPopper } = props;
  const [maTinh, setMaTinh] = useState(null);
  const [maHuyen, setMaHuyen] = useState(null);
  const [maXa, setMaXa] = useState(null);
  const { data: provinceList = [] } = useGetProvinces();
  const { data: districtList = [] } = useGetDistricts(maTinh);
  const { data: wardList = [] } = useGetWards(maHuyen);
  const { data: lmu = null } = useGetLmu({
    type: type,
    maTinh: maTinh,
    maHuyen: maHuyen,
    maXa: maXa,
  });
  const handleSubmit = () => {
    if (lmu) {
      map.overlayMapTypes.pop();
      map.overlayMapTypes.push(
        new window.google.maps.ImageMapType({
          getTileUrl: (coordinates, zoom) => {
            return `http://103.90.234.132:8080/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=${lmu.layerName}&STYLE=&FORMAT=image/png&TILEMATRIXSET=EPSG:900913&TILEMATRIX=EPSG:900913:${zoom}&TILECOL=${coordinates.x}&TILEROW=${coordinates.y}`;
          },
          tileSize: new window.google.maps.Size(256, 256),
        })
      );
      // fit bound map
      let y = new window.google.maps.LatLng(lmu.pointY1, lmu.pointX1);
      let x = new window.google.maps.LatLng(lmu.pointY2, lmu.pointX2);
      let bounds = new window.google.maps.LatLngBounds();
      bounds.extend(x);
      bounds.extend(y);
      map.fitBounds(bounds);
      setOpenPopper(false);
      setOpen(false);
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
  useEffect(() => {}, [lmu]);

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

export default Popup;
