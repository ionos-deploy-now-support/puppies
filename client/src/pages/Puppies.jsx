import { PuppiesContainer, PuppiesSearchContainer } from '../components';
// import customFetch from '../utils/customFetch';
// import { useLoaderData } from 'react-router-dom';
// import { useContext, createContext } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { all } from 'axios';

// const allPuppiesQuery = (params) => {
//   const { search, puppySex, puppyColor, litter, sort, page } = params;
//   return {
//     queryKey: [
//       'puppies',
//       search ?? '',
//       puppySex ?? 'Both',
//       puppyColor ?? 'All',
//       litter ?? 'All',
//       sort ?? 'newest',
//       page ?? 1
//     ],
//     queryFn: async () => {
//       const { data } = await customFetch.get('/puppies', {
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
//     await queryClient.ensureQueryData(allPuppiesQuery(params));
//     return { searchValues: { ...params } };
//   };

// const PuppiesContext = createContext();
const Puppies = () => {
  // const { searchValues } = useLoaderData();
  // const { data } = useQuery(allPuppiesQuery(searchValues));

  return (
    // <PuppiesContext.Provider value={{ data, searchValues }}>
    <div className="puppies-page">
      <PuppiesSearchContainer />
      <PuppiesContainer />
      {/* </PuppiesContext.Provider> */}
    </div>
  );
};

//custom context hook
// export const usePuppiesContext = () => useContext(PuppiesContext);

export default Puppies;
