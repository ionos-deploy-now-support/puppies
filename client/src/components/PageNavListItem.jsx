import { NavLink } from 'react-router-dom';
import { useHomeContext } from '../pages/HomeLayout';
const PageNavListItem = ({ linkText, linkTo }) => {
  const { isDarkTheme } = useHomeContext();
  console.log(isDarkTheme);
  return (
    <li>
      {/* <a className={isDarkTheme ? 'dark-nav' : ''} href="/about-us">
        {liText}
      </a> */}
      <NavLink to={linkTo} className={isDarkTheme ? 'dark-nav' : ''}>
        {linkText}
      </NavLink>
    </li>
  );
};
export default PageNavListItem;
