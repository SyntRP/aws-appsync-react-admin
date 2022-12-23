import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { lazy, Suspense } from "react";
import useToggle from "../../helpers/hooks/useToggle";
import DynamicModel from "../reusable/DynamicModel";
import { Loader } from "../common/Loader";
import withSuspense from "../../helpers/hoc/withSuspense";
const LinkShare = lazy(() => import("./LinkShare"));
const QrShare = lazy(() => import("./QrCodeShare"));

const ShareSurvey = ({ toggle, currentSurveyId }) => {
  const {
    open: linkShareOpen,
    toggleOpen: linkShareToggleOpen,
    setOpen: setLinkShareOpen,
  } = useToggle();
  const {
    open: QrShareOpen,
    toggleOpen: QrShareToggleOpen,
    setOpen: setQrShareOpen,
  } = useToggle();

  const openLinkShareDialog = Boolean(linkShareOpen);
  const openQrShareDialog = Boolean(QrShareOpen);

  const handleSurveyLinkShareDialog = () => {
    setLinkShareOpen(true);
  };
  const handleSurveyQrShareDialog = () => {
    setQrShareOpen(true);
  };

  const handleLinkShareToggleOpen = () => {
    linkShareToggleOpen();
  };
  const handleLinkQrToggleOpen = () => {
    QrShareToggleOpen();
  };
  return (
    <>
      <DynamicModel
        dialogTitle=" Share  Link  "
        open={openLinkShareDialog}
        toggle={handleLinkShareToggleOpen}
        isClose
        maxWidth="md"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <LinkShare
            toggle={handleLinkShareToggleOpen}
            surveyId={currentSurveyId}
          />
        </Suspense>
      </DynamicModel>
      <DynamicModel
        dialogTitle="Qr Code Share "
        open={openQrShareDialog}
        toggle={handleLinkQrToggleOpen}
        isClose
        maxWidth="md"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <QrShare toggle={handleLinkQrToggleOpen} surveyId={currentSurveyId} />
        </Suspense>
      </DynamicModel>
      <Box>
        <Grid item container spacing={2} minHeight={160}>
          <Grid
            item
            xs
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={() => handleSurveyLinkShareDialog()}
            >
              Generate Survey Link
            </Button>
          </Grid>
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
          ></Grid>
          <Grid
            item
            xs
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={() => handleSurveyQrShareDialog()}
            >
              Generate Survey Qr Code
            </Button>
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
        >
          <Button onClick={toggle} variant="text" color="info">
            Close
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default withSuspense(ShareSurvey);
