import React from 'react';
import { createBrowserRouter, RouterProvider, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './admin/pages/home';
import Signin from './auth/signin';
import Signup from './auth/signup';
import Reset from './auth/reset';
import Profile from './user/pages/profile';
import Dashboard from './admin/pages';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signin',
        element: <Signin />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute component={Profile} role={0} />
        ),
      },
      {
        path: '/reset',
        element: (
          <ProtectedRoute component={Reset} role={0} />
        ),
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute component={Dashboard} role={1}/>
        ),
      },
    ],
  },
]);

export default router;
