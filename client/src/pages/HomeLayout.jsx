import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';
import { checkDefaultTheme } from '../App';

const HomeContext = createContext();
const HomeLayout = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    console.log('toggle dark theme');
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    // vanilla js here
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  return (
    <HomeContext.Provider
      value={{
        isDarkTheme,
        toggleDarkTheme
        //logoutUser
      }}>
      <Outlet />
    </HomeContext.Provider>
  );
};
export const useHomeContext = () => useContext(HomeContext);
export default HomeLayout;
