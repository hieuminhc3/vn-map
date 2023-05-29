import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React, { useImperativeHandle, useState } from "react";
import "~/screens/Home/components/IndentifyPane/styles.css";
import { Body, Container, ContentBody, HeaderBody, ToolMenu } from "./styled";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector } from "react-redux";
import { mapSelector } from "~/features/map/mapSlice";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

function IndentifyPane(props, ref) {
  const { map, planDataList } = useSelector(mapSelector);
  const [visible, setVisible] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);
  const [checked, setChecked] = useState([true, false]);

  const show = () => {
    console.log("planDataList: ", planDataList);
    setVisible(true);
    setAnimationActive(true);
  };

  const hide = () => {
    setVisible(false);
    setAnimationActive(true);
  };

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="QHHoangHoa"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="QHHoangHoa2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  useImperativeHandle(ref, () => {
    return {
      show: show,
    };
  });

  return (
    <Container
      className={
        animationActive ? (visible ? "comeInAnimate" : "comeOutAnimate") : ""
      }
    >
      <Body>
        <HeaderBody>
          <p style={{ color: "white" }}>Thông tin tra cứu quy hoạch</p>
        </HeaderBody>
        <ContentBody>
          {planDataList && planDataList.length > 0 ? (
            <>
              {planDataList.map((e, i) => (
                <>
                  <FormControlLabel
                    label={e.planName}
                    control={
                      <Checkbox
                        checked={checked[0] && checked[1]}
                        indeterminate={checked[0] !== checked[1]}
                        onChange={handleChange1}
                      />
                    }
                  />
                  {children}
                </>
              ))}
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "200px",
                backgroundColor: "white",
              }}
            >
              <TextSnippetIcon color="action" />
              <p>Không có dữ liệu</p>
            </Box>
          )}
        </ContentBody>
      </Body>
      <ToolMenu onClick={visible ? hide : show}>
        {visible ? (
          <ArrowLeftIcon color="action" />
        ) : (
          <ArrowRightIcon color="action" />
        )}
      </ToolMenu>
    </Container>
  );
}

export default React.forwardRef(IndentifyPane);
