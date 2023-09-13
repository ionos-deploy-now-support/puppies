import Logo from './Logo';
import Wrapper from '../assets/wrappers/PageNav';
import ThemeToggle from './ThemeToggle';
import LogoutContainer from './LogoutContainer';
import { useHomeContext } from '../pages/HomeLayout';
import PageNavDropDown from './PageNavDropDown';
import LoginBtn from './LoginBtn';

function PageNav() {
  const { isLoggedIn } = useHomeContext();
  return (
    <Wrapper>
      <Logo />
      <PageNavDropDown />
      <ThemeToggle />
      {!isLoggedIn ? <LoginBtn /> : <LogoutContainer />}
    </Wrapper>
  );
}

export default PageNav;
