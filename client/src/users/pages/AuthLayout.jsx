import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <section className="w-full max-w-7xl p-4 m-auto">
      <h1>Authorization Layout</h1>

      <Outlet />
    </section>
  );
};
