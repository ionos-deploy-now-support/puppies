import customFetch from '../utils/customFetch';
import { Outlet, useLoaderData, useNavigation, redirect } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../components';
import { toast } from 'react-toastify';

const singlePuppyHealthEventsQuery = (id) => {
  // const { sort } = params;
  return {
    queryKey: ['puppy', id],
    // queryKey: ['puppy', id, sort ?? 'newest'],
    queryFn: async () => {
      const { data } = await customFetch.get(`/puppies/${id}`);
      return data;
    }
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singlePuppyHealthEventsQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return redirect('/dashboard/litters/puppies');
    }
  };

const PuppyHealthEventsContext = createContext();
const PuppyHealthEventsLayout = () => {
  const puppyId = useLoaderData();
  const { data } = useQuery(singlePuppyHealthEventsQuery(puppyId)).data.data; //provides a well-formed puppy object that also has associated healthEvents array
  const puppyObj = data;
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  return (
    <PuppyHealthEventsContext.Provider value={{ puppyObj }}>
      <div className="landing-page">{isPageLoading ? <Loading /> : <Outlet />}</div>
    </PuppyHealthEventsContext.Provider>
  );
};

//custom context hook
export const usePuppyHealthEventsContext = () => useContext(PuppyHealthEventsContext);

export default PuppyHealthEventsLayout;
