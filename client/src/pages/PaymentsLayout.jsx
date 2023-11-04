import customFetch from '../utils/customFetch';
import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../components';

const allPaymentsQuery = (params) => {
  const { search, sort, page } = params;
  return {
    queryKey: ['payments', search ?? '', sort ?? 'newest', page ?? 1],
    queryFn: async () => {
      const { data } = await customFetch.get('/payments', {
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
    await queryClient.ensureQueryData(allPaymentsQuery(params));
    return { searchValues: { ...params } };
  };

const PaymentsContext = createContext();

const PaymentsLayout = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allPaymentsQuery(searchValues));
  const payments = data.data.docs; //nicely formed array of objects for payments
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <PaymentsContext.Provider value={{ data, searchValues, payments }}>
      <div className="landing-page">{isPageLoading ? <Loading /> : <Outlet />}</div>
    </PaymentsContext.Provider>
  );
};

//custom context hook
export const usePaymentsContext = () => useContext(PaymentsContext);

export default PaymentsLayout;
