import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { NavLink, Routes, Route, RouterProvider } from 'react-router-dom';
//import { router } from './data/Routes';
import Login from './routes/LoginAndSignup/Login';
import ErrorPage from './routes/ErrorPage/ErrorPage';
import Layout from './routes/Layout';
import About from './routes/About';
import { router } from './data/DataRoutes';
import { createBrowserRouter } from 'react-router-dom';
import UserContextProvider from './components/UserContextProvider';

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;

// <div className="prose mr-auto w-full">
//   <Routes>
//     <Route path="/login" element={<Login />} />
//     <Route path="/" element={<Layout />}>
//       <Route index element={<About />} />
//       <Route path="posts" />
//       <Route path="posts/:id" />
//       <Route path="*" element={<ErrorPage />} />
//     </Route>
//   </Routes>
// </div>

// return (
//   <div className="prose flex flex-col gap-5">
//     <h1>Login</h1>
//     <input
//       placeholder="email"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//     />
//     <input
//       type="password"
//       placeholder="password"
//       value={password}
//       onChange={(e) => setEmail(e.target.value)}
//     />
//     <button onClick={handleLogin}></button>
//   </div>
// );
