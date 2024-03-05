import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Logo = ({ center }) => {
  return (
    <Link className={`${center && 'text-center'}`} to="/">
      <div className="font-bold text-white">OFFICE</div>
      <div>Project Management</div>
    </Link>
  );
};

Logo.propTypes = {
  center: PropTypes.bool,
};
