import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';

export const Avatar = ({ userLastName, userImage }) => {
  return (
    <NavLink
      to="/profile"
      className={({ isActive }) =>
        isActive
          ? 'px-4 border border-green-500 rounded-sm text-blue-500'
          : 'px-4 border border-green-500 rounded-sm'
      }
    >
      <img
        className="w-4 h-4"
        src={`http://localhost:5173/${userImage}`}
        alt="User Image"
      />
      {userLastName}
    </NavLink>
  );
};

Avatar.propTypes = {
  userLastName: PropTypes.string,
  userImage: PropTypes.string,
};
