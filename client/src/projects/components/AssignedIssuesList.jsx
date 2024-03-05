import { useState, useEffect } from 'react';

import { GettingIssuesByUserIdRequest } from '../../services/GettingIssuesByUserIdRequest';

import { AssignedIssueItem } from './AssignedIssueItem';
import { SectionTitle } from '../../shared/components/UIElements/SectionTitle';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';
import { ErrMessage } from '../../shared/components/UIElements/ErrMessage';

export const AssignedIssuesList = () => {
  const [issuesByUserId, setIssuesByUserId] = useState([]);

  const {
    gettingIssuesByUserId,
    isGettingIssuesByUserIdPending,
    isGettingIssuesByUserIdSuccess,
    gettingIssuesByUserIdError,
  } = GettingIssuesByUserIdRequest();

  useEffect(() => {
    const getIssuesByUserId = async () => {
      const issues = await gettingIssuesByUserId('65642fda6db9a933739fed1b');

      setIssuesByUserId(issues);
    };

    getIssuesByUserId();
  }, []);

  return (
    <section>
      <SectionTitle title={'Assigned issues to Me'} />

      <ul className="flex flex-col justify-start w-full">
        {isGettingIssuesByUserIdSuccess &&
          Array.isArray(issuesByUserId) &&
          issuesByUserId.map((issue) => {
            return <AssignedIssueItem key={issue.id} issue={issue} />;
          })}
      </ul>

      {isGettingIssuesByUserIdPending && <LoadingSpinner />}
      {gettingIssuesByUserIdError && (
        <ErrMessage message={gettingIssuesByUserIdError} />
      )}
    </section>
  );
};
