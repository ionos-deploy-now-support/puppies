import { NavLink } from 'react-router-dom';
import { useHomeContext } from '../pages/HomeLayout';
const PageNavListItem = ({ linkText, linkTo }) => {
  const { isDarkTheme } = useHomeContext();
  return (
    <li>
      <NavLink to={linkTo} className={isDarkTheme ? 'dark-nav btn' : 'btn'}>
        {linkText}
      </NavLink>
    </li>
  );
};
export default PageNavListItem;
