import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// auth context
import { AuthContext } from '../contexts/auth-context';

export const AuthLogOut = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    auth.dispatch({ type: 'LOG_OUT', payload: null });
    navigate('/');
  };

  return { logOut };
};
