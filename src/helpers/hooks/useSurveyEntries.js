import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LIST_SURVEY_ENTRIES } from "../../graphql/custom/queries";

const useSurveyEntries = (initialVar = {}) => {
  let variables = { ...initialVar, limit: 1000 };
  const {
    loading: listSurveyEntriesLoading,
    error: listSurveyEntriesError,
    data: listSurveyEntriesData,
    fetchMore: listSurveyEntriesFetchMore,
  } = useQuery(LIST_SURVEY_ENTRIES, {
    variables,
  });

  const [surveyEntries, setSurveyEntries] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleSetSurvey = (SurveyEntriesData) => {
    const {
      listSurveyEntriess: { items, nextToken },
    } = SurveyEntriesData;
    if (items?.length > 0)
      setSurveyEntries((prevState) => [...prevState, ...items]);

    if (nextToken) {
      setNextToken(nextToken);
    } else {
      setNextToken(null);
      setLoading(false);
    }
  };

  const fetchMore = async () => {
    const res = await listSurveyEntriesFetchMore({
      variables: {
        nextToken: nextToken,
      },
    });
    handleSetSurvey(res.data);
  };

  useEffect(() => {
    if (!listSurveyEntriesLoading && !listSurveyEntriesError) {
      handleSetSurvey(listSurveyEntriesData);
    }
  }, [listSurveyEntriesLoading]);

  useEffect(() => {
    if (nextToken) {
      const handleFetch = async () => await fetchMore();
      handleFetch();
    }
  }, [nextToken]);

  return { loading, surveyEntries };
};

export default useSurveyEntries;
