//import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error =
    useRouteError() ??
    new Response('', { status: 404, statusText: "This page doesn't exist!" });

  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      error.statusText = "This page doesn't exist!";
    }

    if (error.status === 401) {
      error.statusText = "You aren't authorized to see this";
    }

    if (error.status === 503) {
      error.statusText = 'Looks like our API is down';
    }

    if (error.status === 418) {
      error.statusText = 'U+1FAD6';
    }
  }

  return (
    <div>
      <h1>404</h1>
      Go <Link to={'/home'}>Home</Link>
    </div>
  );
}

export default React.memo(ErrorPage);
