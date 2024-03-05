import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { SearchBarResultItem } from './SearchBarResultItem';
import { ErrMessage } from '../../shared/components/UIElements/ErrMessage';

export const SearchBarResultsList = ({
  searchResults,
  gettingSearchResultsError,
  resetSearchBar,
}) => {
  const { message, projectResults, issueResults } = searchResults;
  return (
    <section className="absolute top-12 left-[1px] w-full p-4 rounded-md bg-[#F4E869]">
      {message && <ErrMessage message={message} />}

      {projectResults.length !== 0 && (
        <ul>
          {projectResults?.length > 1 ? <p>PROJECTS</p> : <p>PROJECT</p>}

          {projectResults.map((project) => {
            return (
              <SearchBarResultItem
                key={uuidv4()}
                resultName={project.resultName}
                projectId={project.projectId}
                resetSearchBar={resetSearchBar}
              />
            );
          })}
        </ul>
      )}

      {issueResults.length !== 0 && (
        <ul>
          {issueResults?.length > 1 ? <p>ISSUES</p> : <p>ISSUE</p>}

          {issueResults.map((issue) => {
            return (
              <SearchBarResultItem
                key={uuidv4()}
                resultName={issue.resultName}
                projectId={issue.projectId}
                resetSearchBar={resetSearchBar}
              />
            );
          })}
        </ul>
      )}

      {gettingSearchResultsError && (
        <ErrMessage message={gettingSearchResultsError} />
      )}
    </section>
  );
};

SearchBarResultsList.propTypes = {
  searchResults: PropTypes.shape({
    message: PropTypes.string,
    projectResults: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.arrayOf({
        resultName: PropTypes.string,
        projectId: PropTypes.string,
      }),
    ]),
    issueResults: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.arrayOf({
        resultName: PropTypes.string,
        projectId: PropTypes.string,
      }),
    ]),
  }),
  gettingSearchResultsError: PropTypes.bool,
  resetSearchBar: PropTypes.func,
};
