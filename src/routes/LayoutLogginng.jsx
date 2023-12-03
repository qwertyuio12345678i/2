import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { setActive } from '../utils/setActive';
import { UserContext } from '../components/UserContextProvider';

function Layout() {
  const { onChange, user } = useContext(UserContext);

  function handleLogOut() {
    localStorage.clear();
    onChange(null); // This updates the user context
  }

  return (
    <div className="w-5/6 mx-auto my-1 border border-black-600 rounded shadow-lg overflow-hidden">
      <header className="flex flex-row justify-end items-center mb-10 bg-sky-500 text-white p-5">
        <nav className="prose-xl flex flex-row gap-4">
          <NavLink className={setActive} to={'/'}>
            Log in
          </NavLink>
          <NavLink to={'/signup'} end={true} className={setActive}>
            Sign in
          </NavLink>
        </nav>
      </header>

      <main className="w-full">
        <Outlet />
      </main>

      <footer className="flex flex-row justify-between">
        <div>Created by Artem Nikitin</div>
        <div>BSU 2023</div>
      </footer>
    </div>
  );
}

export default React.memo(Layout);
