import { Outlet, redirect, useNavigate, useNavigation, useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar, Loading } from '../components';
// import { createContext, useContext, useEffect, useState } from 'react';
import { useState, createContext, useContext } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
// import { useQuery } from '@tanstack/react-query';
import { checkDefaultTheme } from '../App';

// const userQuery = {
//   queryKey: ['user'],
//   queryFn: async () => {
//     const { data } = await customFetch.get('/users/current-user');
//     return data;
//   },
// };

// export const loader = (queryClient) => async () => {
export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/me');
    console.log(data);
    // const user = data.data;
    // console.log(user);
    return data;
    // return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect('/');
  }
};

// createContext is option to prevent prop drilling
const DashboardContext = createContext();

// const DashboardLayout = ({ queryClient }) => {
const DashboardLayout = () => {
  const { data } = useLoaderData();
  console.log(data);
  const user = data.data;

  //   const { user } = useQuery(userQuery).data;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  //   const [isAuthError, setIsAuthError] = useState(false);

  const toggleDarkTheme = () => {
    console.log('toggle dark theme');
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    // vanilla js here
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/users/logout');
    //     queryClient.invalidateQueries();
    toast.success('Logging out...');
    console.log('logout user');
  };

  //   customFetch.interceptors.response.use(
  //     (response) => {
  //       return response;
  //     },
  //     (error) => {
  //       if (error?.response?.status === 401) {
  //         setIsAuthError(true);
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   useEffect(() => {
  //     if (!isAuthError) return;
  //     logoutUser();
  //   }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser
      }}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
//custom hook
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
