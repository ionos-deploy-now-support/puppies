import { Outlet, redirect, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar, Loading } from '../components';
import { createContext, useContext, useState } from 'react';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import { useHomeContext } from './HomeLayout';

const userQuery = {
  queryKey: ['user'], //query key uniquely describes the data being fetched
  queryFn: async () => {
    const { data } = await customFetch.get('/users/me');
    return data;
  }
};

// "loader" provides data to the route element before it renders
export const loader = (queryClient) => async () => {
  try {
    const data = await queryClient.ensureQueryData(userQuery);
    const user = data.data.data;
    return user;
  } catch (error) {
    return redirect('/');
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { setIsLoggedIn, setCurrentUser } = useHomeContext();
  const { data } = useQuery(userQuery);
  const user = data.data.data;
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  if (user) {
    setIsLoggedIn(true);
    setCurrentUser(user);
  }

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        toggleSidebar
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
