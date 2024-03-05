import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      return { ...state, user: action.payload };
    case 'LOG_IN':
      return { ...state, user: action.payload };
    case 'LOG_OUT':
      return { ...state, user: null };
    default:
      throw Error('Unknown dispatch action type: ' + action.type);
  }
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.element,
};
