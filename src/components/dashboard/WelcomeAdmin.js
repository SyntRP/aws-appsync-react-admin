import { Button, CardContent, Paper, Typography } from "@mui/material";

const WelcomeAdmin = () => {
  return (
    <Paper
      variant="elevation"
      elevation={3}
      sx={{
        overflow: "hidden",
        position: "relative",
        borderRadius: "20px",
        borderWidth: "0px",
        ":before": {
          content: `""`,
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: "unset",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(/image/USER_BG.svg)`,
          backgroundPosition: "80% 1%",
          backgroundSize: "30%",
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom zIndex={9} position="relative">
          Hey Admin,
          <br />
          Dowload Latest Report
        </Typography>
        <Button
          variant="contained"
          sx={{ my: 2 }}
          size="medium"
          color="secondary"
        >
          Download
        </Button>
      </CardContent>
    </Paper>
  );
};

export default WelcomeAdmin;
