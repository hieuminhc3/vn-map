import React from "react";
import {
  Container,
  LogoContainer,
  Image,
  AvatarContainer,
  ListMenuContainer,
} from "./styled";
import logo from "~/assets/images/vnmap.png";
import { Avatar, Typography } from "@mui/material";
import { deepOrange, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <LogoContainer
        onClick={() => {
          navigate("/");
        }}
      >
        <Image src={logo} />
      </LogoContainer>
      <ListMenuContainer>
        <Typography variant="h6">Thông tin tài khoản</Typography>
      </ListMenuContainer>
      <AvatarContainer>
        <Avatar
          sx={{ bgcolor: deepOrange[500], width: 48, height: 48 }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
          style={{
            cursor: "pointer",
          }}
        >
          B
        </Avatar>
      </AvatarContainer>
    </Container>
  );
};

export default Header;
