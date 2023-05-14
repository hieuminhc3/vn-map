import React from "react";
import {
  Container,
  AvatarBox,
  FormBox,
  Image,
  AvatarWrapper,
  UploadLayer,
} from "./styled";
import ava from "~/assets/images/ava.jpeg";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import useUpdateInfo from "./hooks/useUpdateInfo";
import useGetUserInfo from "~/hooks/useGetUserInfo";

const General = () => {
  const { mutate: update, isLoading } = useUpdateInfo();
  const { data: userInfo } = useGetUserInfo();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const form = new FormData();
    form.append("id", userInfo.id);
    for (const [key, value] of Object.entries(data)) {
      form.append(key, value);
    }
    form.append("avatar", "haha");
    update(form, {
      onSuccess: (data) => {
        console.log("data:", data);
      },
    });
  };

  return (
    <Container>
      <AvatarBox width="33%">
        <AvatarWrapper>
          <Image src={ava} />
          <UploadLayer>
            <PhotoCameraIcon
              fontSize="large"
              sx={{
                color: "#ffffff",
              }}
            />
            <span style={{ fontSize: "14px", color: "#ffffff" }}>
              Upload photo
            </span>
          </UploadLayer>
        </AvatarWrapper>
        <div style={{ width: "100%", textAlign: "center", marginTop: "16px" }}>
          <span>Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB</span>
        </div>
      </AvatarBox>

      <div
        style={{
          width: "66%",
        }}
      >
        <FormBox onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Họ và tên"
                variant="outlined"
                fullWidth
                {...register("fullName")}
                value={userInfo.fullName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Số điện thoại"
                variant="outlined"
                fullWidth
                {...register("phone")}
                value={userInfo.phone}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                {...register("email")}
                value={userInfo.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="CMND/CCCD"
                variant="outlined"
                fullWidth
                {...register("cmnd")}
                value={userInfo.cmnd}
              />
            </Grid>
          </Grid>
          <div style={{ textAlign: "right", marginTop: "24px" }}>
            <Button variant="contained" color="success" type="submit">
              Lưu
            </Button>
          </div>
        </FormBox>
      </div>
    </Container>
  );
};

export default General;
