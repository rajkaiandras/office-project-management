import { Outlet } from 'react-router-dom';

export const ProjectsLayout = () => {
  return (
    <section className="w-full max-w-7xl p-4 m-auto">
      <Outlet />
    </section>
  );
};
