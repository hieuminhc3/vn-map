import React from "react";
import { Container, TransactionWrapper } from "./styled";
import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const HistoryTransaction = () => {
  return (
    <Container>
      <TransactionWrapper>
        <b>Jayvion Simon</b>
        <span>
          Address:41256 Kamille Turnpike, East Sambury, New Hampshire, Kenya
          85807
        </span>
        <span>Phone:365-374-4961</span>
        <div style={{ textAlign: "left" }}>
          <Button
            size="small"
            color="error"
            variant="contained"
            startIcon={<DeleteOutlineIcon />}
          >
            Xoá
          </Button>
        </div>
      </TransactionWrapper>
      <TransactionWrapper>
        <b>Jayvion Simon</b>
        <span>
          Address:41256 Kamille Turnpike, East Sambury, New Hampshire, Kenya
          85807
        </span>
        <span>Phone:365-374-4961</span>
        <div style={{ textAlign: "left" }}>
          <Button
            size="small"
            color="error"
            variant="contained"
            startIcon={<DeleteOutlineIcon />}
          >
            Xoá
          </Button>
        </div>
      </TransactionWrapper>
      <TransactionWrapper>
        <b>Jayvion Simon</b>
        <span>
          Address:41256 Kamille Turnpike, East Sambury, New Hampshire, Kenya
          85807
        </span>
        <span>Phone:365-374-4961</span>
        <div style={{ textAlign: "left" }}>
          <Button
            size="small"
            color="error"
            variant="contained"
            startIcon={<DeleteOutlineIcon />}
          >
            Xoá
          </Button>
        </div>
      </TransactionWrapper>
    </Container>
  );
};

export default HistoryTransaction;
