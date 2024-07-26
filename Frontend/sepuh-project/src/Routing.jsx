import { createBrowserRouter, RouterProvider, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './admin/pages/home';
// import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      }
    ],
  },
]);

export default router;
