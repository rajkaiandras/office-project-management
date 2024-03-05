import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

// auth context
import { AuthContext } from '../../../contexts/auth-context.jsx';

// custom hooks
import { AuthLogOut } from '../../../services/AuthLogOut.js';
import { DropDown } from '../UIElements/DropDown.jsx';

export const MainNavigation = () => {
  const auth = useContext(AuthContext);
  const { logOut } = AuthLogOut();

  const authLogOutHandler = () => {
    logOut();
  };

  return (
    <nav>
      <ul className="flex gap-6">
        {auth.state.user && (
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? 'text-blue-500' : null)}
            >
              Dashboard
            </NavLink>
          </li>
        )}
        {auth.state.user && (
          <li>
            <DropDown
              title={'Projects'}
              items={[
                { title: 'All Projects', link: '/projects' },
                { title: 'Create Project', link: '/projects/create' },
              ]}
            />
          </li>
        )}
        {!auth.state.user && (
          <li>
            <NavLink
              to="/auth"
              className={({ isActive }) => (isActive ? 'text-blue-500' : null)}
            >
              Authorization
            </NavLink>
          </li>
        )}
        {auth.state.user && (
          <li
            className="text-red-600 cursor-pointer"
            onClick={() => authLogOutHandler()}
          >
            Log out
          </li>
        )}
      </ul>
    </nav>
  );
};
