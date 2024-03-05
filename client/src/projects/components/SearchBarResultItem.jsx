import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

export const SearchBarResultItem = ({
  resultName,
  projectId,
  resetSearchBar,
}) => {
  const navigate = useNavigate();

  return (
    <Link to={`projects/${projectId}`}>
      <li
        className="ml-4 text-black hover:bg-yellow-300"
        onClick={() => {
          resetSearchBar();
          // navigate(`/projects/${projectId}`);
        }}
      >
        {resultName}
      </li>
    </Link>
  );
};

SearchBarResultItem.propTypes = {
  resultName: PropTypes.string,
  projectId: PropTypes.string,
  resetSearchBar: PropTypes.func,
};
