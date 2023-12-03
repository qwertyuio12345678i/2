import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContextProvider';
import React from 'react';

function RequireAuth({ children }) {
  let { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.id) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default React.memo(RequireAuth);
