import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import moment from "moment";

const QuestionnarieDetailCard = ({ questionnarieData }) => {
  const { endMsg, introMsg, name, createdAt, description } = questionnarieData;
  const linkify = () => {
    const urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return endMsg?.replace(urlRegex, function (url) {
      return (
        '<a href="' + url + '" target="_blank" rel="noreferrer">' + url + "</a>"
      );
    });
  };

  return (
    <>
      <Paper elevation={20} sx={{ mb: "1rem", mt: 2 }}>
        <Card
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            bgcolor: "#6aa342",
          }}
        >
          <CardContent>
            <Typography
              sx={{ mb: 1, fontWeight: "bold", color: "white" }}
              color="text.primary"
              gutterBottom
              variant="h6"
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              color="text.secondary"
              sx={{ color: "white" }}
            >
              {moment(createdAt).format(" Do MMMM  YYYY ")}
            </Typography>
            <Grid container spacing={1} sx={{ mt: "1rem", color: "white" }}>
              <Grid item xs={4} md={2}>
                <Typography
                  sx={{ mb: 1.5, fontWeight: "bold", color: "white" }}
                  color="text.primary"
                  gutterBottom
                  variant="body2"
                >
                  Description
                </Typography>
              </Grid>
              <Grid item xs={8} md={10}>
                <Typography
                  sx={{ mb: 1.5, color: "white" }}
                  color="text.primary"
                  gutterBottom
                  variant="body2"
                >
                  {description}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4} md={2}>
                <Typography
                  sx={{ mb: 1.5, fontWeight: "bold", color: "white" }}
                  color="text.primary"
                  gutterBottom
                  variant="body2"
                >
                  Intro Message
                </Typography>
              </Grid>
              <Grid item xs={8} md={10}>
                <Typography
                  sx={{ mb: 1.5, color: "white" }}
                  color="text.primary"
                  gutterBottom
                  variant="body2"
                >
                  {introMsg}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4} md={2}>
                <Typography
                  sx={{ fontWeight: "bold", color: "white" }}
                  color="text.primary"
                  gutterBottom
                  variant="body2"
                >
                  ThankYou Message
                </Typography>
              </Grid>
              <Grid item xs={8} md={10}>
                <Typography
                  // color="text.primary"
                  gutterBottom
                  variant="body2"
                  sx={{ color: "white" }}
                >
                  <div dangerouslySetInnerHTML={{ __html: linkify() }} />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default QuestionnarieDetailCard;
