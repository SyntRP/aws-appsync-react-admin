import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ShareSurvey = ({ toggle }) => {
  return (
    <Box>
      <Grid container spacing={2} my={2} justifyContent="center">
        <Grid item xs={6} cm={6} my={2}>
          <Button color="primary">Link Survey</Button>
        </Grid>
        <Grid item xs={6} cm={6} my={2}>
          <Button color="primary">QR Survey</Button>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
        }}
        spacing={2}
        my={2}
      >
        <Button onClick={toggle} variant="text" color="info">
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default ShareSurvey;
