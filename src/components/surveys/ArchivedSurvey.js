import { Box, Button, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import {
  UPDATE_QUESTIONNAIRE,
  UPDATE_SURVEY,
  UPDATE_SURVEYENTRIES,
} from "../../graphql/custom/mutations";
import {
  LIST_QUESTIONNARIES,
  LIST_SURVEYS,
  LIST_SURVEY_ENTRIES,
} from "../../graphql/custom/queries";
import { useState } from "react";
import { Loader } from "../common/Loader";
import withSuspense from "../../helpers/hoc/withSuspense";

const ArchivedSurvey = ({ currentSurveyData, toggle }) => {
  const [isPostingResponse, setIsPostingResponse] = useState(false);
  const [updateSurvey, { loading, error }] = useMutation(UPDATE_SURVEY, {
    query: LIST_SURVEYS,
    variables: { filter: { archived: { ne: true } }, limit: 100 },
    refetchQueries: [
      {
        query: LIST_SURVEYS,
        variables: { filter: { archived: { ne: true } }, limit: 100 },
      },
    ],
  });
  const variables = {
    filter: { archived: { ne: true } },
  };
  const { data: listSurveyEntriesData } = useQuery(LIST_SURVEY_ENTRIES, {
    variables,
  });

  const SurveyEntryData =
    listSurveyEntriesData?.listSurveyEntriess?.items?.filter(
      (q) => q?.questionnaireId === currentSurveyData?.preQuestionnaire?.id
    );
  const [UpdateQuestionnaire] = useMutation(UPDATE_QUESTIONNAIRE);
  const [UpdateSurveyEntries] = useMutation(UPDATE_SURVEYENTRIES);

  const onClickUpdate = async () => {
    setIsPostingResponse(true);
    const ArchiveSurvey = {
      id: currentSurveyData?.id,
      archived: true,
    };
    const res = await updateSurvey({ variables: { input: ArchiveSurvey } });

    const { data } = res;
    if (data?.updateSurvey) {
      const questionnaireID = currentSurveyData?.preQuestionnaire?.id;
      const questionnaireData = {
        id: questionnaireID,
        archived: true,
      };
      await UpdateQuestionnaire({
        variables: { input: questionnaireData },
      });

      await Promise.all(
        [
          ...SurveyEntryData,
          {
            id: SurveyEntryData?.id,
          },
        ].map(async (response) => {
          const archiveData = {
            id: response?.id,
            archived: true,
          };
          if (archiveData?.id) {
            await UpdateSurveyEntries({
              variables: { input: archiveData },
            });
          }
          return <Loader />;
        })
      );
    }
    setIsPostingResponse(true);
    toggle();
  };

  return (
    <Box>
      {SurveyEntryData ? (
        <>
          <Typography color="success">{`Are You Sure You Want to Archive ${currentSurveyData?.name} survey?`}</Typography>
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

            {!isPostingResponse ? (
              <Button
                onClick={onClickUpdate}
                variant="contained"
                color="primary"
              >
                Archive
              </Button>
            ) : (
              <Button variant="contained" color="primary" disabled>
                Archiving ....
              </Button>
            )}
          </Box>
        </>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default withSuspense(ArchivedSurvey);
