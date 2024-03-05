import { Link, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <section>
      <h1>404 Error</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <h2>
        It looks like that page does not exists - please check the url and try
        again!
      </h2>
      <Link to="/">Go to home page</Link>
    </section>
  );
};
