import { createBrowserRouter, RouterProvider, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './admin/pages/home';
import Signin from './auth/signin';
import Signup from './auth/signup';
// import Reset from './auth/signup';
import Pasien from './admin/pages/pasien';
import Dokter from './admin/pages/dokter';
import Jadwal from './admin/pages/jadwal';
// import ProtectedRoute from './ProtectedRoute';

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
        path: '/pasien',
        element: <Pasien />,
      },
      {
        path: '/dokter',
        element: <Dokter />,
      },
      {
        path: '/jadwal',
        element: <Jadwal />,
      },
    ],
  },
]);

export default router;
