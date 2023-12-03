import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { setActive } from "../utils/setActive";
import { UserContext } from "../components/UserContextProvider";

function Layout() {
  const { onChange, user } = useContext(UserContext);

  function handleLogOut() {
    localStorage.clear();
    onChange(null);
  }

  return (
    <div className="w-5/6 mx-auto my-1 border border-black-600 rounded shadow-lg overflow-hidden">
      <header className="flex justify-between items-center mb-10 bg-sky-500 text-white p-5">
        <div>
          <h4 className="prose-xl w-full ml-0 text-left">
            Hello, {user?.email}
          </h4>
        </div>
        <nav className="prose-xl flex flex-row gap-4">
          <NavLink className={setActive} to={"/home"}>
            About
          </NavLink>
          <NavLink to={"/home/notes"} end className={setActive}>
            Notes
          </NavLink>
          <NavLink
            to={"/"}
            end
            className={setActive}
            onClick={() => handleLogOut()}
          >
            Log out
          </NavLink>
        </nav>
      </header>

      <main className="w-full">
        <Outlet />
      </main>

      <footer className="flex flex-row justify-between p-4 mt-12 border-t border-gray-300">
        <p className="prose">Created by Artem Nikitin</p>
        <p className="prose">BSU 2023</p>
      </footer>
    </div>
  );
}

export default React.memo(Layout);

/*
return (
  <>
    <header className="prose flex flex-row gap-4 ">
      <NavLink to={'/'}>About</NavLink>
      <NavLink to={'/login'}>Log out</NavLink>
      <NavLink to={'/notes'}>Notes</NavLink>
    </header>
    <Outlet />
    <footer></footer>
  </>
);
*/
