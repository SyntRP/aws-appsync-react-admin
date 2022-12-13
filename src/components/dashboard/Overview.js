import { CardContent, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Overview = ({
  surveyCount,
  surveyEntriesCount,
  surveyLocationsCount,
}) => {
  return (
    <Grid container px={1}>
      <Wrapper title="Total Survey" count={surveyCount} />
      <Wrapper title="Total Entries" count={surveyEntriesCount} secondary />
      <Wrapper title="Total Location" count={surveyLocationsCount} />
    </Grid>
  );
};

export default Overview;

const Wrapper = ({ count, title = "Total", secondary = false }) => {
  return (
    <Grid item xs={12} sm={6}>
      <Paper
        sx={{
          borderRadius: 1,
          bgcolor: secondary ? "secondary.main" : "primary.main",
          m: 1,
          color: "white",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h4">{count}</Typography>
          </Box>
        </CardContent>
      </Paper>
    </Grid>
  );
};
