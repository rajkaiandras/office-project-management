import { useHttpClient } from '../hooks/useHttpClient';

export const GettingSearchResultsRequest = () => {
  const {
    sendRequest,
    isPending: isGettingSearchResultsPending,
    isSuccess: isGettingSearchResultsSuccess,
    error: gettingSearchResultsError,
  } = useHttpClient();

  const gettingSearchResults = async (userId, keyword) => {
    try {
      const result = await sendRequest(
        `http://localhost:8080/api/projects/search?uid=${userId}&keyw=${keyword}`
      );

      return result;
    } catch (err) {
      console.log({
        err,
        gettingSearchResultsError,
      });
    }
  };

  return {
    gettingSearchResults,
    isGettingSearchResultsPending,
    isGettingSearchResultsSuccess,
    gettingSearchResultsError,
  };
};
