import { useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const AccordionItem = (props) => {
  const { planData, expanded, setExpanded, map } = props;
  const [checked, setChecked] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (expanded === planData.planId) {
      map.overlayMapTypes.pop();
      planData.lmuDtos.forEach((element, i) => {
        map.overlayMapTypes.setAt(i, element.overlay);
      });
      const tmpCkds = planData.lmuDtos.map((lmu, j) => true);
      setChecked(tmpCkds);
    }
  }, [expanded]);

  return (
    <Accordion
      expanded={expanded === planData.planId}
      onChange={handleChange(planData.planId)}
      sx={{ width: "100%" }}
    >
      <AccordionSummary
        aria-controls="panel1d-content"
        id="panel1d-header"
        onClick={(e) => {
          if (expanded !== planData.planId) {
            map.overlayMapTypes.pop();
            planData.lmuDtos.forEach((element, i) => {
              map.overlayMapTypes.setAt(i, element.overlay);
            });
          }
          const tmpCkds = planData.lmuDtos.map((lmu, j) => true);
          setChecked(tmpCkds);
        }}
      >
        <Typography>{planData.planName}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ padding: 0, maxHeight: "500px", overflow: "auto" }}
      >
        <FormGroup sx={{ padding: "10px 0px 10px 40px" }}>
          {planData.lmuDtos.map((lmu, j) => {
            return (
              <FormControlLabel
                key={j}
                control={
                  <Checkbox
                    checked={checked[j] || false}
                    onChange={(event) => {
                      setChecked((origin) =>
                        origin?.map((ck, index) => {
                          if (index === j) return event.target.checked;
                          return ck;
                        })
                      );
                      if (event.target.checked)
                        map.overlayMapTypes.setAt(j, lmu.overlay);
                      else map.overlayMapTypes.setAt(j, null);
                    }}
                  />
                }
                label={lmu.landUnit}
              />
            );
          })}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionItem;
