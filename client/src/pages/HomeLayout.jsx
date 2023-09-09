import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { createContext, useContext, useState, useEffect } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { checkDefaultTheme } from '../App';
import { Loading } from '../components';
import Wrapper from '../assets/wrappers/Logo';

const HomeContext = createContext();

const HomeLayout = ({ queryClient }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [isAuthError, setIsAuthError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const toggleDarkTheme = () => {
    console.log('toggle dark theme');
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    // vanilla js here
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/users/logout');
    queryClient.invalidateQueries();
    toast.success('Logging out...');
    setIsLoggedIn(false);
    console.log('logout user');
  };

  //Axios interceptors intercept res or req before handled by then or catch
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);

  return (
    <HomeContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        isDarkTheme,
        toggleDarkTheme,
        logoutUser
      }}>
      <Wrapper>
        <div className="landing-page">{isPageLoading ? <Loading /> : <Outlet />}</div>
      </Wrapper>
    </HomeContext.Provider>
  );
};
export const useHomeContext = () => useContext(HomeContext);
export default HomeLayout;
