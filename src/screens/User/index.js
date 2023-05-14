import React, { useState } from "react";
import { Header } from "~/layouts";
import { Container, ContentWrapper } from "./styled";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { General, HistoryTransaction } from "./components";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const User = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Header />
      <ContentWrapper>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab disableRipple label="Thông tin cá nhân" {...a11yProps(0)} />
              <Tab disableRipple label="Lịch sử tra cứu" {...a11yProps(1)} />
              <Tab disableRipple label="Lịch sử nạp tiền" {...a11yProps(2)} />
              <Tab disableRipple label="Đã lưu" {...a11yProps(3)} />
              <Tab disableRipple label="Hỗ trợ" {...a11yProps(4)} />
              <Tab disableRipple label="Đổi mật khẩu" {...a11yProps(5)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <General />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HistoryTransaction />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <HistoryTransaction />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <HistoryTransaction />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <HistoryTransaction />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <HistoryTransaction />
          </TabPanel>
        </Box>
      </ContentWrapper>
    </Container>
  );
};

export default User;
