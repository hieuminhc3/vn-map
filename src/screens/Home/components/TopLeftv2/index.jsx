import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { TopLeftWrapper } from "./styled";

const TopLeftv2 = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const laptop = useMediaQuery(theme.breakpoints.up("md"));
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <TopLeftWrapper maxWidth={false} disableGutters>
      <Grid container>
        <Grid item xs={12} sm={12} md={4}>
          <Box
            sx={{
              width: "100%",
              height: "48px",
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              width: "100%",
              height: "48px",
              backgroundColor: "primary.light",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          />
        </Grid>
        {laptop && (
          <Grid item xs={12} sm={12} md={2}>
            <Box
              sx={{
                width: "100%",
                height: "48px",
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            />
          </Grid>
        )}
      </Grid>
    </TopLeftWrapper>
  );
};

export default TopLeftv2;
