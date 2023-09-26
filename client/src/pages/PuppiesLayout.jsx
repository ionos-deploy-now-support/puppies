import customFetch from '../utils/customFetch';
import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../components';

const allPuppiesQuery = (params) => {
  const { search, puppySex, puppyColor, litter, sort, page } = params;
  return {
    queryKey: [
      'puppies',
      search ?? '',
      puppySex ?? 'Both',
      puppyColor ?? 'All',
      litter ?? 'All',
      sort ?? 'newest',
      page ?? 1
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/puppies', {
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
    await queryClient.ensureQueryData(allPuppiesQuery(params));
    return { searchValues: { ...params } };
  };

const PuppiesContext = createContext();

const PuppiesLayout = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allPuppiesQuery(searchValues));
  const litters = data.data.docs; //nicely formed array of objects for litters
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <PuppiesContext.Provider value={{ data, searchValues, litters }}>
      <div className="landing-page">{isPageLoading ? <Loading /> : <Outlet />}</div>
    </PuppiesContext.Provider>
  );
};

//custom context hook
export const usePuppiesContext = () => useContext(PuppiesContext);

export default PuppiesLayout;
