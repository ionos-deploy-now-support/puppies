import { toast } from 'react-toastify';
import { ClientsContainer, ClientsSearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

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
const Clients = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allClientsQuery(searchValues));
  return (
    <ClientsContext.Provider value={{ data, searchValues }}>
      <ClientsSearchContainer />
      <ClientsContainer />
    </ClientsContext.Provider>
  );
};

//custom context hook
export const useClientsContext = () => useContext(ClientsContext);

export default Clients;
