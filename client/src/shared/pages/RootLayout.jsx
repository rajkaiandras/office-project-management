import React from 'react';
import { Outlet } from 'react-router-dom';

import { MainHeader } from '../components/navigation/MainHeader';
import { MainFooter } from '../components/main-footer/MainFooter';

export const RootLayout = () => {
  return (
    <div className="grid grid-cols-12 grid-rows-[104px_1fr_160px] min-h-screen">
      <MainHeader />

      <main className="col-span-12 row-start-2 row-end-3 w-full max-w-7xl p-4 mx-auto">
        <Outlet />
      </main>

      <MainFooter />
    </div>
  );
};
