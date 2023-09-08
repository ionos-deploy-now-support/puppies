import Logo from './Logo';
import Wrapper from '../assets/wrappers/PageNav';
import ThemeToggle from './ThemeToggle';
import PageNavListItem from './PageNavListItem';
import LogoutContainer from './LogoutContainer';
import { useHomeContext } from '../pages/HomeLayout';

function PageNav() {
  const { isLoggedIn } = useHomeContext();
  return (
    <Wrapper>
      <Logo />
      <ul>
        <PageNavListItem linkText="Gallery" linkTo="/gallery" />
        <PageNavListItem linkText="About Us" linkTo="/about-us" />
        <li>
          <ThemeToggle />
        </li>
        {!isLoggedIn ? <PageNavListItem linkText="Login" linkTo="/login" /> : <LogoutContainer />}
      </ul>
    </Wrapper>
  );
}

export default PageNav;
