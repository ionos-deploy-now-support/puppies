import { LittersContainer, LittersSearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

const allLittersQuery = (params) => {
  const { search, sort, page } = params;
  return {
    queryKey: ['litters', search ?? '', sort ?? 'newest', page ?? 1],
    queryFn: async () => {
      const { data } = await customFetch.get('/litters', {
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
    await queryClient.ensureQueryData(allLittersQuery(params));
    return { searchValues: { ...params } };
  };

const LittersContext = createContext();
const Litters = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allLittersQuery(searchValues));
  return (
    <LittersContext.Provider value={{ data, searchValues }}>
      <LittersSearchContainer />
      <LittersContainer />
    </LittersContext.Provider>
  );
};

//custom context hook
export const useLittersContext = () => useContext(LittersContext);

export default Litters;
