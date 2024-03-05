import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';

export const Avatar = ({ user }) => {
  return (
    <NavLink
      to="/profile"
      className={({ isActive }) =>
        isActive
          ? 'px-4 border border-green-500 rounded-sm text-blue-500'
          : 'px-4 border border-green-500 rounded-sm'
      }
    >
      {user}
    </NavLink>
  );
};

Avatar.propTypes = {
  user: PropTypes.string,
};
