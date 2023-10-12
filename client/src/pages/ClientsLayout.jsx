import customFetch from '../utils/customFetch';
import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../components';
import { useDashboardContext } from './DashboardLayout';
import { set } from 'mongoose';

const allClientsQuery = (params) => {
  const { search, sort, page } = params;
  return {
    queryKey: [
      'clients',
      search ?? '',
      // clientStatus ?? 'all',
      // clientType ?? 'all',
      sort ?? 'newest',
      page ?? 1
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/clients', {
        params
      });
      return data;
    }
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    await queryClient.ensureQueryData(allClientsQuery(params));
    return { searchValues: { ...params } };
  };

const ClientsContext = createContext();

const ClientsLayout = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allClientsQuery(searchValues));
  const clients = data.data.docs;
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <ClientsContext.Provider value={{ data, searchValues, clients }}>
      <div className="landing-page">{isPageLoading ? <Loading /> : <Outlet />}</div>
    </ClientsContext.Provider>
  );
};

//custom context hook
export const useClientsContext = () => useContext(ClientsContext);

export default ClientsLayout;
