import { Button, Divider, Popover, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CardContainer,
  ColumnContainer,
  RowContainer,
  TopRightWrapper,
  PopoverWrapper,
} from "./styled";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AddCardIcon from "@mui/icons-material/AddCard";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import "~/styles/styles.css";
import useGetUserInfo from "~/hooks/useGetUserInfo";

const TopRight = () => {
  const navigate = useNavigate();
  const { data } = useGetUserInfo();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/authen");
  };
  return (
    <TopRightWrapper>
      {!data ? (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            navigate("/authen");
          }}
        >
          ĐĂNG NHẬP
        </Button>
      ) : (
        <Avatar
          sx={{ bgcolor: deepOrange[500], width: 48, height: 48 }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
          style={{
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          B
        </Avatar>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <PopoverWrapper>
          <RowContainer>
            <span className="text-lg-semibold">Tài khoản</span>
            <CloseIcon
              fontSize="small"
              sx={{
                cursor: "pointer",
              }}
              onClick={handleClose}
            />
          </RowContainer>
          <RowContainer
            marginTop="12px"
            paddingTop="8px"
            paddingBottom="8px"
            cursor="pointer"
            activeHover={true}
            onClick={() => {
              navigate("/user/profile/detail");
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{ bgcolor: deepOrange[500], width: 48, height: 48 }}
                alt="Remy Sharp"
                src="/broken-image.jpg"
                style={{
                  cursor: "pointer",
                  marginRight: 12,
                }}
                onClick={handleClick}
              >
                B
              </Avatar>
              <ColumnContainer>
                <span className="text-md-semibold">{data?.fullName}</span>
                <span className="text-md-normal">{data?.phone}</span>
              </ColumnContainer>
            </div>
            <NavigateNextIcon fontSize="small" />
          </RowContainer>
          <RowContainer marginTop="20px">
            <CardContainer>
              <ColumnContainer>
                <span className="text-sm-semibold">Số dư</span>
                <span className="text-xs-semibold ">12,000đ</span>
              </ColumnContainer>
            </CardContainer>
            <CardContainer>
              <ColumnContainer>
                <span className="text-sm-semibold">Tổng số giao dịch</span>
                <span className="text-xs-semibold ">25</span>
              </ColumnContainer>
            </CardContainer>
          </RowContainer>
          <Button
            variant="contained"
            color="success"
            fullWidth={true}
            sx={{
              marginTop: "20px",
            }}
          >
            <AddIcon />
            Nạp tiền
          </Button>
          <Divider
            sx={{
              marginTop: "10px",
            }}
          />
          <RowContainer
            marginTop="10px"
            paddingTop="8px"
            paddingBottom="8px"
            paddingLeft="15px"
            cursor="pointer"
            activeHover={true}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <AddCardIcon
                sx={{
                  marginRight: "20px",
                }}
              />
              <span>Lịch sử nạp tiền</span>
            </div>
          </RowContainer>
          <RowContainer
            paddingTop="8px"
            paddingBottom="8px"
            paddingLeft="15px"
            cursor="pointer"
            activeHover={true}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <BookmarkBorderIcon
                sx={{
                  marginRight: "20px",
                }}
              />
              <span>Địa điểm đã lưu</span>
            </div>
          </RowContainer>
          <RowContainer
            paddingTop="8px"
            paddingBottom="8px"
            paddingLeft="15px"
            cursor="pointer"
            activeHover={true}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <SearchIcon
                sx={{
                  marginRight: "20px",
                }}
              />
              <span>Lịch sử giao dịch tra cứu</span>
            </div>
          </RowContainer>
          <RowContainer
            paddingTop="8px"
            paddingBottom="8px"
            paddingLeft="15px"
            cursor="pointer"
            activeHover={true}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <PermIdentityIcon
                sx={{
                  marginRight: "20px",
                }}
              />
              <span>Hỗ trợ</span>
            </div>
          </RowContainer>
          <Divider
            sx={{
              marginTop: "10px",
            }}
          />
          <RowContainer
            marginTop="10px"
            paddingTop="8px"
            paddingBottom="8px"
            paddingLeft="15px"
            cursor="pointer"
            activeHover={true}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <LockOpenIcon
                sx={{
                  marginRight: "20px",
                }}
              />
              <span>Đổi mật khẩu</span>
            </div>
          </RowContainer>
          <RowContainer
            paddingTop="8px"
            paddingBottom="8px"
            paddingLeft="15px"
            cursor="pointer"
            activeHover={true}
            onClick={handleLogout}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <LogoutIcon
                color="error"
                sx={{
                  marginRight: "20px",
                }}
              />
              <span style={{ color: "#D92D20" }}>Đăng xuất</span>
            </div>
          </RowContainer>
        </PopoverWrapper>
      </Popover>
    </TopRightWrapper>
  );
};

export default TopRight;
