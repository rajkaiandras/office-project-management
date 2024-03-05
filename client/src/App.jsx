import { useContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthContext } from './contexts/auth-context.jsx';

import { publicRoutes } from './router/router.jsx';
import { privateRoutes } from './router/router.jsx';

export const App = () => {
  const auth = useContext(AuthContext);

  let router;
  !auth.state.user
    ? (router = createBrowserRouter(publicRoutes))
    : (router = createBrowserRouter(privateRoutes));

  return <RouterProvider router={router} />;
};
