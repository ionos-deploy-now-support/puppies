import { PuppyHealthEventsContainer, PuppyHealthEventsSearchContainer } from '../components';
// import customFetch from '../utils/customFetch';
// import { toast } from 'react-toastify';
// import { useLoaderData, redirect } from 'react-router-dom';
// import { useContext, createContext } from 'react';
// import { usePuppiesContext } from '../pages/PuppiesLayout';
// import { useQuery } from '@tanstack/react-query';

// const singlePuppyHealthEventsQuery = (id) => {
//   return {
//     queryKey: ['puppy', id],
//     queryFn: async () => {
//       const { data } = await customFetch.get(`/puppies/${id}`);
//       return data;
//     }
//   };
// };

// export const loader =
//   (queryClient) =>
//   async ({ params }) => {
//     try {
//       await queryClient.ensureQueryData(singlePuppyHealthEventsQuery(params.id));
//       return params.id;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//       return redirect('/dashboard/litters/puppies');
//     }
//   };

// const PuppyHealthEventsContext = createContext();
const PuppyHealthEvents = () => {
  //grab puppy id from loader
  // const puppyId = useLoaderData();
  // console.log(`From PuppyHealthEvents puppy id is ${puppyId}`);
  // const { data } = useQuery(singlePuppyHealthEventsQuery(puppyId)).data.data; //provides a well formed puppy object that also has associated healthEvents array

  // console.log(data);
  return (
    <PuppyHealthEventsContainer />
    // <PuppyHealthEventsContext.Provider value={data}>
  );
};

export default PuppyHealthEvents;
