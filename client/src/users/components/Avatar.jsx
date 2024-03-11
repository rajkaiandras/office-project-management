import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';

export const Avatar = ({ userLastName, userImage, withName }) => {
  return (
    <NavLink
      to="/profile"
      className={({ isActive }) =>
        isActive
          ? 'flex items-center gap-2 px-4 text-blue-500'
          : 'flex justify-center items-center gap-2 px-4'
      }
    >
      <img
        className="w-8 h-8 rounded-full"
        src={`http://localhost:8080/${userImage}`}
        alt="User Image"
      />
      {withName && userLastName}
    </NavLink>
  );
};

Avatar.propTypes = {
  userLastName: PropTypes.string,
  userImage: PropTypes.string,
  withName: PropTypes.bool,
};
