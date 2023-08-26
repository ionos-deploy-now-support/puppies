import { Outlet } from 'react-router-dom';
import Logo from './Logo';
import styles from './Sidebar.module.css';
import Footer from './Footer';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
