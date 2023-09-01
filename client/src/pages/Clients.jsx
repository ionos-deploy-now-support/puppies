import { toast } from 'react-toastify';
import { ClientsContainer, ClientsSearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
// import { useQuery } from '@tanstack/react-query';

// const allClientsQuery = (params) => {
//   const { search, sort, page } = params;
//   return {
//     queryKey: [
//       'docs',
//       search ?? '',
//       // clientStatus ?? 'all',
//       // clientType ?? 'all',
//       sort ?? 'newest',
//       page ?? 1
//     ],
//     queryFn: async () => {
//       const { data } = await customFetch.get('/clients', {
//         params
//       });
//       return data;
//     }
//   };
// };

// export const loader =
//   (queryClient) =>
//   async ({ request }) => {
//     const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);

//     await queryClient.ensureQueryData(allClientsQuery(params));
//     return { searchValues: { ...params } };
//   };

export const loader = async ({ request }) => {
  // create new URL object - turn query params into an object
  console.log(`request.url: ${request.url}`);
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  console.log({ params });
  try {
    const { data } = await customFetch.get('/clients', { params });
    console.log({ data });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};
const ClientsContext = createContext();
const Clients = () => {
  const { data, searchValues } = useLoaderData();

  // const { data } = useQuery(allClientsQuery(searchValues));
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
