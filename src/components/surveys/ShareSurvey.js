import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { lazy, Suspense } from "react";
import useToggle from "../../helpers/hooks/useToggle";
import DynamicModel from "../reusable/DynamicModel";
import { Loader } from "../common/Loader";
import withSuspense from "../../helpers/hoc/withSuspense";
const LinkShare = lazy(() => import("./LinkShare"));
const TestLinkShare = lazy(() => import("./TestLinkShare"));
const QrShare = lazy(() => import("./QrCodeShare"));
const TestQrCodeShare = lazy(() => import("./TestQrCodeShare"));

const ShareSurvey = ({ toggle, currentSurveyData }) => {
  const {
    open: linkShareOpen,
    toggleOpen: linkShareToggleOpen,
    setOpen: setLinkShareOpen,
  } = useToggle();
  const {
    open: TestLinkShareOpen,
    toggleOpen: TestLinkShareToggleOpen,
    setOpen: setTestLinkShareOpen,
  } = useToggle();
  const {
    open: QrShareOpen,
    toggleOpen: QrShareToggleOpen,
    setOpen: setQrShareOpen,
  } = useToggle();
  const {
    open: TestQrShareOpen,
    toggleOpen: TestQrShareToggleOpen,
    setOpen: setTestQrShareOpen,
  } = useToggle();

  const openLinkShareDialog = Boolean(linkShareOpen);
  const openQrShareDialog = Boolean(QrShareOpen);
  const openTestLinkShareDialog = Boolean(TestLinkShareOpen);
  const openTestQrShareDialog = Boolean(TestQrShareOpen);

  const handleSurveyLinkShareDialog = () => {
    setLinkShareOpen(true);
  };
  const handleSurveyTestLinkShareDialog = () => {
    setTestLinkShareOpen(true);
  };
  const handleSurveyQrShareDialog = () => {
    setQrShareOpen(true);
  };
  const handleSurveyTestQrShareDialog = () => {
    setTestQrShareOpen(true);
  };

  const handleLinkShareToggleOpen = () => {
    linkShareToggleOpen();
  };
  const handleQrToggleOpen = () => {
    QrShareToggleOpen();
  };

  const handleTestLinkShareToggleOpen = () => {
    TestLinkShareToggleOpen();
  };
  const handleTestQrToggleOpen = () => {
    TestQrShareToggleOpen();
  };
  return (
    <>
      <DynamicModel
        dialogTitle="Generate Survey Link "
        open={openLinkShareDialog}
        toggle={handleLinkShareToggleOpen}
        isClose
        maxWidth="md"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <LinkShare
            toggle={handleLinkShareToggleOpen}
            surveyId={currentSurveyData?.id}
          />
        </Suspense>
      </DynamicModel>
      <DynamicModel
        dialogTitle="Generate Survey Qr Code"
        open={openQrShareDialog}
        toggle={handleQrToggleOpen}
        isClose
        maxWidth="md"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <QrShare
            toggle={handleQrToggleOpen}
            surveyId={currentSurveyData?.id}
          />
        </Suspense>
      </DynamicModel>
      <DynamicModel
        dialogTitle="Generate Test Survey Link "
        open={openTestLinkShareDialog}
        toggle={handleTestLinkShareToggleOpen}
        isClose
        maxWidth="md"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <TestLinkShare
            toggle={handleTestLinkShareToggleOpen}
            surveyId={currentSurveyData?.id}
          />
        </Suspense>
      </DynamicModel>
      <DynamicModel
        dialogTitle="Generate Test Survey Qr Code"
        open={openTestQrShareDialog}
        toggle={handleTestQrToggleOpen}
        isClose
        maxWidth="md"
        isActions={false}
      >
        <Suspense fallback={<Loader />}>
          <TestQrCodeShare
            toggle={handleTestQrToggleOpen}
            surveyId={currentSurveyData?.id}
          />
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
              Generate Link
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
              Generate Qr Code
            </Button>
          </Grid>
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
              onClick={() => handleSurveyTestLinkShareDialog()}
            >
              Generate Test Link
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
              onClick={() => handleSurveyTestQrShareDialog()}
            >
              Generate Test Qr
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
