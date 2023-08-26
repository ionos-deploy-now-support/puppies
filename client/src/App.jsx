import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
// import SpinnerFullPage from './components/SpinnerFullPage';

// import LittersList from './components/LittersList';

import {
  AboutUs,
  Admin,
  Clients,
  ClientAdd,
  ClientEdit,
  DashboardLayout,
  Error,
  Gallery,
  HomeLayout,
  Landing,
  Litters,
  LitterDetails,
  Login,
  Profile,
  Puppies,
  Register,
  Reserve,
  Stats,
} from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { loader as allClientsLoader } from './pages/Clients';
import { action as addClientAction } from './pages/ClientAdd';
import { loader as editClientLoader } from './pages/ClientEdit';
import { action as editClientAction } from './pages/ClientEdit';
import { action as deleteClientAction } from './pages/ClientDelete';
import { action as profileAction } from './pages/Profile';
// import { loader as adminLoader } from './pages/Admin';
// import { loader as statsLoader } from './pages/Stats';
// import ErrorElement from './components/ErrorElement';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5,
//     },
//   },
// });

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'reserve',
        element: <Reserve />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <Puppies />,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'litters',
            element: <Litters />,
          },
          {
            path: 'clients',
            element: <Clients />,
            loader: allClientsLoader,
          },
          {
            path: 'client-add',
            element: <ClientAdd />,
            action: addClientAction,
          },
          {
            path: 'client-edit/:id',
            element: <ClientEdit />,
            loader: editClientLoader,
            action: editClientAction,
          },
          {
            path: 'client-delete/:id',
            action: deleteClientAction,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction,
          },
        ],
      },
    ],
  },
]);

const API_URL = 'https://puppies-api-ek0y.onrender.com';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
