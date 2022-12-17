import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LIST_RESPONSESS } from "../../graphql/custom/queries";

const useSurveyResponses = () => {
  let variables = {
    limit: 100000,
  };
  const {
    loading: listSurveyResponsesLoading,
    error: listSurveyResponsesError,
    data: listSurveyResponsesData,
    fetchMore: listSurveyResponsesFetchMore,
  } = useQuery(LIST_RESPONSESS, {
    variables,
  });

  const [surveyResponses, setSurveyResponses] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSetSurvey = (SurveyResponsesData) => {
    const {
      listResponsess: { items, nextToken },
    } = SurveyResponsesData;
    if (items?.length > 0)
      setSurveyResponses((prevState) => [...prevState, ...items]);

    if (nextToken) {
      setNextToken(nextToken);
    } else {
      setNextToken(null);
      setLoading(false);
    }
  };

  const fetchMore = async () => {
    const res = await listSurveyResponsesFetchMore({
      variables: {
        nextToken: nextToken,
      },
    });
    handleSetSurvey(res.data);
  };

  useEffect(() => {
    if (!listSurveyResponsesLoading && !listSurveyResponsesError) {
      handleSetSurvey(listSurveyResponsesData);
    }
  }, [listSurveyResponsesLoading]);

  useEffect(() => {
    if (nextToken) {
      const handleFetch = async () => await fetchMore();
      handleFetch();
    }
  }, [nextToken]);

  return { loading, surveyResponses };
};

export default useSurveyResponses;
