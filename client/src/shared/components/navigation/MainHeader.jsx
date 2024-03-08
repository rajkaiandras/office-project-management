import { useContext } from 'react';

import { AuthContext } from '../../../contexts/auth-context';

import { MainNavigation } from './MainNavigation';
import { Avatar } from '../../../users/components/Avatar';
import { DarkModeSwitch } from '../darkMode/DarkModeSwitch';
import { Logo } from '../UIElements/Logo';
import { SearchBar } from '../../../projects/components/SearchBar';

export const MainHeader = () => {
  const auth = useContext(AuthContext);

  return (
    <header className="col-span-12 row-start-1 row-end-2 w-full max-w-7xl p-4 mx-auto flex items-center justify-between">
      <Logo />

      {auth.state.user && <SearchBar />}

      <section className="flex gap-4">
        <MainNavigation />

        {auth.state.user && (
          <Avatar
            userLastName={auth.state.user.lastName}
            userImage={auth.state.user.image}
          />
        )}

        <DarkModeSwitch />
      </section>
    </header>
  );
};
