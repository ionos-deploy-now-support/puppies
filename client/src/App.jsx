import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  About,
  ClientsLayout,
  Clients,
  ClientAdd,
  ClientEdit,
  DashboardLayout,
  Error,
  Gallery,
  HomeLayout,
  Landing,
  LittersLayout,
  Litters,
  LitterAdd,
  LitterEdit,
  Login,
  Profile,
  PuppiesLayout,
  Puppies,
  PuppyAdd,
  PuppyEdit,
  PuppyHealthEventsLayout,
  PuppyHealthEvents,
  PuppyHealthEventEdit,
  PuppyHealthEventAdd,
  Register,
  Reserve,
  Stats
} from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { loader as allClientsLoader } from './pages/ClientsLayout';
import { action as addClientAction } from './pages/ClientAdd';
import { loader as editClientLoader } from './pages/ClientEdit';
import { action as editClientAction } from './pages/ClientEdit';
import { action as deleteClientAction } from './pages/ClientDelete';
import { loader as singlePuppyHealthEventsLoader } from './pages/PuppyHealthEventsLayout';
// import { loader as editPuppyHealthEventLoader } from './pages/PuppyHealthEventEdit';
import { action as editPuppyHealthEventAction } from './pages/PuppyHealthEventEdit';
import { loader as allLittersLoader } from './pages/LittersLayout';
import { action as addLitterAction } from './pages/LitterAdd';
import { loader as editLitterLoader } from './pages/LitterEdit';
import { action as editLitterAction } from './pages/LitterEdit';
import { action as deleteLitterAction } from './pages/LitterDelete';
import { loader as allPuppiesLoader } from './pages/PuppiesLayout';
import { action as addPuppyAction } from './pages/PuppyAdd';
import { loader as editPuppyLoader } from './pages/PuppyEdit';
import { action as editPuppyAction } from './pages/PuppyEdit';
import { action as deletePuppyAction } from './pages/PuppyDelete';
import { action as addPuppyHealthEventAction } from './pages/PuppyHealthEventAdd';
import { action as deletePuppyHealthEventAction } from './pages/PuppyHealthEventDelete';
// import { loader as allPuppyHealthEventsLoader } from './pages/PuppyHealthEvents';
import { action as profileAction } from './pages/Profile';
import ErrorElement from './components/ErrorElement';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5
    }
  }
});

// Pages within App layed out here
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout queryClient={queryClient} />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction(queryClient)
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction
      },
      {
        path: 'reserve',
        element: <Reserve />
      },
      {
        path: 'dashboard',
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <Profile />,
            action: profileAction(queryClient)
          },
          {
            path: 'stats',
            element: <Stats />
          },
          {
            path: 'litters',
            loader: allLittersLoader(queryClient),
            element: <LittersLayout queryClient={queryClient} />,
            children: [
              {
                index: true,
                element: <Litters />
              },
              {
                path: 'litter-add',
                element: <LitterAdd />,
                action: addLitterAction(queryClient)
              },
              {
                path: 'litter-edit/:id',
                element: <LitterEdit />,
                loader: editLitterLoader(queryClient),
                action: editLitterAction(queryClient)
              },
              {
                path: 'litter-delete/:id',
                action: deleteLitterAction(queryClient)
              },
              {
                path: 'puppies',
                loader: allPuppiesLoader(queryClient),
                element: <PuppiesLayout />,
                children: [
                  {
                    index: true,
                    element: <Puppies />
                  },
                  {
                    path: 'puppy-add',
                    element: <PuppyAdd />,
                    action: addPuppyAction(queryClient)
                  },
                  {
                    path: 'puppy-edit/:id',
                    element: <PuppyEdit />,
                    loader: editPuppyLoader(queryClient),
                    action: editPuppyAction(queryClient)
                  },
                  {
                    path: 'puppy-delete/:id',
                    action: deletePuppyAction(queryClient)
                  },
                  {
                    path: ':id/puppy-health-events',
                    element: <PuppyHealthEventsLayout queryClient={queryClient} />,
                    loader: singlePuppyHealthEventsLoader(queryClient),
                    children: [
                      {
                        index: true,
                        element: <PuppyHealthEvents />
                      },
                      {
                        path: 'puppy-health-event-edit/:eventId',
                        element: <PuppyHealthEventEdit />,
                        action: editPuppyHealthEventAction(queryClient)
                      },
                      {
                        path: 'puppy-health-event-add',
                        element: <PuppyHealthEventAdd />,
                        action: addPuppyHealthEventAction(queryClient)
                      },
                      {
                        path: 'puppy-health-event-delete/:id',
                        action: deletePuppyHealthEventAction(queryClient)
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: 'clients',
            loader: allClientsLoader(queryClient),
            element: <ClientsLayout />,
            children: [
              {
                index: true,
                element: <Clients />
              },
              {
                path: 'client-add',
                element: <ClientAdd />,
                action: addClientAction(queryClient)
              },
              {
                path: 'client-edit/:id',
                element: <ClientEdit />,
                loader: editClientLoader(queryClient),
                action: editClientAction(queryClient)
              },
              {
                path: 'client-delete/:id',
                action: deleteClientAction(queryClient)
              }
            ]
          }
        ]
      }
    ]
  }
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
