import {
  Autocomplete,
  Button,
  Fade,
  Grid,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SearchBoxPopperWrapper } from "../../styled";
import useGetProvinces from "~/hooks/useGetProvinces";
import useGetDistricts from "~/hooks/useGetDistricts";
import CloseIcon from "@mui/icons-material/Close";

function Popup(props) {
  const { openPopper, anchorEl, placement, title, setOpenPopper } = props;
  const [maTinh, setMaTinh] = useState(null);
  const { data: provinceList = [] } = useGetProvinces();
  const { data: districtList = [] } = useGetDistricts(maTinh);
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
          <Fade {...TransitionProps} timeout={350}>
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
                      console.log("value:", value);
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
                <Grid item xs={12}>
                  <Button fullWidth variant="contained" color="success">
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
