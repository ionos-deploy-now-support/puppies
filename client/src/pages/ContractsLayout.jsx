import customFetch from '../utils/customFetch';
import { Outlet, useLoaderData, useNavigation, redirect } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../components';
import { toast } from 'react-toastify';

const singleClientContractsQuery = (clientId, searchItems) => {
  const { sort, page } = searchItems;
  return {
    queryKey: ['clientContracts', clientId, sort ?? 'newest-created', page ?? 1],
    queryFn: async () => {
      const { data } = await customFetch.get(`/clients/${clientId}/contracts`, {
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
      await queryClient.ensureQueryData(singleClientContractsQuery(clientId, searchItems));
      return { clientId, searchValues: { ...searchItems } };
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return redirect('/dashboard/clients');
    }
  };

const ContractsContext = createContext();
const ContractsLayout = () => {
  const { clientId, searchValues } = useLoaderData();
  console.log(
    `clientId from useLoaderData = ${clientId}, searchValues = ${JSON.stringify(searchValues)}`
  );
  const { data, results, numPages, currentPage } = useQuery(
    singleClientContractsQuery(clientId, searchValues)
  ).data; //well-formed contracts obj for the specific client
  console.log(`data resulting from singleClientContractsQuery-current page ${currentPage}`);
  const contracts = data.docs;
  console.log(`data.docs resulting from singleClientContractsQuery ${JSON.stringify(data.docs)}`);
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  return (
    <ContractsContext.Provider
      value={{ data, contracts, results, numPages, currentPage, clientId, searchValues }}>
      <div className="contracts-page">{isPageLoading ? <Loading /> : <Outlet />}</div>
    </ContractsContext.Provider>
  );
};

export const useContractsContext = () => useContext(ContractsContext);

export default ContractsLayout;
