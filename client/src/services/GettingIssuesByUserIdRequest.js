import { useHttpClient } from '../hooks/useHttpClient';

export const GettingIssuesByUserIdRequest = () => {
  const {
    sendRequest,
    isPending: isGettingIssuesByUserIdPending,
    isSuccess: isGettingIssuesByUserIdSuccess,
    error: gettingIssuesByUserIdError,
  } = useHttpClient();

  const gettingIssuesByUserId = async (userId) => {
    try {
      const result = await sendRequest(
        `http://localhost:8080/api/projects/issues/${userId}`
      );

      return result;
    } catch (err) {
      console.log({
        err,
        gettingIssuesByUserIdError,
      });
    }
  };

  return {
    gettingIssuesByUserId,
    isGettingIssuesByUserIdPending,
    isGettingIssuesByUserIdSuccess,
    gettingIssuesByUserIdError,
  };
};
