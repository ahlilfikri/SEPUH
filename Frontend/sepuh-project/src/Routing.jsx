import { createBrowserRouter, RouterProvider, Route, Routes } from 'react-router-dom';
import App from './App';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
    //   {
    //     path: '/',
    //     element: <Laporan />,
    //   }
    ],
  },
]);

export default router;
