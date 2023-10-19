import customFetch from '../utils/customFetch';
import { Outlet, useLoaderData, useNavigation, redirect } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../components';
import { toast } from 'react-toastify';

const singleClientCommunicationsQuery = (clientId, searchItems) => {
  const { sort, page } = searchItems;
  return {
    queryKey: ['clientCommunications', clientId, sort ?? 'newest-created', page ?? 1],
    queryFn: async () => {
      const { data } = await customFetch.get(`/clients/${clientId}/communications`, {
        searchItems
      });
      return data;
    }
  };
};

export const loader =
  (queryClient) =>
  async ({ params, request }) => {
    const searchItems = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    console.log(`searchItems = ${JSON.stringify(searchItems)}`);
    const clientId = params.id;
    try {
      await queryClient.ensureQueryData(singleClientCommunicationsQuery(clientId, searchItems));
      return { clientId, searchValues: { ...searchItems } };
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return redirect('/dashboard/clients');
    }
  };

const CommunicationsContext = createContext();
const CommunicationsLayout = () => {
  const { clientId, searchValues } = useLoaderData();
  console.log(
    `clientId from useLoaderData = ${clientId}, searchValues = ${JSON.stringify(searchValues)}`
  );
  const { data, results, numPages, currentPage } = useQuery(
    singleClientCommunicationsQuery(clientId, searchValues)
  ).data; //well-formed communications obj for the specific client
  console.log(`data resulting from singleClientCommunicationsQuery-current page ${currentPage}`);
  const communications = data.docs;
  console.log(
    `data.docs resulting from singleClientCommunicationsQuery ${JSON.stringify(data.docs)}`
  );
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  return (
    <CommunicationsContext.Provider
      value={{ data, communications, results, numPages, currentPage, clientId, searchValues }}>
      <div className="communications-page">{isPageLoading ? <Loading /> : <Outlet />}</div>
    </CommunicationsContext.Provider>
  );
};

export const useCommunicationsContext = () => useContext(CommunicationsContext);

export default CommunicationsLayout;
